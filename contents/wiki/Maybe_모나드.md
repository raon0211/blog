---
keywords: Optional, 옵셔널, Maybe
date: 2018-12-22T17:00:00+09:00
---

Maybe 모나드는 어떤 계산의 결괏값이 있을 수도, 없을 수도 있음을 나타내기 위해 사용하는 모나드이다. 다음과 같은 함수를 생각해 보자.

```ts
function getUser(userId: number): UserEntity {
  // UserEntity를 가지고 오기 위해 어떤 연산을 취한다.
}
```

이 함수는 언뜻 보면 일반적인 함수처럼 보인다. `number` 형의 사용자 ID `userId`를 이용해 정보를 조회하고 사용자 엔티티 `UserEntity`를 받아오는 것이라 특별해 보이는 곳이 없다.

그러나 어떤 `userId`가 유효하고 유효하지 않은지를 생각하기 시작하면 함수의 문제점이 보이기 시작한다. `getUser`가 정의된 타입은 `number`이기 때문에 어떠한 `number` 값이 주어져도 함수의 시그니처 `(userId: number) => UserEntity` 상으로는 언제나 유효한 `UserEntity` 값이 반환되어야 한다.

`userId`의 값으로 `0`, `-321` 등의 유효하지 않은 값이 전달된다면 `getUser`는 어떤 값을 반환해야 하는가? 뿐만 아니라 `NaN`이나 `Infinity`도 `number`로서 유효한 값이기 때문에 `userId` 인자로 전달될 수 있는데, 이런 경우에는 어떻게 대응해야 하는가?

기존의 Java나 C 등의 언어에서는 이에 대해

1. `null` 등의 누가 봐도 유효하지 않은 값을 반환하거나
2. 유효하지 않은 ID가 주어졌음을 알리는 예외(Exception)를 던지는 방법으로

대응하였다.

```ts
function getUserScores(userIds: number[]) {
  return userIds
    .map(id => getUser(id)) // getUser가 암시적으로 null을 반환하는 경우,
    .map(user => user.score); // 여기에서 user는 nullable, TypeError 가능성 상승
}
```

```ts
function getUserNames(userIds: number[]) {
  return userIds
    .map(id => getUser(id)) // getUser가 암시적으로 예외를 던질 수 있는 경우,
    .map(user => user.name); // getUserNames도 예외를 던지는 함수가 됨
}
```

그러나 이러한 대응은 새로운 문제를 불러오게 되었다.

우선 누가 봐도 유효하지 않은 값이 무엇인지가 함수마다 매번 달랐다. 예를 들어 배열에서 특정 원소의 위치를 찾는 `indexOf` 함수를 생각해 보자. 배열에 존재하지 않는 원소에 대해 `indexOf` 함수가 실행되면 함수는 어떤 값을 반환해야 하는가? `-1`인가, 배열의 길이인가? `null`인가? 이처럼 사용자는 허용되지 않은 인자에 대해 각 함수가 어떻게 동작하는지 매번 학습해야 했으며, 이 과정에서 실수할 수 있는 부분은 많아져만 갔다.

뿐만 아니라 유효하지 않은 값인 `null`이 Java와 같은 언어에서 조용히 모든 참조 타입의 변수에 할당될 수 있게 되면서 프로그래머는 언제 어디서든 `null`을 만날 수 있는 위험에 빠뜨려졌다. `UserEntity`를 반환하는 함수가 `null`을 반환할지, 반환하지 않을지, 함수의 시그니처로는 판단할 수 없다. 때문에 늘 방어적인 스탠스로 변수에 대해 `null` 검사를 수행하는 것이 안전한 코드 작성을 위해 필수적이게 되었다. (특히 이는 자신이 짜지 않은 함수를 다루기 시작할 때 어느 함수에서도 `null`이 반환될지 모르게 되기 때문에 더욱 심해진다.)

```ts
const customerName = getUserName(userId, {
  defaultName: '서진',
});
```

대안으로 위와 같이 유효하지 않은 인자에 대해 반환할 기본값을 부여하는 방법이 제시되었다. 이는 확실히 지난 `null`, `-1` 등을 반환하는 방법보다는 진보한 방식이다.

그러나 기본값을 받는 코드가 매번 중복되기도 할 뿐더러 기본값 자체를 정하기가 어려운 상황도 많다. 사용자 정보를 가져오는 위에서 살펴본 `getUser` 함수의 경우 기본값으로 어떤 값을 제공하여야 하는가?

미궁에 빠지는 이 문제를 해결하는 것이 `Maybe` 모나드(혹은 언어에 따라 `Option`, `Optional`)이다.

# Maybe 모나드의 두 가지 상태

```ts
type Maybe<T> = Just<T> | Nothing;
```

`Maybe` 모나드에는 2가지 상태가 있다. 값을 가지고 있는 `Just`와 값이 없는 `Nothing`이다. `Maybe` 모나드를 반환하는 함수를 생각해 보면 다음과 같다.

```ts
function getUser(userId: number): Maybe<UserEntity> {
  if (isInvalid(userId)) {
    return Nothing();
  }

  // user를 가져오는 연산을 수행한다.
  // ...

  return Just(user);
}
```

즉, `getUser`는 사용자를 가져오는 데에 성공했을 경우 `Just(user)`, 실패했을 경우 `Nothing()`을 반환한다.


# Maybe 모나드를 다루는 방법

`Maybe` 모나드를 다루는 방법에 대해 알아보자. 보다 보면 배열의 메서드들과 공통되는 부분이 많음을 발견할 수 있을 것이다.

`Maybe`의 `map` 메서드는 `Maybe<T>` 안의 값을 변경할 때 사용한다. 

```ts
Maybe<T>.prototype.map: (mapper: (val: T) => U) => Maybe<U>

Just(1).map(x => x + 1) === Just(2)
Nothing().map(x => x + 1) === Nothing()
```

배열의 `map` 메서드와 유사하다.

`filter`는 `Maybe<T>` 내부의 값에 대한 조건을 평가하는 `boolean` 함수(술어 함수, predicate)를 받아 해당 함수가 거짓을 반환하면 해당 `Maybe`를 `Nothing`으로 바꾼다.

```ts
Maybe<T>.prototype.filter: (predicate: (val: T) => boolean) => Maybe<T>

Just(21).filter(x => x >= 20) === Just(21)
Just(15).filter(x => x >= 20) === Nothing()
Nothing().filter(x => x >= 20) === Nothing()
```

즉, 여기에서는 `Maybe<number>` 중 `Just` 인데 `20` 미만의 값을 가지는 것들을 `Nothing`으로 바꾼다.

`flatMap`은 `map`과 유사한 메서드이지만 `flatMap`에 인자로 넘기는 고차 함수도 `Maybe`를 반환한다는 점에서 `map`과 다르다.

```ts
Maybe<T>.prototype.flatMap: (flatMapper: (val: T) => Maybe<U>) => Maybe<U>

Just(1).flatMap(x => Just(x + 1)) === Just(2)
Just(1).flatMap(x => Nothing()) === Nothing()
```

위와 같이 `flatMap`에 인자로 전달되는 고차 함수의 반환값으로 `Maybe`의 값이 바뀐다고 생각하는 것이 이해에 도움이 된다.

`flatMap`이 강력한 점은 `map`과 `filter` 모두 `flatMap`만으로 구현할 수 있다는 점이다.

```ts
Just(1).map(x => x + 1) === Just(1).flatMap(x => Just(x + 1)) === Just(2)
Just(1).map(fn) === Just(1).flatMap(x => Just(fn(x))) // 위의 등식을 더욱 일반화시킨 것이다.

Just(1).filter(x => x > 0) === Just(1).flatMap(x => x > 0 ? Just(x) : Nothing()) === Just(1)
Just(1).filter(fn) === Just(1).flatMap(x => fn(x) ? Just(x) : Nothing()) // 위의 등식을 더욱 일반화시킨 것이다.
```

뿐만 아니라 `Maybe`에 `Maybe`가 중첩되는 복잡한 상황에서 `flatMap`은 더욱 강력하다.

```ts
function makeOddsDoubled(value: number): Maybe<number> {
  if (value % 2 === 0) {
    return Nothing();
  }

  return Just(value * 2);
}

Just(21).flatMap(makeOddsDoubled) === Just(42)
Just(20).flatMap(makeOddsDoubled) === Nothing()
```

일반적인 함수형 언어에서 사용되는 패턴 매칭을 사용하면 더욱 표현적인 코드를 사용할 수 있다.

```ts
Maybe<T>.prototype.match<U>: (matchers: {
  Just: (val: T) => U,
  Nothing: () => U
}) => U

function getGreetingMessage(user: Maybe<UserEntity>) {
  const userName = user.match({
    Just: u => u.name,
    Nothing: () => 'John Smith',
  });

  return `Hello, ${userName}!`;
}
```

또는 이를 더욱 편하게 사용하기 위해 `getOrElse` 메서드를 사용할 수도 있다.

```ts
Maybe<T>.prototype.getOrElse: (defaultValue: T) => T

function getGreetingMessage(user: Maybe<UserEntity>) {
  const userName = user.map(u => u.name).getOrElse('John Smith');

  return `Hello, ${userName}!`;
}
```

# 실전에서의 Maybe 모나드

실전에서 `Maybe` 모나드를 어떻게 사용하는지 보자.

```ts

function getUserScore(userId: number): Maybe<number> {
  return getUser(userId).map(user => user.score);
}

function getTotalSumOfUserScores(userIds: number[]): number {
  return userIds
    .map(id => getUserScore(id))
    .map(userScore => {
      // 사용자의 점수를 가져오지 못했을 경우 "0"으로 처리한다.
      return userScore.match({
        Just: score => score,
        Nothing: () => 0,
      });
    })
    .reduce((prev, curr) => prev + curr, 0);
}

getTotalSumOfUserScores([
  20161587,
  20130138,
  // ....
]) // --> 주어진 사용자 ID에 해당하는 점수를 모두 더한다.
```

사용자를 가져오지 못했을 때 해당 사용자 ID의 점수를 `0`으로 처리한다는 규칙을 간단히 붙여서 함수를 쉽게 구현할 수 있었다.

```ts
// 사용자가 조건에 부합하는지 검증하는 함수
function checkIfEligible(user: Maybe<UserEntity>): boolean {
  return user // 사용자가
    .filter(u => u.age >= 20) // 20세 이상이고
    .filter(u => u.isMale) // 남성인 경우에
    .map(() => true) // 조건에 부합한다고 판단한다.
    .getOrElse(false); // 아닌 경우 조건에 부합하지 않는다.
}

function getEligibleUsersCount(userIds: number[]): number {
  return userIds
    .map(id => getUser(id))
    .filter(user => checkIfEligible(user))
    .length;
}

getEligibleUsersCount([
  20161587,
  20130138,
  // ....
]) // --> 주어진 조건에 부합하는 사용자 수를 확인한다.
```

여기서도 마찬가지로 사용자를 가져오지 못했을 때 조건에 부합하지 않도록 한다는 규칙을 간단히 붙일 수 있었다. 

이처럼 `Maybe` 모나드로 예전에 암시적인 `null` 혹은 `undefined`로 위험하게 처리했던 문제를 더욱 명시적이고 안전하게 처리할 수 있다.

# 약간의 문제점

Java나 JavaScript와 같이 `null`이 모든 참조 타입의 변수에 할당될 수 있는 언어의 경우, `Maybe` 모나드를 불완전하게 만들 수 있다.

```ts
const user: UserEntity = null;
const maybeUser: Maybe<UserEntity> = Just(user) // === Just(null)
```

위의 코드에서 보듯 타입 시스템 상 `Just(null)` 혹은 `Just(undefined)`도 허용된 동작 안에 들어간다. 즉, 컴파일 에러가 나지 않는다.

이를 해결하기 위해서 TypeScript의 `--strict` 옵션처럼 `null`과 다른 참조 타입을 엄격히 분리하여 `null`을 포함하려면 `UserEntity | null`과 같이 명시적으로 유니온 타입으로 만들도록 하는 방법이 있고, 이것이 마땅치 않다면

```ts
Maybe.from: <T>(nullable: T | undefined | null) => Maybe<T>

Maybe.from(null) === Nothing()
Maybe.from(undefined) === Nothing()
Maybe.from(1) === Just(1)
```

위의 `Maybe.from`처럼 `null` 및 다른 `null`-스러운 값에 대해 자동으로 `Nothing`을 만들어 주는 함수를 만들어 사용해볼 수 있다. 실제로 Scala의 `Option.apply`는 이와 같이 구현되어 있다.

# 요약

1. `Maybe` 모나드는 어떤 연산의 결괏값이 있을 수도, 없을 수도 있음을 나타낸다.
2. 기존에는 값이 없을 수 있는 가능성에 대해,
    - 암시적으로 `null` 혹은 `undefined`를 반환하거나
    - 기본값을 명시적으로 받도록 하여

   대처하였으나, 런타임의 TypeError 위험성이 커지거나 기본값을 당장 정하기 어려운 이유로 인해 해결책이 깔끔하지 못했다.
3. `Maybe` 모나드는 값이 있는지 없는지 나타내는 맥락(`Just`, `Nothing`)을 함께 가지고 다니면서 명시적으로 값이 없을 수 있음을 나타낸다.
