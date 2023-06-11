---
title: Async와 Generator
tags:
  - javascript
published: true
date: "2023-06-11"
description: await 안쓰고 coroutine으로 await 구현해보기
---

# await의 동작 원리

아무튼 Promise는 async/await으로 인해 더욱 동기적인 흐름으로 비동기를 제어할 수 있게 되었다.

async와 await은 ES6에 추가된 뒤로 매우 사랑받고 있는 비동기 문법이다. await은 Promise가 끝날 때까지 기다렸다가 fulfilled 된 값으로 평가되게 한다.

문득 await이 어떻게 구현되는 건지 궁금해졌다. await에 대한 가장 정확한 명세는 tc39에서 찾을 수 있다.

<img width="500" alt="tc39 await에 대한 설명" src="https://github.com/ponjaehyeok/ponjaehyeok-blog/assets/79369983/17ff4bda-1717-4a33-b237-99b5187bdb2d" />

모르는 말들은 일단 넘어가고, 알아내 본 원리는

  1. 현재 컨텍스트 스위칭을 중지하고, Promise를 실행한다.
  2. 새로운 비동기 컨텍스트를 콜스택에 넣는다.
  3. Promise가 반환되면 비동기 컨텍스트가 종료되고 원래의 컨텍스트(async 함수)를 다시 실행 상태로 만든다.

와 같은 원리를 가지고 있었다. async/await은 실행 컨텍스트 단까지 조정되는 키워드였다.

이런 await 키워드를 await없이 구현할 수 있을까? 물론 할 수 있다.

# async 없는 async 함수 만들기

```javascript
function getUserId(name) {
  return Promise.resolve("12345678");
}
function getUserData(id) {
  return Promise.resolve({ id, someData: "notModified" });
}
function modifyData(id, modifyingData) {
  return Promise.resolve(modifyingData);
}

async function modifyUserData(name) {
  const userId = await getUserId(name);
  const userData = await getUserData(userId);
  const result = await modifyData(userId, { ...userData, someData: "modified" });

  console.log(userId, userData, result);
}

modifyUserData("gong");
```

예시를 위해 await으로 chain이 되도록 가상의 코드를 주르륵 짜보았다. `name`으로 `userId`를 가져오고, `userId`로 데이터를 변경시킨 후, `result`를 가져올 수 있다.

이 코드를 async/await을 쓰지 않고 구현해보자.

async/await을 쓰지 않고 이런 동기적인 코드를 만들기 위해서는 여러가지 방법이 있다.

첫 번째는 Promise와 then을 쓰는 것이다.

당연한 거 아닌가? 할 수도 있겠지만 사실 심플한 것이 베스트이다.

```javascript
function modifyUserData(name) {
  let userId;
  let userData;
  let result;

  new Promise((res) => res(getUserId(name)))
    .then((res) => ((userId = res), (res)))
    .then((res) => getUserData(res))
    .then((res) => ((userData = res), (res)))
    .then((res) => modifyData(userId, { ...res, someData: "modified" }))
    .then((res) => result = res)
    .then(() => console.log(result));
}
```

`let` 키워드를 사용해 변수를 세 개 선언해준 후, Promise 체인으로 동작을 실행해주었다.

깔끔함을 위해서 조금 번잡스럽게 작성된 감이 있지만, 어쨌든 이렇게 Promise chain으로 간단하게 동기적인 코드를 만들 수 있다.

# generator를 이용해 coroutine 방식으로 코드 짜보기

자바스크립트의 generator는 iterator를 손쉽게 만들어주는 특수한 함수다.

generator를 실행한 값의 next()를 호출해 다음 값을 가져올 수 있다. generator 내에서는 `yield`라는 키워드로 값을 평가하여 일종의 반환 비슷한 걸 하게 된다.

generator의 처음 `yield`부터 가장 마지막 `yield`까지 여러 값을 반환할 수 있는 셈이다.

```javascript
function *generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

const iter = generateSequence();

console.log(iter.next()) // { value: 1, done: false }
console.log(iter.next()) // { value: 2, done: false }
console.log(iter.next()) // { value: 3, done: true }
```

사실 여기서는 iterator 혹은 iterable-iterator를 잘 몰라도 괜찮다.

중요한 건 generator는 다음 `next() (yield)`가 호출 되기 전까지 함수의 실행이 지연된다는 것, 그리고 다음 `yield`의 실행의 진입점은 이전 `yield` 혹은 최상단이라는 점이다.

지연 가능하다는 점과 중간에 진입할 수 있다는 특징이 있어 `await`과 비슷하게 동작을 만들어볼 수 있다.

```javascript
function *modifyUserData(name) {
  const userId = yield getUserId(name);
  const userData = yield getUserData(userId);
  return modifyData(userId, { ...userData, someData: "modified" });
}
```

이런 식으로 할 수 있다. 여기서 `getUserId`는 `userId`를 `yield`하고, `getUserData`는 `userData`를 `yield`하는 등,

기존 `await` keyword 대신 `yield`를 사용해주었다. 마지막은 `return`으로 대체했다.

사실 `yield` 자체가 Promise의 fulfilled된 값을 가져와주지는 않는다. 그래서 Promise는 실행해주는 곳에서 별도로 꺼내주어야 한다.

값을 꺼내기 위해서 별도의 generator 실행, Promise에서 꺼내주는 함수를 만들어주어야 한다.

```javascript
function runner(generator) {
  const iter = generator();

  return function run(...arg) {
    const result = iter.next(..arg);

    return result.done
      ? result.value
      : Promise.resolve(result.value).then(run);
  }();
}

runner(modifyUserData).then(console.log);
```

runner와 modifyUserData는 서로 공을 주고 받듯이 제어권을 주고 받는다. runner(메인 함수)가 프로미스를 해결해주고, 다시 modifyUserData(서브 루틴)에게 넘겨준다.

이런 구조를 coroutine이라고도 하는데, 여러 함수가 중단되지 않고 실행 및 제어되는 구조를 말한다.

이렇게 generator를 이용하는 방식은 babel에서도 사용하는 방식이다.

<img width="500" alt="_asyncToGenerator from bable" src="https://github.com/ponjaehyeok/ponjaehyeok-blog/assets/79369983/9059c4ae-24ab-471e-adfd-1bb04c298a45">

<br />

<img width="500" alt="_asyncToGenerator and asyncToGeneratorStep" src="https://github.com/ponjaehyeok/ponjaehyeok-blog/assets/79369983/8040200b-ff4b-45c3-806b-98b005751881">

babel의 트랜스파일링 결과를 보면 `asyncToGenerator` 코드로 변환되는 것을 확인할 수 있다.

그렇다면 여기서 드는 의문점, `await`은 coroutine일까?

사실 coroutine을 그저 '비동기를 실행할 수 있는 한 가지 재미있는 방법' 중 하나로 여기고 있는 나한테는 조금 어려운 질문일 것이다.

하지만 분명한 것은 서로 동기적으로 제어권을 주고받는 coroutine과는 다르게, async/await은 **동기적인 것처럼**보일 뿐이라는 것이다.

```javascript
const waitThreeSeconds = async () => {
  console.log("start waiting");

  await new Promise((res) => setTimeout(res, 3000));

  console.log("end waiting");
};

waitThreeSeconds();
setTimeout(() => console.log("wait one second"), 1000);
```

await은 동기적으로 동작하는 게 아니라, 값을 동기적으로 반환할 뿐이다. 이를 동기적 병렬성이라고도 하는데,

이는 여러 작업이 동시에 진행되었다가, 다른 값을 기다리는 경우에는 순차적으로 진행되는 특징을 가진다.

await이 동기적으로 동작했다면 setTimeout은 "end waiting"이 출력된 후 1초 뒤에 실행되었겠지만 그렇지 않았다.

동작을 미리 병렬로 실행하는 특성때문에 그런 것이다.

# 참고

[Async-Await ≈ Generators + Promises](https://hackernoon.com/async-await-generators-promises-51f1a6ceede2)

[제너레이터와 프라미스를 이용한 비동기 처리](https://jeonghwan-kim.github.io/2016/12/15/coroutine.html)

[제너레이터](https://ko.javascript.info/generators)
