---
title: prototype의 삼각관계
tags:
  - javascript
published: true
date: "2022-04-15"
description: prototype, instance와 __proto__의 오묘한 삼각관계 (이미지 이전 필요)
---

> 자바스크립트는 프로토타입 기반 언어이다.

프로토타입이 엄청 중요하다는 얘기다.

여타 클래스 기반의 언어들은 '상속'이라는 개념을 사용하는 것에 비해, 자바스크립트는 '상속'이 이루어지지는 않는다.

대신 프로토타입으로 상속 비스무리한 것을 할 수가 있다.
<br />

프로토타입은 자바스크립트라는 언어를 이해하는데 가장 기본이 되는 개념이다. 자바스크립트를 잘 아는 사람이라면 기본적으로 알아야할 심화 개념 중 하나(프로토타입, 클로저, 비동기 등)이므로, JS를 잘 알고 싶은 사람이라면 배워두는 것이 좋다.

## prototype
모든 함수에는 `prototype`이라고 하는 프로퍼티가 있다. 

`anyFunc`라는 함수를 하나 만들고, 함수의 `prototype` 프로퍼티를 출력했더니 어떤 객체 하나를  출력했다.
<br />

뭔가 이상한 점이 하나 있었다. `anyFunc`는 함수인데 어떻게 객체처럼 프로퍼티과 값을 가질까.

그 이유는, 함수가 사실 객체이기 때문이다. 함수뿐만이 아니다. 배열도 객체다.
<br />

뭔가 출생의 비밀을 하나 깨우친 것만 같지만, 이건 앞으로 차차 설명할 예정이다.
<br />

어쨌든 모든 함수에는 이 `prototype`이라는 프로퍼티를 갖고 있다.

이것의 용도는 무엇일까? 사실 평소에는 아무런 기능이나 동작을 하지 못하는 프로퍼티이다.

우리가 지금까지 함수를 썼던 방식에서는 그닥 쓸 일이 없었을 것이다.
<br />

다만 `prototype`이 역할을 하게 되는 순간이 있는데, 그건 바로 함수가 생성자 함수로 동작할 때이다.

이전 포스트에서 `this`가 함수 실행 방법에 따라 그 의미가 달라진다고, 함수를 `new` 연산자로 실행할 때를 설명한 적이 있다.

함수를 `new` 연산자로 호출하게 되면, 함수는 생성자 함수로 동작하게 된다.

생성자 함수는 빈 객체를 반환하며, 이 빈 객체를 인스턴스(instance)라고 한다.

이 때 생성자 함수 내에서 `this`는 이 빈 객체를 가리키게 된다.

따로 `return`문이 없어도, `return this;`가 생략되어 있다고 생각하면 된다.
<br />

그리고 함수를 생성자 함수로 짓는 경우, 일반적으로 명사에 앞글자를 대문자로 한다.

```js
const Cup = function (use) {
  this.use = use;
}

const beerCup = new Cup('beer');

console.log(beerCup); // { use: 'beer' }
```
이렇게 말이다. 굉장히 생소한 방식으로 객체를 만드는 것으로 보일 수 있다.

하지만 자바스크립트의 객체는 저런 방식으로 만든다. 배열, 함수도 객체니까 마찬가지로 저렇게 만든다.
<br />

```js
const anyFunc = function() {};
const anyArray = [];
const anyObject = {};

// ------------------------

const anyFunc = new Function();
const anyArray = new Array();
const anyObject = new Object();
```
위의 코드와 아래의 코드는 동일하게 동작하다. 각각 빈 함수, 빈 배열, 빈 객체를 만드는 동작이다.
<br />

객체는 사실 `Object`라는 자바스크립트에 내장된 생성자 함수로 만들어지는 것이다.

우리가 만드는 객체, 배열, 함수는 모두 생성자 함수의 인스턴스였던 거다.

저렇게 `new` 키워드를 쓰지 않은 것은 단지 생략된 것일 뿐이다.
<br />

어쨌든 앞으로 다시 돌아와서, 모든 함수에는 `prototype`이라는 프로퍼티가 있다고 했다.

`prototype`은 생성자 함수로 동작할 때, 제 역할을 하게 된다. 그리고 생성자 함수로 인스턴스라는 객체도 만들어진다.
<br /> 

이 셋의 관계를 그려보면 다음과 같다.
<br />

위의 `Cup` 생성자 함수를 사용한 예제를 시각화 한 것이다.

`Cup에는` `Cup.prototype`이라는 프로토타입이 있고, 그 밑에 `beerCup`이라는 인스턴스가 있다.
<br />

## __ proto__
이제 여기서 프로토타입의 재미있는 부분이 등장한다.

바로 인스턴스가 `prototype`에 접근할 수가 있다는 것이다.
<br />

그리고 그 비결은 바로 `__proto__`이다.
```js
const Cup = function (use) {
  this.use = use;
};
const beerCup = new Cup('beer');

Cup.prototype.material = 'glass';

console.log(beerCup.__proto__.material); // 'glass'
```
인스턴스에 있는 `__proto__` 프로퍼티는 해당 인스턴스의 프로토타입을 가리킨다.

그래서 프로토타입에 어떤 속성을 추가했을 때 인스턴스에서 그 값을 가져올 수가 있다.
 
> `__proto__`는 dunder proto, 던더 프로토라고 발음하면 된다. dunder인 이유는 double underscore(__)의 줄임말이라고 한다.

> 여기서는 __proto__를 학습의 목적으로 활용해 공부해볼텐데, __proto__는 실제로 사용에 있어서 주의하여야 한다. 되도록이면 __proto__을 변경하는 일은 하지 않는 것이 좋다.

위에서 본 그림에서 조금 더 추가해보자.
<br />

이제 이런 삼각 구도가 되었다.

```js
const Cup = function (use) {
  this.use = use;
};
const beerCup = new Cup('beer');

console.log(Cup.prototype === beerCup.__proto__); // true
```

당연하게도 생성자 함수의 프로토타입과, 그 인스턴스의 `__proto__`는 같다.
<br />

값 뿐만이 아니라, 프로토타입의 메서드를 생성해 이를 인스턴스가 활용해 볼수도 있다.
```js
const Cup = function (use) {
  this.use = use;
};
const beerCup = new Cup('beer');

Cup.prototype.getUse = function () {
  console.log(`this cup is for ${this.use}.`);
};

beerCup.__proto__.getUse(); // "this cup is for undefined."
```
그런데 `undefined`가 뜬다.

사실 이 이유는 간단하다. `this` 포스트를 보면 나와있겠지만, 함수를 Dot Notation으로 실행하게 되면 점 앞에 있는 객체를 `this`가 가리키게 된다.
<br /> 

저기서 `getUse()` 내의 `this`는 __proto__, 그러니까 `Cup.prototype`을 `this`로 가지는 것이다.

`Cup.prototype`에는 `use`라는 프로퍼티가 없다. 그래서 `undefined`가 출력되는 것이다.
<br />

해결하는 방법은 간단하다. `__proto__`를 생략해주면 된다.
```js
const Cup = function (use) {
  this.use = use;
};
const beerCup = new Cup('beer');

Cup.prototype.getUse = function () {
  console.log(`this cup is for ${this.use}.`);
};

beerCup.getUse(); // "this cup is for beer."
```

`__proto__`는 생략 가능하다.

인스턴스에서 바로 메소드를 출력해도 (`__proto__`)가 생략된 채 프로토타입의 메소드를 사용할 수가 있다.

그리고 이 개념은 자바스크립트를 구성하는 중요한 개념 중 하나다.
<br />

우리는 사실 이 `__proto__`를 생략한 프로토타입 메소드 호출을 자주 사용하고 있었다.

다음의 예제를 보자.

```js
const arr = [1, 2, 3];

arr.push(4);
console.log(arr); // [1, 2, 3, 4]
```

`.push()`를 사용해 배열에 값을 추가했다.

여기서 `.push()`는 `Array` 생성자 함수의 프로토타입에 추가되어있는 메소드이다.
<br />

MDN에 `push` 메소드를 검색해보자. 타이틀에 이렇게 뜬다.
<br />

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/push]()

> Array.prototype.push()

우리가 사용하는 배열/객체/함수의 기본 메소드들은 생성자 함수의 프로토타입 메소드였던 것이다.

단지 우리가 `arr.__proto__.push(4)`가 아니라, `__proto__`를 생략해 `arr.push(4)`를 썼던 것일 뿐이다.
<br />

그래서 생성자 함수의 프로토타입에 어떤 메소드나 프로퍼티를 만들게 되면, 모든 인스턴스는 그걸 자신의 것처럼 사용할 수 있게 된다.
<br />

## constructor
프로토타입에는 자신의 생성자 함수에 접근할 수 있는 `constructor`라는 속성이 있다.

이를 바탕으로 위에서 봤던 그림을 다시 한 번 수정해보자.
<br />

이렇게 접근할 수가 있는 게 된다. 인스턴스에서도 `constructor`에 접근하게 되면 `__proto__`는 생략 가능하므로 마찬가지로 생성자 함수를 불러올 수가 있다.
<br />

`constructor`는 용도가 그렇게 많지 않은데, 어쨌든 빠르게 한 번 살펴보자.
<br />

우선 `constructor`는 데이터의 타입을 알 수 있긴 하다. 데이터의 `constructor`에 접근해 해당 생성자 함수를 알아낼 수 있기 때문이다.

배열의 `.typeof()`는 `object`라고 표시된다.

그래서 간단하게 생성자 함수에 접근해서 해당 데이터가 배열인 지를 알아낼 수도 있다.

```js
const isArray = function (data) {
  return data.constructor === [].constructor;
};

console.log(isArray([])); // true
console.log(isArray({})); // false
```
물론 거의 쓰지 않는 방법이다.
```js
console.log(Array.isArray([])); // true
```
이미 이게 있다.
<br />

두 번째로, `constructor`를 할당할 수도 있다. 

어떤 데이터의 생성자 함수를 다른 함수로 바꿀 수가 있는 것이다.
```js
const Cup = function (use) {
  this.use = use;
};
const beerCup = new Cup('beer');
const teaCup = {};

console.log(teaCup.constructor === beerCup.constructor); // false

teaCup.constructor = Cup;
console.log(teaCup.constructor === beerCup.constructor); // true
```
객체 `teaCup`은 생성자 함수가 `Object`이다. 

그래서 `teaCup`의 생성자 함수(`Object`)와 `beerCup`의 생성자 함수(`Cup`)을 비교했을 때, `false`가 뜨게 된다.

`teaCup`의 생성자 함수에 `Cup`을 할당하게 되면, 이번에는 비교 시 `true`가 된다.
```js
const teaCup = {};

console.log(Array.isArray(teaCup)); // false

teaCup.constructor = Array;
console.log(Array.isArray(teaCup)); // false
```
물론 생성자 함수를 바꾼다고 해서, 데이터의 타입이 바뀌거나 인스턴스가 바뀐다거나 하지는 않는다.

그저 참조하는 대상이 달라질 뿐이다.
<br />

이번에는 `teaCup` 객체를 `Array`로 바꿔보았다. 

그렇다고 해서 `teaCup`의 타입이 `Array`가 되는 것은 아니게 된다.
