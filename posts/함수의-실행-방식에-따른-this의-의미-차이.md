---
title: 함수의 실행 방식에 따른 this의 의미 차이
tags:
  - javascript
published: true
date: "2022-04-08"
description: this에 대한 개념 정리
---

자바스크립트에서 `this`는 조금 복잡해보이지만, 아주 재미있는 키워드이다.

모든 함수에서는 `this`라는 키워드를 사용할 수가 있다.

## this란?
`this`의 의미는 실행하는 여러 환경에 따라 그 의미가 달라진다.

여러 상황에서의 다양한 `this`의 의미를 파악하는 것이 상당히 중요하다. 

`this`라는 키워드는, '나'라는 말과 상당히 비슷한 점이 많다고 생각한다.

> 나는 배가 고프다.

이 말을 내 친구 박정훈이 얘기한다면, '나'는 박정훈을 가리키게 된다. 똑같은 말을 지드래곤이 얘기한다면, '나'의 의미는 지드래곤을 가리키게 된다.
'나'라는 말이 상황에 따라서 그 가리키는 대상이 다르다. `this`도 마찬가지로 여러 환경에 따라 가리키게 되는 의미가 달라진다.
<br />
`this` 덕분에 함수를 더욱 유연하게 사용할 수 있게 해준다. '나'라는 대명사로 문장이 좀 더 유연해지듯이, `this`가 함수를 조금 더 유연하게 해주는 것이다. 다른 말로는 재사용성이 뛰어나다고도 할 수 있다.
<br />
this는 객체 지향 프로그래밍을 구현할 때 많이 쓰이게 된다.

## this를 학습하기 전에
this라는 개념은, 이걸 처음 배우는 초보자가 바로 코드에 적용하기 어려운 개념이다. 그 뜻을 정확하게 이해하기 전에 코드에서 무분별하게 사용하다보면, 황당한 결과가 실행되는 경우를 만날 수도 있다.
<br />

`this`를 학습할 때는,
  1. `this`에 대한 이론을(MDN 등을 참고해) 학습하고 예제들을 풀어보면서, 코드 내에 있는 `this`의 의미를 파악할 수 있어야한다.
  2. `this`가 쓰이는 코드 예시 등을 보면서, `this`의 적절한 사용 예시들을 익힌다.
  3. 그 다음에 `this`를 직접 사용해보는 것이 좋다.

## this의 값이 결정되는 네 가지 경우
`this`의 값은, `this`가 포함된 함수를 어떻게 실행하는가가 중요하다. 어떻게 선언되었는 지는 전혀 중요하지 않다. 

`this`가 선언된 부분에서부터 `this`를 찾는 것은 의미가 없는 행동이다.
<br />
`this`가 어떻게 실행되었는 지를 보고 `this`의 의미를 추측하는 것이 맞다.

함수를 실행하는 방법 네 가지에 따라 각각 `this`는 다른 의미를 가진다.

### (1) 일반 함수 실행(Regular Function Call)
```js
const logThis = function () {
  console.log(this); // window
};

logThis();
```

평범한 함수 `logThis`가 있고, 그 함수를 평범하게 실행했다.

예시와 같은 함수 실행을 일반 함수 실행이라고 한다.

보통 함수를 실행할 때 쓰이는 방식이다.
<br />

이럴 때 `this`는 Global Object를 가리킨다. 

글로벌 오브젝트가 무엇이냐면, 브라우저에서는 전역 객체 `window`이다.

가장 최상위에 있는 전역 객체를 가리키게 되는 것이다.
<br />

일반 함수 실행으로 `this`를 쓰는 건 바람직하지 않다.

글로벌 오브젝트를 굳이 `this`로 가리켜야할 이유가 없기 때문이다. 

굳이 글로벌 오브젝트를 가리키고 싶다면, 그냥 코드에 명시를 하면 된다.
```js
console.log(window);
```

이렇게 말이다. 

this로 글로벌 오브젝트를 가리키게 된다면, 그건 코드를 보았을 때 혼란스럽게만 할 뿐이다.
<br />

자바스크립트의 strict mode에서는, 일반 함수 실행의 `this`가 `undefined`를 가리킨다.
<br />

strict mode(엄격 모드)가 무엇이냐 하면은, 좀 더 자바스크립트의 문법을 엄격하게 만드는 모드이다.

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode]()
<br />

strict mode에서는 문법적으로 허용되었던 실수에서 error가 뜨도록 한다.

그래서 일반 함수 실행에서 `this`가 `undefined`가 뜨는 것이다.
<br />

strict mode는 자바스크립트 개발 환경에서 정말 자주 사용되는데,

만약 코드 길이가 아주 긴 코드를 디버깅한다고 했을 때, 위와 같이 바람직하지 못한 상황에서 에러가 뜨지 않는다면 어떻게 될까.

에러가 뜨지 않고 문법적으로 허용되는 상황이라면은, 어디가 문제인지 찾아내기가 힘들다.

반면 strict mode는 에러가 뜰 수 있도록 해주어 문제점을 찾기 쉽게 해주는 것이다.

### (2) 점 표기법(Dot Notation, 메서드 실행)

```js
const parkJungHun = {
  name: '박정훈',
  sayHungry: function () {
    alert(`${this.name}은 배가 고프다.`); // '박정훈은 배가 고프다.'
  }
};

parkJungHun.sayHungry();
```

객체 `parkJungHun`을 만들고, 그 안에 `name`과 `sayHungry`라는 키 값을 추가하였다.

그리고 객체의 메서드인 `sayHungry`를 실행하였다.
<br /> 

점 표기법(Dot Notation)으로 실행한 경우, `this`는 해당 메서드가 있는 객체를 가리킨다.
<br />

자바스크립트에서는 함수와 메서드의 구분이 모호한 편이다. 함수와 메서드를 구분짓는 가장 간단한 방법은 점 표기법이다.

점 표기법으로 실행된 것은 메서드이다. 아주 간단하다.

그러니까 점 표기법으로 실행된 함수는 `this`를 메서드가 있는 객체를 가진다고 보면 된다.
<br />

굳이 `this`의 의미를 찾기 위해 메서드가 포함된 객체를 찾아보지 않아도 된다. 점(.) 앞에 있는 대상이 그 객체이다.

점 표기법으로 실행된 함수(메서드)는, 점 앞에 있는 객체를 가리킨다.

### (3) .call, .apply, .bind(Explicit Binding)

세 번째 방법은 의도적으로 `this`를 지정해주는 방법이다.

다음 메서드들은 함수에 사용할 수 있는 메서드들이다.
<br />

`.call()`은 함수를 실행시키는 메서드이다.

일반적으로 함수를 실행시키듯이 함수를 실행시킨다.

다만 메서드의 첫 번째 인자로 `this`가 가리키는 객체를 지정해줄 수 있다.

```js
const parkJungHun = {
  name: '박정훈'
};

const sayHungry = function (food, place) {
  alert(`${this.name}은 배가 고프다.`); // 박정훈은 배가 고프다.
  alert(`${this.name}은 ${food}가 먹고싶다.`); // 박정훈은 스태커3 와퍼가 먹고싶다.
  alert(`${this.name}은 ${place}으로 갈 것이다.`); // 박정훈은 버거킹으로 갈 것이다.
};

sayHungry.call(parkJungHun, '스태커3 와퍼', '버거킹');
```

위 예제에서 this가 객체 `parkJungHun`을 가리키도록 지정해주었다.

그래서 `this.name`은 `call` 메서드의 첫 번째 인자인 `parkJungHun`의 `name`의 프로퍼티 값인 `'박정훈'`인 것이다.
<br />

첫 번째 `this` 인자를 제외한 나머지 인자는 모두 함수의 인자로 들어가게 된다.

그래서 `food`와 `place`가 잘 동작하는 것을 볼 수 있다.

```js
const gDragon = {
  name: '권지용'
};

const sayHungry = function (food, place) {
  alert(`${this.name}은 배가 고프다.`); // 권지용은 배가 고프다.
  alert(`${this.name}은 ${food}가 먹고싶다.`); // 권지용은 스시가 먹고싶다.
  alert(`${this.name}은 ${place}으로 갈 것이다.`); // 권지용은 오마카세 일식집으로 갈 것이다.
};

sayHungry.apply(gDragon, ['스시', '오마카세 일식집']);
```
`.apply()`는 `.call()`과 비슷하지만, 조금 다르다.

`.apply()`도 함수를 실행시키게 한다. `.call()`과 마찬가지로 첫 번째 인자로 `this`가 가리킬 대상을 넣는다.

다만 `.apply()`는 인자를 두 개만 받는다. 두 번째 인자로 인자를 담은 배열을 받는다.
<br />

`.bind()`는 위의 두 메서드와는 달리, 함수를 실행시키지 않는다. 대신 새로운 함수를 반환한다.

```js
const myHouse = {
  haveAirFryer: false,
  haveMicrowaveOven: true
};
const sayCanCook = function () {
  if (this.haveAirFryer || this.haveMicrowaveOven) {
    alert('You can cook');
  }
};
const sayMyHouseCanCook = sayCanCook.bind(myHouse);

sayMyHouseCanCook(); //'You can cook'
```

`.bind()`로 `this`가 지정된 함수는 무조건 `this`가 첫 번째 인자로 넣은 객체를 가리킨다.

그래서 함수를 일반 함수 실행으로 실행하더라도 global object를 가리키지 않는다. 

그래서 일반 함수 실행으로 `this`가 실행되었더라도, 그 함수가 `.bind()`가 되었었는지 잘 보아야한다.
<br />

`.bind()`는 `.call()`과 비슷하게, `this` 인자를 제외하고는 함수의 인자로 들어간다.

```js
const myHouse = {
  haveAirFryer: false,
  haveMicrowaveOven: true,
};
const sayCanCook = function (a, b, c, d, e) {
  if (this.haveAirFryer || this.haveMicrowaveOven) {
    alert('You can cook');
    alert(`${a} ${b} ${c} ${d} ${e}`);
  }
};
const sayMyHouseCanCook = sayCanCook.bind(myHouse, 1, 2, 3);

sayMyHouseCanCook(4, 5); //'You can cook' '1 2 3 4 5'
```
`bind`를 할 때 `a`, `b`, `c`로 `1`, `2`, `3`을 넣어주었다.

그리고 함수를 실행할 때, `4`, `5`를 넣어주었다.
<br />

그러면 순서대로 `a`, `b`, `c`, `d`, `e`가 `1`, `2`, `3`, `4`, `5`의 순서대로 들어가게 된다.
<br />

가끔 `bind` 메소드의 `this` 인자로 `null`이 들어가는 경우가 있다.

```js
var bestSong = '애국가';
const billieEilish = {
  bestSong: 'when the partys over'
};
const sayBestSong = function () {
  alert(this.bestSong) ;
};
const bindSayBestSong = sayBestSong.bind(null);

console.log(this.bestSong)
sayBestSong.call(null); // '애국가'
sayBestSong.apply(null); // '애국가'
bindSayBestSong(); // '애국가'
```

이 경우 `this`는 `null`을 가리키는 건 아니고, 전역 객체를 가리키게 된다.

그래서 다음과 같은 경우에는 `this`가 전역객체를 가리키게되어 '애국가'가 출력되는 것이다.

### (4) 'new' keyword 사용(생성자 함수 실행)

```js
new func();
```
자바스크립트에서 new라는 키워드로 함수를 실행시킬 수도 있다.
<br />

이 때 함수는 '생성자 함수'로 동작하게 된다.

생성자 함수는 기본적으로 빈 객체를 하나 만들어 반환하게 된다.

생성자 함수로 만들어진 객체를 인스턴스(instance)라고 한다. 
<br />

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/new]()
<br />

this는 생성자 함수가 만든 빈 객체를 가리키게 된다.

비록 함수에 `return`을 넣지 않더라도 자동으로 `return this;`가 삽입되어진 것과 같이 동작한다.

```js
const Singer = function (song) {
  this.bestSong = song
};

const frankOcean = new Singer('Thikin Bout you');
alert(frankOcean.bestSong); // 'Thikin Bout you'
```

이렇게 생성자 함수에서 `this`를 조작할 수도 있다.
<br />

함수를 일반 함수와 생성자 함수로 두 가지로 다 활용하는 경우는 거의 없다. 생성자 함수는 함수를 생성할 때 부터 생성자 함수로 사용되도록 고려되기 때문이다.

보통 생성자함수는 맨 앞 글자를 대문자로 하여 제작된다.
<br />

이렇게 네 가지의 `this` 구분법이 있다.
<br />

사실 이 외에도 한 가지 예외 사항이 있는데, 바로 Event Handler를 처리할 때이다.

이벤트 핸들러에서 콜백 함수 내의 `this`는 `target`, 또는 `currentTarget`을 가리킨다.

```html
<!DOCTYPE html>
<html>
  <body>
    <input type="button" id="btn" />
    <script>
      document.querySelector('#btn').addEventListener('click',() => {
      	console.log(this); // <input type="button" id="btn" />
      });
    </script>
  </body>
</html>
```
여기서 input을 클릭하게 되면은, `this`는 `currentTarget`인 `input` 요소가 출력된다.
<br />

사실 이 경우에도 `this`의 바람직한 사용법은 아니다.

굳이 `target`, `currentTarget을` 써주면 되는데 굳이 `this`를 쓸 이유가 없기 때문이다.

따라서 이런 경우에 `this`를 쓰지 않도록 조심해주어야 한다.
<br />

어쨌든 이 네 가지 함수 실행 방법만 파악하면, `this`의 의미를 잘 파악할 수가 있다.

`this` 퀴즈들을 하나씩 풀어보면은 더욱 이해가 잘 될 것이다.

### this 활용 quiz

- JS this quiz #1

```js
const call = {
  caller: "mom", 
  says: function() {
    console.log(`Hey, ${this.caller} just called.`);
  }
};

call.says();
```
여기서 무엇이 출력이 될까?

우선 `this`가 있는 함수가 어떻게 출력되었는 지만 보면 된다.
<br />

`this.caller`가 있는 `says`가, `this`가 있는 함수다.

이 `says()`는 `call.says()`로 실행되었다(Dot Notaion).

따라서 `this`는 객체 `call`을 가리키게 되고, `'Hey, mom just called.'`라고 출력될 것이다.
<br />

- JS this quiz #2

```js
const call = {
  caller: "mom", 
  says: () => {
    console.log(`Hey, ${this.caller} just called.`);
  }
};

call.says();
```
이번에는 무엇이 출력될까. 이번에도 점 표기법으로 실행되었다.
<br />

하지만 `this`가 있는 `says` 함수가 화살표 함수이다.

화살표 함수는 `this`가 없다. 위에서 설명한 줄 알았는데, 안써져있었다.
<br />

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Arrow_functions]()
<br />

그래서 여기서 `this`는 `undefined`가 되는 것이다.

`'Hey, undefined just called.'`가 답이다.
<br />

- JS this quiz #3

```js
const call = {
  caller: "mom", 
  says: function() {
    console.log(`Hey, ${this.caller} just called.`);
  }
};

let newCall = call.says;

newCall();
```
이번에는 변수 `newCall`에 메소드 `call.says`를 할당했다.

그러면` newCall(says)`에서 this값은 어떻게 될까?
<br />

어렵지 않다. 계속 얘기했다시피 중요한건, 함수가 어떻게 실행되느냐이다.

저기서 `newCall`은 일반 함수 실행으로 실행되었다.

그렇다면 `this`는 전역 객체(`window`)를 가리키게 되고, `window.caller`는 없으므로 `undefined`인 것이다.

그래서 답은 `'Hey, undefined just called.'`이다.
<br />

중간에 어떤 일이 일어났든, 신경 쓸 필요가 없다. 어떻게 실행되느냐가 중요한 것이다.

```js
var status = '😎';

setTimeout(() => {
  const status = '😍';

  const data = {
    status: '🥑',
    getStatus() {
      return this.status;
    },
  };

  console.log(data.getStatus());
  console.log(data.getStatus.call(this));
}, 0);
```

이번에는 다른 예제를 들고왔다. 

첫 번째와 두 번째 `console.log`에서 무엇이 출력될까?
<br />

우선 첫 번째 `console.log`는 쉽다. Dot Notation으로 실행되었기 때문이다.

`this`는 `data`를 가리킬 것이고, `data`의 `status`는 `'🥑'`이다.
<br />

두 번째 `console.log`를 보자. 우리가 배웠던 네 가지 함수 실행법 중 세 번째 방식이다.

`call`의 첫 번째 인자로 `this`를 넣었다. 

저기서의 `this`는 전역 객체(`window`)이다. 전역 객체 `window`의 `status`는 `'😎'`이니까, `'😎'`이 출력된다.

그래서 정답은 `'🥑'`와 `'😎'`이다.
<br />
이렇게 `this`는 배울 때는 간단해보이지만, 막상 예제들을 보면은 쉽지 않은 경우가 많다.

물론 위의 퀴즈들은 `this`가 헷갈리라고 꼬아놓은 예제들이지만,

실제로도 이렇게 `this`가 꼬이고 꼬인 경우가 많다.

그래도 함수가 어떻게 실행되는 지 차근차근 따라나가다 보면 `this`를 잘 파악할 수 있게 된다.

### 참고
- [https://www.youtube.com/watch?v=ayyuU0xdbIU]()
- [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this]()
- [https://dev.to/liaowow/take-this-quiz-understand-how-this-works-in-javascript-44dj]()
- [https://github.com/lydiahallie/javascript-questions/blob/master/ko-KR/README-ko_KR.md#20200612]()
