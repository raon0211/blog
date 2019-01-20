---
keywords: infer, 조건 타입
date: 2019-01-08T17:00:00+09:00
summary: TypeScript 2.8부터 추가된 강력한 조건 타입에 대해 자세히 알아보자
---

[조건 타입(Conditional types)](https://github.com/Microsoft/TypeScript/pull/21316)은 TypeScript 2.8부터 추가된 강력한 기능 중 하나이다. TypeScript 프로젝트의 주요 기여자 [Ryan Cavanaugh](https://twitter.com/SeaRyanC/status/1029846761718702081)의 트윗을 간단하게 번역하자면

> Working through our (enormous) backlog of unsorted TypeScript "Suggestions" and it's remarkable how many of them are solved by conditional types.

> 셀 수 없이 많은 TypeScript 기능 제안들이 모여 있는 백로그들을 좀 훑어봤는데, 그 중 조건 타입으로 해결할 수 있는 것이 얼마나 많은지에 놀랐다.

즉, 많은 경우에 타입에 관련된 문제를 조건 타입으로 해결할 수 있다는 점이다. 어떤 것이기에 그런 것일까? 이제 조건 타입이 무엇인지에 대해 알아보자.

# TypeScript에서의 `extends`란?

조건 타입이 무엇인지 이해하기 위해 TypeScript의 `extends` 연산에 대해 이해가 필요하다. TypeScript는 덕 타이핑(Duck typing)을 기반으로 타입 시스템이 짜여 있다. 덕 타이핑은 구조 기반 타이핑(Structural typing)이라고도 하는데, 다음 속담이 잘 알려져 있다.

> If it looks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck.

> 오리처럼 보이고, 오리처럼 물 속을 다니고, 오리처럼 꽥꽥 울면, 그것은 높은 확률로 오리일 것이다.

```ts
class A {}
class B {}

const b: B = new A(); // OK
const a: A = new B(); // OK

new A() instanceof B; // --> false
```

Java와 같은 언어에서는 `A`와 `B`가 엄연히 다른 클래스이기 때문에 컴파일 에러가 발생한다. 그러나 TypeScript는 타입의 동등성을 판단할 때 구조적으로 동등한지(structural equivalence)만을 따지기 때문에, 컴파일 에러가 발생하지 않는다. 여기서 구조적으로 동등하다는 이야기는 모든 프로퍼티(프로퍼티 함수, 즉 메서드 포함)의 이름과 타입이 일치해서 같은 동작을 수행할 수 있다는 것을 말한다.

예시에서 `A`와 `B`의 타입이 동등한 이유는 두 클래스가 모두 빈 클래스여서 구조적으로 같은 클래스로 볼 수 있기 때문이다.

```ts
interface Person {
  name: string;
}

interface Student {
  name: string;
  studentNo: string;
}

const person: Person = {
  name: 'Eri',
};

const student: Student = {
  name: 'Sawa',
  studentNo: '0320',
};

// (O) Student는 Person의 모든 프로퍼티를 가지고 있으므로, OK
const person2: Person = student;
// (X) Person은 Student의 studentNo를 가지고 있지 않으므로, 컴파일 에러
const student2: Student = person;
```

마찬가지 논리로 본다면 TypeScript에서 어떤 타입 `Sub`가 다른 타입 `Super`에 할당될 수 있다(assignable)라고 하는 것은

1. `Sub` 타입이 `Super` 타입의 모든 프로퍼티를 가지고 있거나
2. 그것보다 더 많이 가지고 있음

을 의미한다. 여기서 할당 가능성이라는 개념을 가져온 것이 `Sub extends Super`이다.

## 리터럴 타입에서 할당 가능성

여기에서 특별한 것이 리터럴 타입인데, 다음과 같은 코드를 생각해볼 수 있다.

```ts
const americano: 'americano' = 'americano';

americano = 'latte'; // (X) 컴파일 에러: string은 'americano' 타입에 할당될 수 없음
```

`'americano'`는 `string`의 모든 프로퍼티를 가지고 있지만 `'americano'`는 `string`보다 더 좁은 범위를 가리키기 때문에 (다시 말해, 구체적이기 때문에) 컴파일 에러가 발생한다. 즉 `Sub extends Super`를 다르게 생각하는 방법은 `Sub`이 `Super`보다 구체적인 것이라고 생각하는 것이다.

## 바닥 타입과 꼭대기 타입의 할당 가능성

타입 이론에서 모든 타입의 하위 타입인 바닥 타입(Bottom type) $\perp$과 모든 타입의 부모 타입인 꼭대기 타입(Top type) $\top$도 참고하면 좋다. TypeScript의 바닥 타입 `never`, 꼭대기 타입 `any`와 `unknown`, 그리고 모든 타입 `T`에 대해 아래가 성립한다.

```ts
never extends T
T extends any
T extends unknown
```

# TypeScript에서 조건 타입

TypeScript에서 조건 타입은 다음과 같이 작성한다.

```ts
A extends B ? X : Y
```

많은 언어에서 볼 수 있는 삼항 연산자 `? :`와 유사하게 생겼다. 여기에서 타입 `A`, `B`, `X`, `Y`의 자리에는 아무 타입이나 올 수 있다. 조건 타입의 뜻은 다음과 같다.

> A가 B에 할당될 수 있으면 X 타입을 반환하고, 아니면 Y 타입을 반환한다.

TypeScript 언어에서 기본적으로 제공되는 제네릭 타입 `NonNullable<T>`의 정의를 살펴보자.

```ts
type NonNullable<T> = T extends null | undefined ? never : T;
```

여기에서 `T`가 `null | undefined`에 할당될 수 있으면 `never` 타입이 반환되고, 아니면 `T` 타입 자체가 반환된다.

# 분배 조건 타입

TypeScript 조건 타입에 정의된 또다른 특별한 규칙이 있는데 그것이 분배 조건 타입(Distributive conditional type)이다. 이는 위의 조건 타입 `A extends B ? X : Y`에서 `A`에 합 타입(Union type)이 들어왔을 경우 적용되는 규칙인데, 예시를 통해 어떤 규칙인지 살펴보자.

```ts
type Animal = Lion | Zebra | Tiger | Shark;
```

위 코드와 같이 타입 `Animal`을 네 가지 타입의 합 타입으로 정의하였다. 이 타입 중에서 고양이에 해당하는 (= `meow` 메서드를 가지고 있는) 타입만을 뽑아내고 싶은 경우를 생각하자. 다음과 같이 코드를 작성하면 된다.

```ts
type ExtractCat<A> = A extends { meow(): void } ? A : never;

type Cat = ExtractCat<Animal>; // Lion | Tiger
```

`Animal` 합 타입에서 `Lion | Tiger`만 뽑혔다. TypeScript에서는 조건 타입이 주어졌을 때 `extends` 앞의 타입이 위에서의 `Animal`과 같은 합 타입일 경우, 다음과 같이 조건 타입이 분배된다.

```ts
type Cat =
  | ExtractCat<Lion>
  | ExtractCat<Zebra>
  | ExtractCat<Tiger>
  | ExtractCat<Shark>;
```

그리고 각각의 타입이 합 타입이 아닐 때 조건 타입의 값을 계산한다.

```ts
type Cat = Lion | never | Tiger | never;
```

`never`는 TypeScript의 바닥 타입이므로 합 타입 연산 시 아무런 효과도 가지지 못하고 사라진다. 임의의 집합 $A$에 대해 공집합 $\emptyset$과의 합집합 $A \cup \emptyset =$ 자기 자신 $A$인 것과 마찬가지이다.

```ts
type Cat = Lion | Tiger;
```

정리하자면, TypeScript는 조건 타입을 평가할 때 `Sub extends Super ? X : Y` 옆의 `Sub`가 합 타입일 경우, 분배 후 다시 합치는 방식으로 타입을 계산하고 있다.

## NonNullable<T>에서의 분배 조건 타입

위에서 언급한 `NonNullable<T>`의 타입 변수 `T`가 `null` 또는 `undefined`와의 합 타입이라면 합 타입에서 `null`과 `undefined`는 지워진다.

```ts
// string | number
type SafelyStringOrNumber = NonNullable<string | number | null | undefined>;
```

# 예시

## 함수에서 타입 안전성 확보하기

아래와 같은 TypeScript 함수 선언으로 구성된 `process` 함수를 생각하자.

```ts
function process(text: string): string;
function process(text: undefined): undefined;
function process(text: any) {
  // ...
}
```

즉, 우리는 `text`가 `string` 타입이면 안전하게 `string` 타입을 반환하고, 아니면 `undefined` 가능성을 반환하려고 한다. 그런데 지금 `process` 함수는 다음과 같은 값이 주어졌을 때 에러가 발생한다.

```ts
const foo: string | undefined = 'foo';
const bar: string | undefined = 'bar';

// (X) 컴파일 에러: string | undefined는 string에도 undefined에도 할당될 수 없음
process(foo);
process(bar);
```

`string | undefined`인 경우의 처리를 놓쳤기 때문인데 이렇게 코드를 쓰다 보면 끝이 없다. 이를 아래처럼 간단히 작성할 수 있다.

```ts
function process<T extends string | undefined>(
  text: T
): T extends string ? string : undefined {
  // ...
}
```

> 현재 [TypeScript 내부 제약](https://github.com/Microsoft/TypeScript/issues/24929)때문에 함수 내부는 `any`를 반환하도록 해야 컴파일 에러가 나지 않는다.

## 타입에서 값이 `undefined`일 수 있는 프로퍼티 제거하기

```ts
type NonNullablePropertyKeys<T> = {
  [P in keyof T]: undefined extends T[P] ? never : P
}[keyof T];
```

위와 같이 타입에서 `undefined`일 수 없는 프로퍼티 목록만 합 타입으로 가져오는 타입 `NonNullablePropertyKeys<T>`를 정의할 수 있다. 예를 들어 `email` 프로퍼티를 선택적으로 가지는 `User` 인터페이스를 생각해 보자.

```ts
interface User {
  name: string;
  email?: string;
}

type NonNullableUserPropertyKeys = NonNullablePropertyKeys<User>;
```

에서 `NonNullableUserPropertyKeys<User>`를 평가하는 경우를 생각해 보면,

```ts
type NonNullableUserPropertyKeys = {
  [P in keyof User]: undefined extends User[P] ? never : P
}[keyof User];
```

에서 `keyof User = 'name' | 'email'` 이므로

```ts
type NonNullableUserPropertyKeys = {
  [P in 'name' | 'email']: undefined extends User[P] ? never : P
}['name' | 'email'];
```

처럼 펼칠 수 있고 이를 더 펼치면

```ts
type NonNullableUserPropertyKeys = {
  name: undefined extends string ? never : 'name';
  email: undefined extends string | undefined ? never : 'email';
}['name' | 'email'];
```

처럼 된다. `undefined`는 TypeScript 엄격 모드에서 `string`에 할당할 수 없고 `string | undefined`에는 할당할 수 있으므로,

```ts
type NonNullableUserPropertyKeys = {
  name: 'name';
  email: never;
}['name' | 'email'];
```

처럼 평가되고, 이를 정리하면

```ts
type NonNullableUserPropertyKeys =
  | { name: 'name'; email: never }['name']
  | { name: 'name'; email: never }['email'];

type NonNullableUserPropertyKeys = 'name';
```

이 된다. 이 결과를 TypeScript에서 기본으로 제공하는 타입 `Pick<T, K>`에 제공하면

```ts
// { name: string }
type NonNullableUserPropertyKeys = Pick<User, NonNullablePropertyKeys<User>>;
```

처럼 `undefined`일 수 없는 `User`의 프로퍼티들만 뽑아올 수 있다.

# 참고 문헌

- [Conditional Types in TypeScript](http://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/), David Sheldrick
- [TypeScript 2.8 Conditional Types](https://blog.mariusschulz.com/2019/01/09/typescript-2-8-conditional-types), Marius Schulz
