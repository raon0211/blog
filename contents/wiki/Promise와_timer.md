---
keywords:
date: 2019-09-14T16:20:00+09:00
summary: 용도에 맞는 도구를 찾아보자
---

Promise가 JavaScript에 본격적으로 도입된지 4년 정도가 지났다. 이제 Promise는 비동기 작업을 값으로 처리하기 위해서 필수적인 도구가 되었다. 그러나 Promise를 사용함에 있어서 주의해야 할 점이 몇 가지 있다. 그 중 하나의 경우가 `setTimeout`과 같은 타이머 함수를 사용하는 경우이다. 아래와 같은 간단한 프로그램을 살펴보자.

```ts
function timeout(ms: number) {
  return new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error(‘Timeout’));
    }, ms);
  }
}

async function main() {
  const result = await Promise.race([
    doSomeAsynchronousTask(),
    timeout(30000),
  ]);
  
  console.log(result);
}

main();
```

위 프로그램에서는 `doSomeAsynchronousTask()`라고 하는 비동기 작업을 수행하면서, 30초 안에 해당 작업이 완료되지 않으면 타임아웃 에러를 발생시키고 있다. 언뜻 보아서는 큰 문제가 없는 것 같다. 그러나 사실은 그 안에 비동기와 관련된 문제를 품고 있다.

## Promise는 ‘취소 불가능한’ 미래의 값

위 프로그램을 한 번 실행해 보자. 그러면 `doSomeAsynchronousTask()`가 1초만에 완료되더라도 `timeout`이 반환하는 Promise 작업은 30초가 지날 때까지 계속해서 실행됨을 확인할 수 있다. 일반적으로 프로그램을 작성한 의도대로라면 `doSomeAsynchronousTask()`가 완료된 직후에 `timeout` Promise는 정리가 되는 것을 기대하겠지만 그렇지 않은 것이다.

위 프로그램이 Node.js 런타임에서 실행된다면, 1초만에 비동기 작업이 종료되더라도 Node.js 프로세스는 최소 30초동안 실행되게 된다. 간단한 프로그램이라면 큰 문제가 아닐 수 있겠지만 복잡한 프로그램인 경우, 특히 `race`에 주어진 Promise들 중 어느 하나가 부수 효과^Side effect^를 내는 경우라면 예상치 못한 버그가 발생할 수 있다.

Promise를 취소할 수 있는 방법이 있다면 좋을 것 같다. 그러나 Promise는 설계 상 ‘취소할 수 없는’ 미래의 값이다. Promise는 설계 상 한 번 만들어지고 난 이후 값처럼 여러 구독자에 공유될 수 있다. 때문에 Promise는 불변 객체와 같이 한 번 만들어지면 수정(=취소)될 수 없다. 오직 대기^Pending^ 상태에서 완료^Fulfilled^ 또는 실패^Rejected^ 상태의 한 방향으로 움직일 뿐이다. 만약 Promise가 취소 가능하다면, 하나의 Promise를 여러 개의 함수에서 다룰 때 각각의 함수에서 이 Promise가 언제 취소될지 늘 걱정하면서 코딩해야 할 것이다 (경쟁 상태^Race condition^).

결론적으로, Promise는 이러한 ‘취소 가능한’ 종류의 작업에 알맞게 설계된 도구가 아니다. 이런 작업에 더 알맞은 도구를 사용해야 한다.

## RxJS의 Observable

RxJS의 Observable은 이러한 종류의 작업에 알맞은 도구이다. Observable은

1. Promise와 같이 비동기 작업의 결괏값을 담을 수 있는 도구이다.
2. (기본적으로) 공유될 수 없고 하나의 구독자만을 가질 수 있다.
3. 때문에 취소 가능하다.

위에 있던 코드를 RxJS로 작성한다면 다음과 같다.

```ts
import { race, timeout } from ‘rxjs’;

function main() {
  race(
    doSomeAsynchronousTask(), // Observable을 반환하도록 변경
	  timeout(30000),
  ).subscribe(result => {
    console.log(result);
  });
}

main();
```

이렇게 코드를 작성한다면 `doSomeAsynchronousTask()` 작업이 먼저 종료되면 자동으로 `timeout` 작업은 취소된다. Node.js 환경에서 이 프로그램을 실행한다면 이전 프로그램과는 달리 `doSomeAsynchronousTask()`가 완료된 직후에 안전하게 종료될 것이다.

## 정리

1. `Promise`와 RxJS의 `Observable`은 모두 미래에 완료될 작업의 결괏값을 담는 도구이다.
2. `Promise`는 여러 구독자 사이에서 공유될 수 있고, 때문에 취소될 수 없다.
3. `Observable`은 구독자가 하나임이 보장된다. 때문에 취소할 수 있다.
4. 비동기 작업을 취소하는 등의 복잡한 작업에서라면 RxJS의 `Observable`을 사용하는 것이 더 적합하다.
