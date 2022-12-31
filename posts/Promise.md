---
title: Promise
tags:
  - javascript
published: true
date: "2022-07-14"
description: 모든 비동기의 근간이 되는 개념
---

`Promise`는 비동기적인 코드를 처리할 때, 도움이 되는 개념이다.

## 콜백 지옥
맨 처음, `Promise`라는 개념이 없었을 때는 비동기 흐름을 callback 함수를 이용하여 제어했다.

callback 함수를 많이 쓰면 쓰게 될수록, 코드가 복잡해지고 가독성이 떨어지는 단점이 있다.
<br />

이를 '콜백 지옥'이라고 한다.
<br />

아래 코드는 주식을 구매하는 코드를 구현해본 것이다.

보통의 코드는 동기적으로 실행된다. 그래서 콜백 함수를 덕지덕지 써야할 일이 없다.

우리는 콜백 지옥을 체험해보기 위해, 코드의 각 단계가 비동기적으로 실행된다고 생각해보자.
<br />

예를 들어 주식의 가격을 가져오는 코드가 비동기적으로 실행되고,

그 다음 주식의 가격을 달러에서 원화로 나타내는 코드가 비동기적으로 실행되고..
<br />

이렇게 비동기적으로 실행(하는 것으로 생각)하는 함수는,

각 함수가 실행되고 난 뒤에 콜백 함수를 불러오는 방식으로 비동기 흐름을 처리할 수 있다.
<br />

callback 함수를 사용하는 방식으로, 비동기 함수(라고 생각하기로 한 함수)를 많이 실행해보자.
<br />

여기서는 `callbackIterator`라는 함수를 생성해 callback 함수를 실행했다.

아래의 코드를 해석하거나 이해하려고 할 필요는 없다.
```js
const wallet = {
  money: 1500000,
};

const usdStockPrice = {
  spy: 380.83,
  qqq: 286.24,
};

const exchangeRate = {
  usdkrw: 1304,
};

const exchangeFee = 1.75

function callbackIterator (func, ...args) {
  return func.apply(null, args);
};

/* Callback Hell */
function buyUsdStock (ticker, quantity) {
  return callbackIterator((data) => {
      return callbackIterator((data) => {
        return callbackIterator((data) => {
          return callbackIterator((data) => {
           return callbackIterator((data) => {
             if (wallet.money > data) {
               console.log(`거래 성공. ${ticker} ${quantity}개 구매 완료.`)
               wallet.money -= data;
               return callbackIterator((data) => {
                 if (wallet[ticker]) {
                   wallet[ticker] += quantity;
                 } else {
                   wallet[ticker] = quantity;
                 }

                 return wallet;
               }, ticker, quantity);
             } else {
               console.log('잔액 부족. 거래를 실행할 수 없습니다.');

               return wallet;
             }
           }, Math.floor(data)); 
          }, data * exchangeFee / 100 + data);
        }, data * exchangeRate.usdkrw);
      }, data * quantity);
    }, usdStockPrice[ticker]);
}

console.log(buyUsdStock('qqq', 3)); // "거래 성공. qqq 3개 구매 완료."
console.log(buyUsdStock('spy', 3)); // "잔액 부족. 거래를 실행할 수 없습니다."
```
이렇게 끔찍한 코드가 만들어졌다.
<br />

다시 한 번 말하지만, 위의 코드를 굳이 이해하려고 할 필요는 없다.

그저 콜백함수를 연달아서 계속해서 쓰는 것이 얼마나 복잡한 일인지 알기만 하면 된다.
<br />

callback 함수를 이용한 비동기 처리에는 여러 문제점이 있는데,

우선 콜백 함수를 연달아 쓰게 되면서, 전체적인 코드의 가독성이 심각하게 떨어지게 되었다는 점이다.

그리고 이것말고도 callback 함수를 이용한 방법의 문제점이 또 있는데,

이는 나중에 살펴보자.

## Promise의 등장
callback 함수를 이용한 비동기 처리의 여러 문제점들을 해결하기 위해

자바스크립트에는 `Promise`라는 개념이 등장하게 되었다.
<br /> 

사실 최신 자바스크립트로 계속 업데이트 되면서, `async`/`await` 같은 개념들도 생겨났고,

`async`/`await`은 `Promise` 문법보다 훨씬 간단하게 비동기 처리를 할 수 있다.

그럼에도 우리가 `Promise`를 알아야 할 이유는 무엇일까.
<br />

`async`/`await`도 결국 `Promise` 문법을 바탕으로 하여 나온 것이기 때문이다.

`Promise`를 배우지 않고 `async`/`await`을 먼저 배운다고 한들,

비동기에 대해서 완전히 이해할 수는 없게 된다.
<br />

또 반대로 `Promise`를 이해하게 된다면, `async`/`await`은 조금만 배워도 바로 개념이 이해가 될 것이다.

그 뿐만 아니라 `fetch`와 같은 자바스크립트 내장 함수도 `Promise`를 이용한다.

자바스크립트의 비동기를 이해하는데 `Promise`는 빼놓을 수 없는 개념이다.
<br />

`Promise`에 대한 오해 중 하나는, 콜백 지옥을 처리하기 위해 생겨났다는 것이다.

물론 완전히 틀린 말은 아니다. 콜백 지옥을 조금 더 깔끔하게 해줄 수 있기 때문이다.

다만 `Promise`는 코드를 간결히 하기 위해서만 탄생한 것은 아니다.
<br />

기존의 callback 함수를 이용하는 방법의 문제점은, 
<br />

1. callback 함수의 실행이 성공하였는지, 또는 실패하였는지, 아니 애초에 실행은 하였는지 등 함수 실행 상태를 받아올 수 없었다.
<br />

어떤 비동기 함수 내에 callback 함수를 넣을 수는 있지만,

그 함수가 실행되기 전에는 그 함수가 실행되었는 지 알 수가 없다.

그리고 실행 상태에 따라서 분기적으로 처리할 수도 없다.
<br />

물론 내부적으로 아예 구현이 불가능하지는 않을 것이다.

그런데 콜백 지옥에 더해서 그런 코드까지 삽입하게 된다면, 아주 울트라 지옥이 될 것이다.
<br />

이러한 점을 함수의 실행상태를 수동적으로 처리한다고 표현할 수 있다.
<br />

2. callback 함수가 어떤 값을 반환할 수 없다. 그래서 외부에서 callback 함수 내의 값을 사용할 수 없게 된다.
<br />

`callback` 함수 내부에서 어떤 값을 `return` 할 수는 있지만,

이 값을 외부에서 자유롭게 사용할 수는 없다.
<br />

만약 어떤 비동기적인 코드를 쭉 작성하고,

함수 외부에서 값을 가져오려면 어떻게 해야할까?
<br />

이 또한 내부적으로 아주 구현이 불가능하지는 않을 테지만,

마찬가지로 코드가 울트라 지옥이 될 것이다.
<br />

`Promise`가 등장하게 되면서, 콜백 지옥을 해결하게 될 뿐만 아니라

위와 같은 문제점들도 효과적으로 해결할 수 있게 되었다.

## Promise
`Promise`는 다음과 같이 사용할 수 있다.
```js
const promise = new Promise(function (resolve, reject) {});
```
`Promise` 생성자 함수를 사용해 `Promise` 인스턴스를 사용하면 된다.
<br />

`Promise` 생성자 함수는 함수를 인자로 받는다.

이 때 인자로 받는 함수를 실행하게 된다. 
<br />

주의할 점은, 저렇게 `Promise` 객체를 생성하게 되면은 `Promise`를 바로 실행한다는 점이다.

`Promise` 객체를 저장하여 나중에 사용하고 싶다면,

`Promise`를 반환하는 함수를 만드는 방법이 있다.
```js
const promise = function () {
  return new Promise(function (resolve, reject) {});
};

promise();
```

인자로 받는 함수는 `resolve`, `reject라는` 함수를 매개 변수로 사용할 수 있다.

인자로 받는 함수의 내부에서 어떤 코드를 진행하고,

동작이 성공하면 `resolve`, 실패하면 `reject` 함수를 호출하면 된다.

또 결과값을 `resolve`나 `reject` 함수의 인자로 전달해줄 수 있다.
<br />

`Promise` 객체에는 두 개의 값(내부 프로퍼티)을 가지고 있다.
<br />

첫 번째는 `state`. `promise가` 실행되고 처음에는 `<Pending>` 상태가 되었다가,

`resolve`가 실행되면 `<Fulfilled>`, `reject`가 실행되면 `<Rejected>` 상태가 된다.

만약 둘 다 실행하지 않는다면, `state`는 계속 `Pending` 상태로 있을 것이다.
<br />

`state`는 위의 콜백 함수를 이용한 처리의 문제점에서 지적된,

함수의 실행 상태를 알 수 없는 문제점이 해결해줄 수 있다.
<br />

두 번째는 `result` 값이다. `pending` 상태에는 `undefined`로 있게 된다.

`resolve(value)`가 호출되면은 `result`는 value가 되고,

반대로 `reject(error)`가 호출되면 `result`는 `error` 값이 된다.
<br />

콜백 함수를 이용했을때의 두 번째 문제점은, 값을 반환할 수 없다는 것이었다.

그러나 `Promise`에서는, `solve`, `reject`를 호출할 때 결과값을 인자로 전달하는 것으로

결과값을 반환해주는 효과를 낼 수 있다.


다음은 `Promise` 객체 `promise`를 생성해, `resolve(10)`을 실행한 코드다.

`promise`를 확인하였을 때, 결과값(`PromiseResult`)으로 10이 출력되는 것을 확인할 수 있다.

또 정상적으로 `resolve`가 되어 상태(`PromiseState`)가 `"fulfilled"`인 점도 확인해볼 수 있다.

## .then()
`Promise` 객체는 `.then()`, `.catch()`, `.finally()` 와 같은 메소드를 사용할 수 있다.

다 비슷한 기능이라 굳이 어려워할 필요가 없다.
<br />

`.then()`은 `Promise`가 생성된 이 후에, 또 다른 작업을 해줄 수 있는 메소드이다.

`.then()`에도 함수를 인자로 넣어, 그 함수를 실행해준다.
```js
const promise = new Promise((resolve, reject) => {
  console.log('1단계 성공');
  resolve();
});

promise
  .then(() => {
    console.log('2단계도 성공');
  });
```

`then` 메소드가 인자로 받는 함수에서, 앞의 `Promise`의 결과값을 받을 수도 있다.
```js
const promise = new Promise((resolve, reject) => {
  console.log('1단계 성공');
  resolve(10);
});

promise
  .then((data) => {
    console.log('2단계도 성공');
    console.log(data); // 10
    
    return data + 10;
  })
  .then((data) => {
    console.log('3단계마저 성공');
    console.log(data); // 20
  });
```
첫 번째 `then`에서 `promise`의 결과값(`10`)을 받아 출력해주었다.

그리고 `return`을 해주었는데, `return`값은 다음 `then`에서 사용할 수 있게된다.
<br />

만약 어떤 값을 `return`하지 않는다면, 다음 `then`에서는 `undefined`를 받게 된다.
<br />

위 코드에서 `.then`은 한 번만 쓸 수 있는게 아니라, 계속해서 이어붙일 수 있다는 걸 알 수 있다.

이렇게 `Promise`에서 `then`과 같은 메소드들을 연쇄적으로 사용하는 것을 프로미스 체이닝이라고 한다.
<br />

`.then()`등의 메소드를 사용할 때 알아야 할 점은, 해당 코드가 비동기적으로 실행된다는 점이다.

처음 생성된 `Promise`의 내부 코드들은 동기적으로 실행되는 반면,

`.then()`등의 메소드의 인자로 받는 함수는 비동기적으로 실행된다.
<br />

`setTimeout()`으로 실행하는 것과 비슷하다고 볼 수 있는데,

해당 내용이 이해가 가지 않는다면 이벤트 루프에 대해 공부하면 쉽게 이해할 수 있다.
```js
console.log(0);

const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve();
});

console.log(2);

promise
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(4);     
  });

console.log(5);

// 0 -> 1 -> 2 -> 5 -> 3 -> 4의 순으로 콘솔에 출력된다.
```

위와 같이 `then`을 쭉 이어쓰게 되면서, 콜백 지옥에서 맛보았던 복잡함을 해소할 수 있게 되었다.

일일이 콜백 함수를 내부에 넣어주는 것 대신, 언제든지 `.then`을 사용할 수 있기 때문이다.
<br />

어떻게 가능한 것일까?

그건 `.then()` 메소드가 `Promise` 객체를 반환하기 때문이다.

`then()`으로 함수를 실행하게 되면, 그 자체로 `Promise` 객체를 반환해 `then`을 추가로 쓸 수 있게 되는 것이다.
<br />

그런데 이상한 점은, `Promise` 객체라면은 내부에 `resolve와` `reject가` 호출되어야 하는데

`then`의 인자로 들어가는 함수에는 그렇지 않다.
<br />

`then`에 들어가는 함수는 `resolve`와 `reject` 처리가 자동으로 지정되어 있는 `Promise` 객체라고 생각하는게 편하다.

`then`의 함수 내에서 어떤 값이 반환(`return`) 되었을 경우 `resolve`,

어떤 에러가 발생했을 경우는 `reject로` 처리되는 것이다.
<br />

`Promise`를 반환하는 많은 함수들(`fetch`, `async`/`await`)이 이와 같은 방식을 취하고 있다.

## Promise의 에러 핸들링
`.then()`이 성공(`resolve`)한 결과값을 반환해 특정 작업을 하는 것과는 달리,

`.catch()`는 실패(`reject`)했을 때 실행되는 메소드이다.

`.then()`과 마찬가지로, Promise 객체를 반환한다.

```js
const promise = new Promise((resolve, reject) => { 
  reject(10);
});

promise
  .then((data) => {
    console.log("성공");
    console.log(data);
  })
  .catch((err) => {
    console.log("실패");
    console.log(err);
  });
```
다음 코드를 실행 시, `"실패"`와 `10`이 콘솔에 출력된다.

`.catch()`에서 에러를 캐치해서 그 값을 받아온 것이다.
<br />

`Promise`의 에러 핸들링에는 두 가지 방식을 사용할 수 있는데,

하나는 `then`만을 사용하는 방식이고, 두 번째는 `then`과 `catch`를 함께 쓰는 방식이다.
```js
const promise = new Promise((resolve, reject) => { 
  reject(10);
});

promise
  .then((data) => {
    console.log("성공");
    console.log(data);
  }, (err) => {
    console.log("실패");
    console.log(err);
  }); 
  
  // Promise.then(onFulfilled, onRejected);
```
코드를 다음과 같이 작성해도 위에서 작성한 것과 동일하게 `"실패"`와 `10`이 콘솔에 출력된다.
<br />

`.then()`의 인자로는 `onFulfilled`, 성공하였을 때 출력할 함수와

`onRejected`, 실패하였을 때 출력할 함수 두 개를 인자로 받을 수 있기 때문이다.
<br />

`.then()`을 이용한 방식은 에러 핸들링에 잘 쓰이지 않는 편이다.

그 이유는 `.then()`만을 사용할 경우, `then`의 `onFulfilled` 함수에서 에러가 발생하게 되더라도

에러를 핸들링할 수 없다는 단점이 있기 때문이다.
```js
const promise = new Promise((resolve, reject) => {
  console.log('1단계 성공'); // 1단계 성공
  resolve(10);
});

promise
  .then((data) => {
    console.log('2단계도 성공'); // 2단계도 성공
    console.log(data); // 10
    
    return data + 10;
  })
  .then((data) => {
    console.log('3단계마저 성공'); // 3단계마저 성공
    console.log(data); // 20
  
    return data + 10;
  })
  .then((data) => {
    console.log('4단계는 실패'); // 4단계는 실패
    throw new Error('4단계에서 실패하였습니다.');
  })
  .then((data) => {
    console.log('5단계는... 성공?') // 콘솔에 출력 X
  })
  .catch((err) => {
    console.log(err); // Error: 4단계에서 실패하였습니다.
  });
```
반면 이렇게 `catch`를 이용해 프로미스 체이닝에서 에러 핸들링을 할 수도 있다.

대체로 많은 코드에서 이런 방식을 사용하고 있다.

마지막에 `.catch`를 쓴 것만으로, 어떤 과정에서 `Error`가 나게 되더라도 에러를 다룰 수 있는 장점이 있다.

 

이는 `try...catch`로 사용하는 에러 핸들링 방식과 유사한 방식이기도 하다.

`try`문 내에서 에러가 발생했을 시, `catch`문에서 에러를 처리하게 된다.

```js
try {
  process1();
  process2();
  process3();
} catch(err) {
  // Handling Error
}
```

마지막으로 `.finally()`에 대해 설명하자면, `.finally()`는 `.then()`이나` .catch()`처럼 `Promise` 객체를 반환하는 메소드이다.

`.finally`는 함수의 성공이나 실패와는 상관없이 마지막에 무조건 한 번 실행된다.
<br />

`.finally()`는 앞의 두 메소드와는 다르게, 인자로 들어가는 함수에서 `Promise`의 결과값을 매개변수로 받을 수 없다. 
```js
const promise = new Promise((resolve, reject) => {
  resolve(10);
});

const finallyPromise = promise.finally(() => {
  console.log("끝"); // 끝
});

setTimeout(() => console.log(finallyPromise), 0); // Promise {<fulfilled>: 10}
const promise = new Promise((resolve, reject) => {
  resolve(10);
});

const thenPromise = promise.then(() => {
  console.log("끝"); // 끝
});

setTimeout(() => console.log(thenPromise), 0); // Promise {<fulfilled>: undefined}
```
위 코드와 아래 코드의 차이는, `finally`를 썼느냐 `then`을 썼느냐의 차이이다.

(`.then()`과 `.finally`는 비동기적으로 처리되기 때문에, `setTimeout`을 사용해 콘솔에 출력하였다.)

`.finally()`로 끝낸 코드는 따로 결과값을 받지 않고,

`Promise`에서 전달받은 결과값(`10`)을 그대로 전달하는 것을 알 수 있다.
<br />

반면 `then`으로 끝낸 경우, 인자로 받은 함수 내에서 별도의 `return` 값이 없으므로

결과값은 `undefined`가 된다.