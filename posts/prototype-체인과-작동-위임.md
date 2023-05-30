---
title: prototype 체인과 작동 위임
tags:
  - javascript
published: true
date: "2022-04-15"
description: prototype의 개념 정리 두 번째
---

## 프로토타입 체인
스코프에 스코프 체인이 있듯이, 프로토타입에도 프로토타입 체인이라는 것이 있다.
```js
const Cup = function (use) {
  this.use = use;
};

Cup.prototype.getUse = function () {
  console.log(`this cup is for ${this.use}.`);
};

const beerCup = new Cup('beer');

beerCup.getUse = function () {
  console.log('beerCup is especially for beer.');
};

beerCup.getUse();
```
다음 코드의 실행 결과가 어떻게 될까? 

결과는` "beerCup is especially for bear."`가 출력된다.

어떤 객체에서 메소드를 호출하면, 우선 자기 자신의 프로퍼티를 탐색한다.

그 후 `__proto__`의 메소드를 확인하는 식이다.
<br />

굳이 `__proto__`의 메소드를 쓰고싶다면 이렇게 해야할 것이다.
```js
beerCup.__proto__.getUse.call(beerCup); // "this cup is for beer."
```

그런데 프로토타입의 재미있는 점이 있다.

어떤 인스턴스의 `prototype`도 객체라는 점이다. 그렇다면 `Object.prototype`에도 접근이 가능하다는 얘기다.
<br />

이를 시각화해보면 다음과 같다.

<img width="600" alt="prototype, 생성자 함수, 인스턴스와의 관계" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fba2c6n%2FbtrzuVEQ806%2FbpMokNcIoF0kbeS1vJRmGK%2Fimg.png" />

위에서, 인스턴스는 `__proto__`를 생략해 `prototype`의 프로퍼티에 접근할 수 있다고 했다.

그리고 한 번 더 생략하게 되면, `Object.prototype`의 프로퍼티에도 접근할 수가 있다.
<br />

`Object.prototype`에 접근할 수 있을 지, 한 번 확인해보자.


`Object.prototype`이다. `constructor`로 `Object`를 가지는 걸 볼 수 있다.

그리고 여러 익숙한 메소드들이 보인다. 저 메소드들을 쓸 수가 있는 지 알아보자.

간단하게 `.toString()`부터 써보자.
 
```js
const Cup = function (use) {
  this.use = use;
};
const beerCup = new Cup('beer');

console.log(beerCup.toString()); // [object Object]
```
동작이 잘 된다.

`beerCup.toString()`은 `beerCup(.__proto__)(.__proto__).toString()`이 생략된 버전이라고 보면 된다.

## Object 메소드의 특이사항
사실 어떤 생성자 함수이건 간에, 프로토타입은 무조건 객체이다. 그래서 프로토타입 체인을 따라가다보면 `Object.prototype`을 만나게 되어있다.

```js
const arr = [1, 2, 3];

console.log(arr.toString()); // "1,2,3"
```

<img width="600" alt="prototype, 생성자 함수, 인스턴스와의 관계" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbOoFfq%2FbtrzthVqVzq%2F33cKi7RfN7FrdY9waksyvk%2Fimg.png" />

배열 `arr`의 프로토타입을 살펴봐도 그렇다. `arr`는 배열인데도 `Object.prototype`의 메소드를 자연스럽게 쓸 수가 있다.

`Object.prototype`은 어떤 타입의 값이든 쉽게 접근할 수가 있다. 그래서 객체 전용 메소드들은 `Object.prototype`이 아닌, `Object` 생성자 함수에 들어있는 경우가 많다.

mdn에서 캡처한 `Object` 관련 메소드들이다. 대부분 `Object` 생성자 함수의 프로퍼티로 있는 경우가 많다.

<img width="300" alt="prototype, 생성자 함수, 인스턴스와의 관계" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbkeKlb%2FbtrzvxP3X1p%2Fa11W4kFKTpkbZXK0tAjte0%2Fimg.png" />

반대로, `Object.prototype`의 메소드들은 모두 어떤 데이터 타입도 활용할 수 있는 범용적인 메소드라는 얘기가 된다.

여기에는 `.toString()`, `.hasOwnProperty()`, `.valueOf()`, `.isPrototypeOf` 등이 있다.

## Behavier Delegation(작동 위임)
자바스크립트는 다른 클래스 기반 언어와는 달리, 상속(Inheritance)이 되질 않는다.

대신에 Behavier Delegation(작동 위임)이라는 재밌는걸 할 수가 있다.

Behavier Delegation는 class(클래스)의 기반이 되는 도움이 되는 개념이다.
<br />

우선 생성자 함수를 하나 만들어보자.
```js
function Machine () {
  this.switch = false;
}

Machine.prototype.turnOn = function () {
  this.switch = true;
};
Machine.prototype.turnOff = function () {
  this.switch = false;
};
```
평범한 생성자 함수 `Machine`을 하나 만들었다.

`switch`라는 프로퍼티가 있고, `prototype`에 `turnOn()`, `turnOff()` 메소드를 추가해 인스턴스의 `switch` 프로퍼티를 제어할 수가 있다.
<br />

그리고 하나 더 만들어보자.
```js
const Machine = function () {
  this.switch = false;
};

Machine.prototype.turnOn = function () {
  this.switch = true;
};
Machine.prototype.turnOff = function () {
  this.switch = false;
};

const CoffeeMachine = function (coffeeBean) {
  Machine.call(this);
  this.coffeeBean = coffeeBean;
};

CoffeeMachine.prototype.turnOn = function () {
  this.switch = true;
};
CoffeeMachine.prototype.turnOff = function () {
  this.switch = false;
};
CoffeeMachine.prototype.extractCoffee = function () {
  if (this.switch) {
    alert(`here is ${this.coffeeBean} coffee.`);
  }
};
```
`CoffeeMachine`이라는 두 번째 생성자 함수를 만들었다.

`CoffeeMachine` 생성자 함수는 `Machine` 함수와 비슷하다. 둘 다 `turnOn`, `turnOff`라는 메소드도 가지고 있다.

좀 더 정확히 말하면, `Machine` 생성자 함수가 `CoffeeMachine` 생성자 함수 상위에 있는 함수라고 할 수가 있다.
<br />

생성자 함수를 만들다보면 종종 이런 상황이 올 때가 있다.

어떤 생성자 함수의 하위 개념의 생성자 함수, 같은 메소드를 공유하는 생성자 함수를 만들 일이 종종 있다.
<br />

동물을 예시로 들면, 동물에 포유류, 어류, 양서류, 조류, 파충류가 있고

포유류에는 기린, 고래, 사람, 고양이가 있다. 동물의 하위 개념인 포유류, 포유류의 하위 개념인 고양이.

이렇듯이 같은 상위 개념을 공유하는 하위 개념의 생성자 함수를 만들 일이 종종 생긴다.
<br />

위의 예제도 마찬가지이다. `CoffeeMachine` 생성자 함수는 `Machine` 생성자 함수의 하위 개념이다.

그리고 중복되는 메소드가 두 개나 존재한다.

굳이 중복되는 메소드를 일일이 작성할 필요없이, 상위 개념의 생성자함수 메소드를 하위 개념의 생성자 함수가 그 값을 끌어올 수 있도록 만들어줄 것이다.
<br />

우선 `CoffeeMachine` 생성자 함수를 수정해주자.
```js
const CoffeeMachine = function (coffeeBean) {
  Machine.call(this);
  this.coffeeBean = coffeeBean;
};

const illy = new CoffeeMachine('intenso');

console.log(illy.switch); // false
```
기존에 `Machine`과 중복되었던 `this.switch = false;`를 지우고, `Machine.call(this);`를 추가하였다.

이렇게 해주면 서로 공유 중인 동일 프로퍼티(`switch`)를 그대로 쓸 수가 있다.

실제로 `CoffeeMachine` 생성자 함수를 사용한 `illy` 객체에서, `switch` 프로퍼티를 호출했을 때 정상적으로 동작한다.

두 번째로, `CoffeeMachine`의 메소드를 지우고 `Machine`의 `prototype` 메소드와 연결시켜주면 된다.
```js
const CoffeeMachine = function (coffeeBean) {
  Machine.call(this);
  this.coffeeBean = coffeeBean;
};

CoffeeMachine.prototype = Object.create(Machine.prototype);

CoffeeMachine.prototype.extractCoffee = function () {
  if (this.switch) {
    alert(`here is ${this.coffeeBean} coffee.`);
  }
};
```
`Object.create`라는 새로운 메소드가 나왔다.
<br />

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/create]()
<br />

`Object.create`는 인자로 받는 객체를 프로토타입으로 하는 새로운 객체를 만들어낸다.

`Object.create`(`Machine.prototype`)으로 인해서, `Machine.prototype`을 `__proto__`로 갖는, 빈 객체가 하나 반환된 것이다.

그리고 이 빈 객체를 `CoffeeMachine.prorotype`에 할당하였다.
<br />

그러면 이런 관계가 된다.

<img width="600" alt="prototype, 생성자 함수, 인스턴스와의 관계" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcGxdxU%2FbtrzvT0kpVs%2FHXRmszrVRqBEWovXS3Bi90%2Fimg.png" />

`Object.create`가 생성한 빈 객체가 `CoffeeMachine.prototype`의 자리를 차지한다.

이 빈 객체는 `Machine.prototype`을 `prototype`으로 가진다.

`CoffeeMachine`이 만든 인스턴스(`illy`)는, 프로토타입 체인을 타고 `Machine.prototype`의 메소드에 도달할 수가 있는 것이다.
<br />

`CoffeeMachine`에만 있는 메소드만 따로 할당해주면 `CoffeeMachine` 인스턴스가 쓸 수 있는 메소드도 쓸 수가 있다.

 
```js
CoffeeMachine.prototype = Object.create(Machine.prototype);
CoffeeMachine.prototype.constructor = CoffeeMachine;
```
그리고 이 작업 이 후에는, `constructor`를 이어주어야 한다.

<img width="600" alt="prototype, 생성자 함수, 인스턴스와의 관계" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlEPXz%2FbtrzuXJnFAF%2FVY6qhKbb4glgMVdz0kHkok%2Fimg.png" />

```js
const Machine = function () {
  this.switch = false;
};

Machine.prototype.turnOn = function () {
  this.switch = true;
};
Machine.prototype.turnOff = function () {
  this.switch = false;
};

const CoffeeMachine = function (coffeeBean) {
  Machine.call(this);
  this.coffeeBean = coffeeBean;
};

CoffeeMachine.prototype = Object.create(Machine.prototype);
CoffeeMachine.prototype.prototype = CoffeeMachine;

CoffeeMachine.prototype.extractCoffee = function () {
  if (this.switch) {
    console.log(`here is ${this.coffeeBean} coffee.`);
  }
};

const illy = new CoffeeMachine('intenso');

illy.turnOn();
illy.extractCoffee(); // "here is intenso coffee."
```

다 정리하면 이렇게 된다.
<br />

`CoffeeMachine`에서 만든 인스턴스인 `illy` 객체가, 프로토타입 체인을 통해서 `Machine.prototype`의 메소드를 사용할 수 있게 되었다.

이것이 바로 Behavier Delegation(작동 위임)이다.
<br /> 

class가 동작하게 되는 바탕이 되는 개념이므로, class를 공부할 때 조금 더 이해가 잘 갈 것이다.
