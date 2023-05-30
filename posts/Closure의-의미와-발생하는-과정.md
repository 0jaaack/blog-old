---
title: Closure란?
tags:
  - javascript
  - 코어 자바스크립트
published: true
date: "2022-04-06"
description: 클로저 개념과 발생, 가비지 컬렉션과 메모리 누수까지
---

## Clousure란?
Closure를 알든 아니면 그렇지 않든 간에, 지금도 자바스크립트를 짜는 많은 코드들에서 클로저가 생겨나고 있다.
<br />

클로저란 어떤 것일까. 우선 Closure란 말의 뜻을 살펴보면, 폐쇄라는 의미가 있다고 한다. close라는 단어에 ‘닫다'라는 의미가 있는 것과 연관이 있는 듯하다. 
<br />

자바스크립트에서 Closure란, **함수가 선언 될 당시 주변 환경과 함께 갇히는 것**이라고 한다. 이렇게 표현해도 조금 알쏭달쏭하다. 사실 Closure를 한 문장으로 간단하게 이해하기는 쉽지 않다. MDN에 클로저를 검색하면, 다음과 같은 해석을 해준다.
<br/>

> "클로저는 함수와 함수가 선언된 어휘적 환경의 조합이다."

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures]()
<br />

좀 더 풀어서 설명을 해보면, 클로저란 **어떤 함수에서 선언한 변수를(주변 환경을), 계속 기억하는 현상**이다.
<br />

예제를 한 번 살펴보자.

```js
const outer = function () {
  const num = 99;
  const inner = function () {
    console.log(num);
  };

  inner();
};

outer();
```

위의 말대로 코드를 짜보았다. 함수에서 내부 변수를 선언하고(`num`), 내부 함수를 만들어 준 후 내부 변수를 참조하도록 해주었다. 이러면 클로저가 생긴 걸까? 아니다. 아직 클로저가 생성될 조건을 만족하지 못했다.
<br />

클로저를 만족하려면, `outer` 함수의 실행이 종료된 후에도, `inner` 함수를 호출하는 경우를 만들어주어야 한다.

```js
const outer = function () {
  const num = 99;
  const inner = function () {
    console.log(num);
  };

  return inner;
};

const outerCopy = outer();

outerCopy(); // 99
```

이번에는 `outer` 함수가 `inner` 함수를 `return` 하게 되었다.

그리고 `outer` 함수의 복사본(`outerCopy`)을 만들어, `outer` 함수를 대입해주었다.

그러면 `outer` 함수가 실행되고, 이 함수가 `return` 하는 `inner` 함수가 복사본에 대입될 것이다.
<br />
`outerCopy` 함수를 실행시키면? `outer` 함수가 실행 종료된 뒤에도 `inner` 함수를 쓸 수 있게 되었다.

여기서 `inner` 함수는 함수 외부에 있는 주변 환경(Lexical Scope라고 한다, 여기서는 변수 `num`)을 기억하게 된다. `outer` 함수의 실행이 끝났음에도 말이다.

이것이 클로저이다.
<br />

그리고 클로저는 단 한 번만 포착하고 끝나는 것이 아니다. 값이 변하더라도 지속적으로 그 변화를 추적한다(Live Reference).

```js
const outer = function () {
  const num = 99;
  const inner = function () {
    console.log(num++);
  };

  return inner;
};

const outerCopy = outer();

outerCopy(); // 99
outerCopy(); // 100
outerCopy(); // 101
outerCopy(); // 102
```

`inner` 함수에서 `num++`를 출력한다. 그러면 `num`의 값도 계속 바뀌게 된다.

함수를 계속 호출해서 `num`의 값이 1씩 증가하지만, 계속해서 그 정보가 반영된다.
<br/>
<br/>

## Closure가 발생하는 다양한 경우
클로저를 다시 한 번 정의해보자.

1. 함수 A의 변수 a를 내부 함수 B가 참조한다.

2. 내부 함수 B를 외부로 전달한다.

3. 변수 a를 사용할 수 있게 된다.

라고 정의해 볼 수가 있을 것 같다.
<br />
<br/>

여기서 **내부 함수 B를 외부로 전달한다**에 주목해보자. 지금까지는 `return`을 통해서 내부 함수를 외부로 전달해, Closure를 발생시켜왔다.

그 외에도 Closure가 생성되는 다양한 방법을 알아보자.
<br/>
<br/>

### 1. 함수를 반환(`return`)하는 경우

```js
const makeAdder = function (num1) {
  return function(num2) {
    return num1 + num2;
  };
};

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```

지금까지 했던 `return` 방식으로 Closure를 만들었다.
<br />

위의 예제가 앞의 예제와 조금 다른 점은, 따로 함수를 만들어서 `return` 하는 것이 아니라 바로 함수를 반환하도록 한 것이다. 그리고 따로 변수를 만든게 아니라, 외부 함수의 매개변수를 참조한다는 것이다.
<br />

두 개의 Closure가 생성되었다.
하나는 `num1`이 5인 경우, 하나는 `num1`이 10인 경우 총 두 가지이다.

### 2. setInterval/setTimeout

`setInterval`과 `setTimeout` 또한 Closure를 발생시킨다.

`setInterval`/`setTimeout` 내부에 전달할 콜백 함수 내부에서, 지역 변수를 참조하게 되는 것이다.

다음 예제를 보자.

```js
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i)
  }, i * 1000)
}
```

다음 예제가 어떻게 될까?

```js
  0

  1

  2

  3

  4
```

이렇게 실행될 것 같지만, 사실 그렇게 되질 않는다.

```js
  5

  5

  5

  5

  5
```
이렇게 실행된다.
<br />
분명 setTimeout에서 `i`는 0, 1, 2, 3, 4 순으로 전달된다. `i`는 5가 되어 반복문이 멈춘다.
<br />
자바스크립트에서는, 함수가 선언될 때의 값을 지속적으로 참조하게 된다. `setTimeout`이 실행될 때는, `i`가 5인 상태이기 때문에 5만 주구장창 실행되는 것이다.
<br />
우리가 원하는 대로 해보자.
<br />
일단 첫 번째 방법으로, 즉시실행함수를 사용할 수 있다.

```js
for (let i = 0; i < 5; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j);
    }, j * 1000);
  })(i);
}
```

즉시실행함수는 특이하게 클로저로 이용될 수가 있다.
<br />

사용방법은 간단하다. 클로저로 만들 부분을 function으로 감싸고(익명으로 해도 된다), 그 함수를 괄호로 감싼 후에 끝에 함수를 실행한다는 괄호를 한 번 더 붙여주면 된다. 이러면 setTimeout 내부에 있는 익명함수가 클로저가 되는 것이다.
<br />

변수 `i`가 값을 전달할 때마다 각각의 클로저가 생긴다. 더 이상 외부의 `i`값을 지속적으로 참조하는 것이 아니라, 전달받은 `i`값을 참조하게 되는 것이다.
<br />

두 번째 방법은 반복문과 `setTimeout`을 분리해주었다.

```js
const timer = function (j) {
  setTimeout(function () {
    console.log(j);
  }, j * 1000);
};

for (let i = 0; i <= 5; i++) {
  timer(i);
}
```

마찬가지로 각각의 클로저가 생겨 0 ~ 5까지 출력된다.

### 3. eventListener
`eventLister`의 경우에도, `setTimeout`/`setInterval`과 마찬가지로 내부의 함수가 지역변수를 참조하면서 클로저를 생성한다.

사실 `setTimeout`/`setInterval`의 경우와 비슷하다.

```html
<button id="btn1">버튼</button>
<button id="btn2">버튼</button>
<button id="btn3">버튼</button>
<button id="btn4">버튼</button>
```

```js
for (let i = 1; i <= 4; i++) {
  document.querySelector(`#btn${i}`).addEventListener("click", () => {
    alert(i);
  });
}
```
이제 클로저에 익숙한 사람들이라면 버튼을 클릭했을 때, 어떻게 될 지 뻔히 보일 것이다.

당연히 5를 결과창에 출력하게 될 것이다.

즉시실행함수로 해결해보자.

```js
for (let i = 1; i <= 4; i++) {
  (function (i) {
    document.querySelector(`#btn${i}`).addEventListener("click", () => {
      alert(i);
    });
  })(i);
}
```

이제 버튼을 클릭하면 1 ~ 4를 잘 출력하는 바람직한 버튼들을 만나볼 수 있겠다.

## Closure = 함수?
Closure는 사실 함수에서만 발생하는 현상은 아니다.
<br />
위에서는 계속 함수라고 표현했지만, 스코프(Scope)라고 표현하는 것이 더욱 정확할 것 같다.
<br />
함수에서만 일어나는 건, `var`를 쓰던 시절의 이야기이고. 지금은 많은 코드들이 `let`/`const`를 쓴다. `var`와는 달리, `let`/`const`로 선언된 변수는 블록 스코프를 가진다.

```js
  let callBlockNum;

  {
      let blockNum = 99;
      callBlockNum = function () {
          console.log(blockNum);
      }
  }

  callBlockNum(); // 99
```

따라서 이런 식으로 클로저를 만들 수 있는 것이다.
<br/>

## 가비지 컬렉션(Garbage Collection)
가비지 컬렉션 혹은 가비지 컬렉터(Garbage Collector)란, 자바스크립트 엔진이 사용하는 메모리 관리 시스템이다.
<br />
가비지 컬렉터는 자신을 참조하는 변수가 없다면, 메모리 상에서 데이터를 지운다. 위의 경우에서 outer 함수는 실행이 종료된 상태이지만, 자신을 참조하는 변수(`outerCopy`)가 있다. 내부함수 `inner`가 호출 될 가능성이 있으므로, `outer` 함수는 제거 대상에서 제외되고 계속 살아남아있는 것이다.
<br />
한편 이런 특성때문에, 클로저는 메모리 누수의 원인이기도 하다. 가비지 컬렉터로부터 제거되지 않고 계속 살아있는 데이터가 많을수록, 데이터에 부하가 올 수 밖에 없다. 하지만 클로저는 유용한 기능이기에, 메모리 누수가 조금 일어나기는 하지만 잘 관리해서 유용한 기능으로 사용하는 것이 중요하다.
<br />
클로저를 없애는 방법은 간단하다. 함수를 더 이상 참조하지 않도록 해주면 된다. 함수를 더 이상 참조하지 않게 하려면? `null`을 대입해주면 된다.

```js
const outer = function () {
  const num = 99;
  const inner = function () {
    console.log(num++);
  };
    return inner;
};
const outerCopy = outer();

outerCopy(); // 99
outerCopy(); // 100
outerCopy(); // 101
outerCopy(); // 102

outer = null;
```

### 참고

- 정재남 『코어 자바스크립트』, 위키북스(2019)

- 이선 브라운 『러닝 자바스크립트』, 한빛미디어(2017)

- [https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures]()

- [https://hyunseob.github.io/2016/08/30/javascript-closure/]()

- [https://unikys.tistory.com/309]()
