---
title: Closure의 활용
tags:
  - javascript
  - 코어 자바스크립트
published: true
date: "2022-04-11"
description: 클로저에 대한 개념 정리 2편
---

지난 Closure 포스트에서는 Closure의 의미와 생성에 대해서 알아보았다. 그러면은 이 클로저를 어떻게 활용할 수 있을 지 알아보자. 클로저는 여기서 설명한 것 이외에도, 코드의 많은 부분에서 활용할 수가 있다.

## 정보 은닉(Information Hiding)

우리가 변수를 선언할 때, 전역 공간에 선언하는 경우가 많다. 전역 공간에 선언하였을 경우, 대부분의 스코프에서 접근하고 변경할 수 있다는 장점이 있다. 하지만 그만큼 어디에서나 변경이 가능하고 쉽게 변하게 될 수 있는 환경에 놓이는 것은 좋지 못하다.

그와 반대로, 어떤 함수에서 개인적으로 변경가능한 변수가 있다면은 훨씬 더 안전한 코드가 될 수 있다. 이렇게 외부로부터 변수가 은폐되는 것을 정보 은닉(Information Hiding)이라고 한다.

```js
const game = {
  score: Math.ceil(Math.random() * 10000),
  showScore: function () {
    alert(this.score);
  }
};

game.showScore(); // 0 ~ 10000 사이 랜덤 점수

game.score = 10000;
game.showScore(); // 10000
```

만약 게임을 실행해 어떤 스코어가 나왔다고 생각해보자. 여기서는 그냥 랜덤한 수로 만들었다. 스코어는 정상적으로 랜덤하게 나온다. 그런데 `game` 객체 내의 `score` 프로퍼티를 아주 쉽게 수정해서 조작할 수가 있다. `score`를 보호해줄 필요가 있다.

```js
const game = function () {
  let score = Math.ceil(Math.random() * 10000);
  
  return {
    showScore: function () {
      alert(score);
    }
  };
};

const game1 = game();
game1.showScore(); // 0 ~ 10000 사이 랜덤 점수​
```
이번에는 `game`이 함수로 바뀌었다. 그리고 객체를 `return`하면서 `score` 변수를 클로저로 처리하였다. 이렇게되면 전역 공간에서 `score` 변수는 건드릴 수가 없다.

## 클로저를 이용한 부분 적용 함수 구현
부분 적용 함수란, n개의 인자를 받는 함수에 미리 m개의 인자를 넘겨 기억하게 한 다음, 추후 n - m개의 인자를 넘겨 함수를 실행시킬 수 있는 함수이다. 이전에 `this`에 대해 글을 썼을 때, `.bind()`에 대해 작성한 적이 있다. `bind`는 어떤 함수에 대해 `this`가 바인딩할 객체를 지정해준 후, 그 함수를 반환해주는 메소드이다.

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind]()

```js
const add = function () {
  let result = 0;
  
  for (let i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  
  return result;
}

const partialAdd = add.bind(null, 10);

console.log(partialAdd(30, 40, 50)); // 130
```

`.bind()`를 이용해 미리 인자를 넘겨주어 이렇게 부분 적용 함수를 구현할 수 있다. 그런데 우리는 별도로 클로저를 이용해 부분 적용 함수를 구현해보자. `.bind()`를 이용한 방법은, `this`의 지정에 관여하는 등의 문제가 있다.

```js
const partial = function () {
  const originalArgs = arguments;
  const func = arguments[0];
  
  if (typeof func !== 'function') {
    throw new Error('첫 번째 인자가 함수가 아닙니다.');
  }
  
  return function () {
    const partialArgs = Array.prototype.slice.call(originalArgs, 1);
    const restArgs = Array.prototype.slice.call(arguments);
    return func.apply(this, partialArgs.concat(restArgs));
  };
};

const add = function () {
  let result = 0;
  
  for (let i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  
  return result;
}

const partialAdd = partial(add, 10);

console.log(partialAdd(30, 40, 50)); // 130
```

`partial`이라는 함수를 새로 만들었다. 이 함수의 첫 번째 인자는 무조건 함수가 되도록 설정해주었다. 그리고 나머지 인자를 별도의 `originalArgs` 변수에 저장하였다. 그리고 전달받은 func 함수를 저장된 `originalArgs` 인자들과 추후 들어오게 될 인자(`arguments`)와 함께 실행시킨다. 이렇게하면 `this`에 영향을 주지도 않는다.

`partial` 함수에서 클로저가 핵심적인 작동 원리로 동작한다. `partial`이 반환하는 함수에서, 미리 저장된 인자와 실행하는 함수를 활용하는 점은 클로저를 완전하게 활용하는 것이다.부분 적용 함수의 다른 예시로, 디바운스 함수를 구현해보자.

debounce 함수는 throttle과 함께 프론트엔드의 성능 최적화를 위한 장치 중 하나다. debounce는 특정 동작이 여러 번 실행 될 경우, 가장 처음 또는 마지막의 동작만 수행하도록 해준다. 함수를 debounce로 만들 `func`와 `wait`을 인자로 받는다. 어떤 동작 후에 `wait`시간 동안 동작을 하지 않으면 함수가 실행된다.

```js
const debounce = function (func, wait) {
  let reserveInvoke = null;
  
  return function (event) {
    clearTimeout(reserveInvoke);
    reserveInvoke = setTimeout(func.bind(this, event), wait);
  }
}

document.body.addEventListener('mousemove', debounce(() => {
  console.log('마우스 움직여따!')
}, 500));
```
body에 EventListener를 추가했는데, debounce를 사용했다. 원래라면 마우스가 움직일 때 마다 콘솔이 출력되었겠지만, 여기서는 가장 마지막 동작 후 500ms 동안 다음 동작이 없을 때 함수가 실행된다. 이 또한 클로저를 이용해, 실행할 함수(`func`)와 `wait`, 그리고 `setTimeout`에 쓰이는 변수를 클로저화 해 저장할 수 있었다.

## 커링 함수 구현

커링 함수란, 여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 호출될 수 있게 만든 함수다. 위에서 본 부분 적용 함수와 비슷한데, 다른 점은 무조건 하나의 인자만 전달하는 것과 마지막 인자가 전달되기 전에는 원본 함수가 실행되지 않는 점을 들 수 있다.

```js
const curry3 = function (func) {
  return function (a) {
    return function (b) {
      return func(a, b);
    };
  };
};

const getMaxWith10 = curry3(Math.max)(10);

console.log(getMaxWith10(8)); // 10
console.log(getMaxWith10(25)); // 25
```
커링 함수는 간단하게 만들 수 있다. 함수의 인자 갯수만큼 함수를 `return` 시켜주면 된다. 물론 반환되는 각 함수는 클로저화 되어서 지속적으로 기억하게 된다. 인자의 갯수가 많아지면, 가독성이 좋지 못할 수도 있다. 그럴 때는 화살표 함수를 사용할 수 있다.

```js
const curry3 = func => a => b => func(a, b);
const getMaxWith10 = curry3(Math.max)(10);

console.log(getMaxWith10(8)); // 10
console.log(getMaxWith10(25)); // 25
```

커링 함수의 장점은, 지연실행을 할 수가 있다는 것이다. 함수가 당장 필요한 정보만 받고 전달하고, 또 필요한 정보가 들어오면 전달하는 식으로 마지막 인자가 들어올 때까지 함수 실행을 미룰 수가 있다. 그리고 이를 지연 실행이라고 한다. 여러 프레임워크나 라이브러리 등에서 커링을 사용하는 경우가 많다.

여기 소개된 사례 말고도 정말 많고 많은 부분에서 클로저가 사용된다. 클로저를 현명하게 사용할 경우, 좀 더 안전하고 활용도 높은 코드를 만들 수 있다.

### 참고
- 정재남 『코어 자바스크립트』, 위키북스(2019)
- [https://im-developer.tistory.com/106]()
- [https://webclub.tistory.com/607]()
