---
date: 2018-12-23T17:00:00+09:00
keywords: 일치 연산자, 동등 연산자
---

JavaScript를 다룬다고 하면 늘 듣는 말이 있다. "예측 불허의 언어", "false와 0이 같은 언어", "true와 1이 같은 언어", ... 이와 관련한 유명한 사진도 있는데 JavaScript에 대한 사람들의 생각을 압축적으로 표현한 것이 아닐까 싶다. (사실 부분적으로 공감이 되는 부분도 있다.)

![Thanks for inventing JavaScript](/images/thanks-for-inventing-javascript.jpg)

위의 그림에서 보듯이 `true == 1`, `true + true + true === 3` 등 이해하기 어려운 결과가 많다. 그러나 사실은 뒤에 숨겨져 있는 규칙을 알면 생각보다 단순하다. 

# JavaScript에서 동일성을 검증하는 세 가지 방법

JavaScript에는 동일성을 검증하기 위해 3가지 방법이 주어져 있다.

1. 엄격 일치 비교 (Strict Equality Comparison) 연산자 `===`
2. 추상 일치 비교 (Abstract Equality Comparison) 연산자 `==`
3. `Object.is`로 사용하는 `SameValue`

# 엄격 일치 비교 연산자 `===`

`===`는 생긴 것 때문에 "triple equals" 또는 우리말로 "는는는(...)"이라고 일컬어지곤 한다. 엄격 일치 연산이 이루어지는 규칙은 간단하다. ECMAScript [5.1 명세서](http://ecma-international.org/ecma-262/5.1/#sec-11.9.6)를 보면

값 `x`, `y`가 주어져서 `x === y`로 두 값을 비교할 때 그 결괏값은 `true` 또는 `false`이다.

1. `x`의 타입과 `y`의 타입이 다르면 `false`.
2. `x`와 `y`가 모두 `undefined`이면 `true`.
3. `x`와 `y`가 모두 `null`이면 `true`.
4. `x`와 `y`가 모두 `number` 타입이면
     1. `x`나 `y`가 `NaN`이면 `false`.
     2. `x`와 `y`가 같은 숫자 값을 가지면 `true`.
     3. `x`가 `+0`이고 `y`가 `-0`이면 `true`.
     4. `x`가 `-0`이고 `y`가 `+0`이면 `true`.
     5. 아무것에도 해당되지 않으면 (= `x`와 `y`의 값이 다르면) `false`.
5. `x`와 `y`가 모두 `string` 타입인 경우, `x`와 `y`에 정확하게 같은 순서로 문자들이 배열하고 있는 경우 (= 같은 길이이고 같은 위치엔 같은 문자만 있을 경우) `true`. 아니면 `false`.
6. `x`와 `y`가 모두 `boolean` 타입인 경우, `x`와 `y`가 모두 `true` 혹은 모두 `false`인 경우에만 `true`. 아니면 `false`.
7. 남은 경우는 `x`와 `y`가 참조 타입인 경우인데, `x`와 `y`가 모두 같은 객체를 참조하고 있으면 `true`. 아니면 `false`.

요약하자면

1. `x`와 `y`의 타입이 같고 값(또는 참조)이 같은 경우에만 `true`.
2. 아니면 `false`.

연산 규칙을 보면 대체로 자연스럽다. 실제로 아래와 같이 예상 가능한 결과가 나온다.

```ts
// '0'을 감싼 string 객체
const obj = new String('0'); 

0 === 0 // true
'0' === '0' // true
obj === obj // true

0 === '0' // false
0 === obj // false
'0' === obj // false

undefined === null // false
obj === null // false
obj === undefined // false
```

엄격 일치 연산자는 일치 여부를 판단할 때 거의 대부분의 경우에 제일 알맞은 연산자이다. 타입이 다른 경우 바로 `false`를 반환하기 때문에 일치하는지 검증할 때 타입 변환을 수행하는 `==`보다 효율적이기까지 하다.

그러나 `===`에도 주의하여야 할 점이 있는데 첫 번째는 `NaN`이다. `NaN`은 숫자 연산에서 허용되지 않는 연산이 나왔다는 뜻이기에 정의상 [어떤 값과도 일치하지 않는다](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN). (이는 `NaN`이 포함된 다른 언어에서도 마찬가지이다.) 어떤 변수가 `NaN`인지 확인하기 위해서는 `isNaN`을 이용하거나 자신을 포함한 어떤 값과도 일치하지 않는 성질을 이용하여 `x !== x`와 같은 연산을 이용하여 확인해야 한다.

```ts
NaN === NaN // false
NaN !== NaN // true
```

두 번째로 [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754)에 규정된 두 값 `+0`과 `-0`의 경우 엄격하게 평가하지 않고 동등하게 취급한다는 것이다. 거의 대부분의 경우에는 `+0`과 `-0`을 구분하면 오히려 문제가 되기에 `===`의 결과는 자연스럽다. 만약 `+0`과 `-0`을 구분해야 한다면 `Object.is`로 평가하는 `SameValue`를 사용하자.

# 추상 일치 비교 연산자 `==`

추상 일치 비교 연산자는 `===`에 자동 타입 변환이 들어간 것이다. 생긴 것 때문에 "double equals" 또는 한국어로 "는는"이라고 한다. ECMAScript [5.1 명세서](http://ecma-international.org/ecma-262/5.1/#sec-11.9.3)를 참고하면 다음과 같이 정의되어 있다.

값 `x`, `y`가 주어져서 `x == y`로 두 값을 비교할 때 그 결괏값은 `true` 또는 `false`이다.

1. `x`와 `y`의 타입이 같을 때는 `x === y`와 결괏값이 같다.
2. `x`가 `null`이고 `y`가 `undefined`이면 `true`.
3. `x`가 `undefined`이고 `y`가 `null`이면 `true`.
4. `x`가 `number`이고 `y`가 `string` 이면, `x == Number(y)`와 결괏값이 같다.
5. `x`가 `string`이고 `y`가 `number`이면, `Number(x) == y`와 결괏값이 같다.
6. `x`가 `boolean`이면 `Number(x) == y`와 결괏값이 같다.
7. `y`가 `boolean`이면 `x == Number(y)`와 결괏값이 같다.
8. `x`가 `string` 또는 `number`이고 `y`가 `object`이면, `x == y.toString()` (또는 `y.toString`이 없으면 `x == y.valueOf()`) 와 결괏값이 같다.
9. `x`가 `object`이고 `y`가 `string` 또는 `number`이면, `x.toString() == y` (또는 `x.toString`이 없으면 `x.valueOf() == y`) 와 결괏값이 같다.
10. `false` 반환.

규칙이 좀 길어졌지만 정리하자면 다음과 같다.

1. 타입이 같은 경우에는 `x === y`와 동일.
2. 타입이 다른데 
   1. `x`와 `y`가 둘 다 값 타입이면 `number`로 변환하여 동등성을 비교한다.
   2. `x`나 `y` 중 하나가 참조 타입이면 참조 타입 변수를 `toString`, `valueOf`를 이용해 값 타입으로 바꾸어 다시 동등성을 평가한다.
3. 아니면 `false`.

즉, 값 타입끼리는 숫자로 바꾸어 비교하고, 값 타입과 참조 타입 사이 비교는 참조 타입을 값 타입으로 바꾸어 비교한다는 것이다.

이제 위에서 보았던 이상한 `==`의 결과를 이해할 준비가 되었다.

`true == 1`인 이유는

```ts
Number(true) === 1 // 이므로

true == 1
--> Number(true) == 1
--> 1 == 1
--> true
```

`true + true + true == 3`인 이유는

```ts
Number(true) === 1

true + true + true
--> Number(true) + Number(true) + Number(true)
--> 1 + 1 + 1
--> 3

true + true + true == 3
--> 3 == 3
--> true
```

`"" == 0`인 이유는

```ts
Number("") === 0 // 이므로

"" == 0
--> Number("") == 0
--> 0 == 0
--> true
```

`false == '0'`인 이유는

```ts
Number(false) === 0
Number('0') === 0 // 이므로

false == '0'
--> false == Number('0')
--> false == 0
--> Number(false) == 0
--> 0 == 0
--> true
```

`[1, 2] == 1,2`인 이유는

```ts
[1, 2].toString() === `1,2` // 이므로

[1, 2] == '1,2'
--> [1, 2].toString() == '1,2'
--> '1,2' == '1,2'
--> true
```

`'0' != ''`인 이유는 두 피연산자 `'0'`와 `''`가 똑같이 `string` 타입이고 문자 배열이 일치하지 않기 때문이다.

## `==`의 사용을 피하자

`==`은 가급적 사용하지 않는 편이 좋다. 왜냐하면 정해진 규칙 상으로는 맞지만 (규칙이 없는 것은 아니다) 규칙이 예상하기 힘들고 생각지 못했던 값들이 일치해 버리는 경우가 많기 때문이다. 때문에 가능하다면 `===`을 쓰는 것이 프로그램 동작을 예상 가능하게 해 준다는 점에서 바람직하다.

그래도 `==`을 사용하면 좋은 하나의 사용처가 있는데 `undefined` / `null` 검증이 그것이다. JavaScript에서 npm을 통해 외부 라이브러리들을 사용하다 보면 `null`을 반환하는 함수가 있고 `undefined`를 반환하는 함수가 있는데 의미 없는 빈 값임은 매한가지이므로, 함께 처리하고 싶을 때가 있다. 그러면서 `0`, `''`와 같은 거짓으로 평가되는 값과 `null`, `undefined`를 구분짓고 싶을 때, `== null` 검증을 사용한다. `==`의 규칙 상 `null`은 자기 자신과 `undefined`에만 일치하기 때문이다.

```ts
undefined == null // true
0 == undefined // false
0 == null // false
'' == undefined // false
'' == null // false

function fn(optionalVal) {
  // optionalVal이 undefined 또는 null이면
  if (optionalVal == null) {
    // 함수를 실행하지 않고 반환
    return;
  }

  // 아니면 함수를 계속 실행, 이제 optionalVal은 undefined나 null이 아님
}
```

# SameValue 연산 `Object.is`

`Object.is`는 `===`에서 앞서 말한 주의점 `NaN`, `+0`, `-0`에 대한 처리만 달라진 것이다. 즉, 이러한 값을 특별히 생각하지 않고 `NaN`은 `NaN`과 같고, `+0`은 `-0`과 같지 않다고 판단하는 것이다. 즉

```ts
Object.is(NaN, NaN) // true
Object.is(+0, -0) // false
Object.is(+0, 0) // true
Object.is(0, -0) // false
```

그러나 `+0`을 `-0`을 구분할 필요가 있는 것이 아니라면 `Object.is`의 사용은 지양하는 것이 좋다. 대부분의 경우 `+0`과 `-0`을 구분하면 생각이 복잡해지고 예기치 못한 결과를 가져오기 때문이다. `NaN`에 대한 처리는 전역 함수 `isNaN`을 사용하는 것이 좋다.

```ts
isNaN(NaN) // true
```

# SameValueZero

가끔 JavaScript 글을 읽다 보면 `SameValueZero`에 대해 언급한 글들이 있다. 이것은 `SameValue`에서 다르게 생각했던 `+0`와 `-0`를 같게 생각하도록 바꾼 것이다. 즉, `NaN`이 서로 동일하다는 것만 제외하면 `===`와 동작이 같다.

이 `SameValueZero` 일치 검증은 `Array.prototype.includes`, `String.prototype.includes`와 같은 언어 내부 함수에서 사용된다.


# 요약
1. 엄격 일치 연산자 `===`는 타입이 같고 값이 같은 (또는 참조가 같은) 경우에만 참을 반환한다.
2. 추상 일치 연산자 `==`는 타입이 같은 경우 `===`와 같고, 타입이 다른 경우
   * 값 타입은 `number`로 바꾼 후 비교하고,
   * 참조 타입은 `toString` 혹은 `valueOf`로 값 타입으로 바꾸어 비교한다.
3. `Object.is`는 `NaN`에 대한 일치나 `+0`, `-0`에 대한 불일치가 필요할 때 사용한다.