---
title: state와 props
tags:
  - react
published: true
date: "2022-06-20"
description: 리액트의 기본 상식
---

state와 props는 리액트에서 가장 흔히 쓰이는 개념이다. 둘 다 사용하기에 그리 어려운 개념은 아니다. 하지만 둘 다 비슷한 동작을 하는 것 같으면서도, 다른 역할을 가지고 있어 조금 헷갈릴 수도 있다.

컴포넌트는 어떤 로우 데이터(raw data)를 HTML로 변환해주는 역할을 한다. 바로 이 HTML에 전달되는 데이터에는, state와 props가 있다. 컴포넌트의 render() 함수의 인풋값으로 state + props가 쓰이므로, 각 데이터 유형이 무엇을 나타내는 지 알 필요가 있다.

## 공통점
- props와 state는 모두 일반 자바스크립트 객체이다.
- props와 state는 변경되었을 때 렌더링을 업데이트한다.
- props와 state는 결정론적(deterministic)이다. 같은 인풋을 입력하면 항상 같은 아웃풋을 반환한다는 얘기이다.

## props
```js
import React from 'react';

const person = {
  name: "gong",
  age: 25,
  superpower: null,
};

const Profile(props) {
  return(
    <>
      <p>이름: {props.name}</p>
      <p>나이: {props.age}</p>
      <p>초능력: {props.power}</p>
    </>
  );
}

const Person() {
  return (
    <>
      <h1></h1>
      <Profile name={person.name} age={person.age} power={person.superpower}/>
    </>
  );
}

ReactDOM.render(<Person />, document.getElementById("root"));
```

props(properties의 줄임말)는 컴포넌트의 구성요소이자, 컴포넌트에서 사용할 수 있는 옵션이다. 상위 컴포넌트나 코드에서 하위 컴포넌트로 전달되며, props의 구성 요소는 불변적이다.
컴포넌트는 전달받은 props를 변경할 수가 없다. 그리고 하위 컴포넌트로 전달될 props를 조합하게 된다.

## state
```js
import React from 'react';

const Person() {
  const [age, setAge] = useState(0);

  return (
    <>
      <h1>How old are you?</h1>
      <h3>{age}</h3>
      <button onClick={() => setAge(age + 1)}>+1</button>
      <button onClick={() => setAge(age - 1)>-1</button>
    </>
  );
}

ReactDOM.render(<Person />, document.getElementById("root"));
```

state는 컴포넌트가 마운트될 때 기본값으로 시작해, 어떤 이벤트에 의해 많은 변화를 겪게 되는 값이다. 어느 한 시점의 직렬화(serialization, 객체가 아닌 문자열화 할 수 있는 표현) 스냅샷이라고 할 수 있다. (반면 props는 콜백 함수를 props에 넣는 경우도 많기 때문에, serialization이라고 볼 수 없다.)

컴포넌트는 자신의 state를 내부에서 관리한다. 상위 컴포넌트가 자식 컴포넌트의 state의 초기값을 설정할 수는 있어도, state를 변경할 수 없다. 그러므로 state는 private하다고 볼 수 있다.

## props와 state 비교

<table>
    <thead>
        <tr>
            <th></th>
            <th>state</th>
            <th>props</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>상위 컴포넌트에 의해서 변경될 수 있나요?</td>
            <td>네</td>
            <td>아니오</td>
        </tr>
        <tr>
            <td>컴포넌트 내부에서 초기값을 설정할 수 있나요?</td>
            <td>네</td>
            <td>네</td>
        </tr>
        <tr>
            <td>컴포넌트 내부에서 값을 바꿀 수 있나요?</td>
            <td>아니오</td>
            <td>네</td>
        </tr>
        <tr>
            <td>하위(자식) 컴포넌트의 초기값을 설정할 수 있나요?</td>
            <td>네</td>
            <td>네</td>
        </tr>
        <tr>
            <td>하위 컴포넌트를 변경할 수 있나요?</td>
            <td>네</td>
            <td>아니오</td>
        </tr>
    </tbody>
</table>
<br />

* 위 포스트는 아래 "props vs state" 글을 번역한 것 입니다. 이해를 돕기 위한 예제를 추가하였습니다.

[https://github.com/uberVU/react-guide/blob/master/props-vs-state.md]()
