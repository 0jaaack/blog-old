---
title: immer.js와 Proxy
tags:
  - proxy pattern
published: true
date: "2023-01-19"
description: redux-toolkit을 쓰면서 하기 쉬운 실수를 파헤쳐보며
---

멘토링을 진행하는 중, 한 수강생 분이 어려움에 처한 상황이었다. 상황은 이러했다. 과제 진행을 위해서 redux-toolkit을 쓰고 계셨는데, 상태 업데이트가 되지 않는다는 것이다.

문제의 코드는 아래와 같았다.

```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  date: {
    hour: {
      title: "",
      description: "",
      startHour: "",
      endHour: "",
    },
  },
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state = {...state, ...action.payload};
    },
    // ...
  },
});

//...
```

일단 위의 코드에는 여러가지 개선할 점이 보인다. 첫 번째로 홑따옴표와 겹따옴표를 일관되게 쓰지 못한 것...이 가장 눈에 먼저 들어오지만, 그건 일단 넘어가자.

# action.payload를 그대로 넘겨주었다

addEvent의 reducer를 보면 state에 action.payload를 spread 문법을 이용해 그대로 넣어주었다. action.payload를 덮어쓰기 한 셈이다. 

하지만 이는 redux에서 그리 권장되지는 않는 방법이다.

[https://redux.js.org/style-guide/#reducers-should-own-the-state-shape](https://redux.js.org/style-guide/#reducers-should-own-the-state-shape)

<img width="600" alt="redux style guild - Reducers Should Own the State Shape image" src="https://github.com/ponjaehyeok/ponjaehyeok-blog/assets/79369983/abc3eb3e-68f9-4353-a0f9-2b2861ec958d"/>


이는 redux style guide에서 찾아볼 수 있다. 위의 패턴이 권장되지 않는 이유는, **state의 제어권을 컴포넌트에게 넘기게 되기 때문**이다.

redux의 state는 redux에서 소유하고 관리해야만 한다. 하지만 `action.payload`를 그대로 state에 반영하게 되는 순간 이 제어권을 외부로 넘겨주는 셈이 된다.

action을 dispatch하는 component의 동작에 의해 state가 관리되는 현상이 발생하게 되고 만다.

따라서 위와 같은 패턴은 권장되지 않는다. (redux style guide는 참 좋은 문서다)

# immer.js

하지만 그래도 동작은 해야한다. 아직 위의 코드가 동작하지 않는 이유는 찾아내지 못했다.

reducer의 callback에 들어온 함수를 함수 내부에서 변경해 불변성을 해치고 있기는 하지만 redux-toolkit은 immer.js를 통해서 불변성이 보장되기 때문에 상관이 없다.

그렇다면 문제가 무엇일까 싶어 immer.js 공식 문서를 따라가보았다. 그러다 자주 하는 실수들(pitfalls) 문서에서 아래 항목을 발견할 수 있었다.

[https://immerjs.github.io/immer/pitfalls/#dont-reassign-the-recipe-argument](https://immerjs.github.io/immer/pitfalls/#dont-reassign-the-recipe-argument)

<img width="600" alt="immer.js pitfalls - Don't reassign the recipe argument" src="https://github.com/ponjaehyeok/ponjaehyeok-blog/assets/79369983/8c159f5a-b3cb-4a65-825c-b1ffaf45b738"/>

<img width="600" alt="immer.js features - Returning new data from producers" src="https://github.com/ponjaehyeok/ponjaehyeok-blog/assets/79369983/b2310109-3da1-4f67-8f5f-79f9e46925b9"/>

바로 이게 문제였다. argument 전체를 재할당해주었기 때문이다.

argument 전체를 재할당하면 동작하지 않을 거라며 친히 redux-toolkit 예시로 알려주고 있었다.

이거다! 싶어 수강생분에게 설명을 드리고 문제를 해결할 수 있었다.

# 왜 안되는 거지?

그러면 여기서 드는 의문점은, 왜 안되는 걸까하는 점이다. 그리고 그 이유는 immer.js의 내부 동작에서 찾을 수 있었다.

immer.js 공식 블로그 예제를 가져왔다.

```javascript
import produce from "immer";

const todos = [ /* 2 todo objects in here */ ];

const nextTodos = produce(todos, draft => {
    draft.push({ text: "learn immer", done: true });
    draft[1].done = true;
});
```

immer.js는 proxy pattern을 통해 구현하였다. proxy는 '대리자'라는 뜻으로, 객체를 대신 조작해줄 수 있는 대리자를 제공하는 패턴이다. immer.js에서는 대상을 직접 수정하게 되면 불변성을 해치게 되니 대신할 객체를 변경시켜 새로운 객체를 생성하는 것이다.

immer.js의 `produce` method 내부를 살펴보았다. `creatProxy`를 통해 `proxy`를 생성하고, `recipe`를 실행(`recipe`는 produce의 두 번째 인자로 넣어주는 callback 함수이다)해준다. 

<img width="600" src="https://github.com/ponjaehyeok/ponjaehyeok-blog/assets/79369983/a9c248ea-1faa-4cfb-8adf-69413bd80e51" alt="immer.js produce image" />

`proxy`를 생성해주는 함수를 좀 더 따라가보자. 그리고 자바스크립트 내장 `Proxy` 객체를 생성해주는 부분을 발견할 수 있었다. 자바스크립트의 Proxy 객체를 이용해 `proxy`를 만들어 `recipe`를 실행해주는 것이다.

<img width="600" src="https://github.com/ponjaehyeok/ponjaehyeok-blog/assets/79369983/728b3136-207a-4500-a3e3-554545a4fc76" alt="immer.js creatProxyProxy image" />

이쯤되면 이제 안되는 원인을 찾을 수 있다. `Proxy` 객체에 직접 할당을 했기 때문이다.

함수 내부에서 실행 컨텍스트가 생성될 때, 인자의 정보를 담은 객체가 별도로 생성된다. 이 때 이 객체를 할당해봤자 아무런 의미가 없을 것이다.

여기까지 redux-toolkit의 `createSlice`에서 immer.js의 내부 동작까지 살펴보게 되었다. 무언가 이해가 되지 않을 때는 이렇게 내부 구현이 어떻게 동작하는 지 알아보면 더욱 이해가 잘 될 것이다.
