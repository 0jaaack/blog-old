---
title: useEffect는 필요하지 않을 수도 있어요!
description: 리액트 베타 문서 번역
tags:
date: 2023-01-07
published: false
---

원문: [You Might Not Need an Effect](https://beta.reactjs.org/learn/you-might-not-need-an-effect)
<br />

Effect는 **React의 탈출구**라고도 할 수 있는데요. 

React에서 한 발짝 나가 외부의 시스템들, 예를 들어 위젯, 네트워크, DOM API 등에 접근할 수 있게 해줍니다.

만약에 외부 시스템들과 관련되지 않은 경우라면은 **useEffect는 필요하지 않을 수도 있어요**. 필요하지 않은 Effect들을 제거해주면 이해하기 쉽고, 빠르고, 오류도 적게 발생하는 코드가 될 수 있습니다.

### 어떻게 불필요한 Effect인지 알 수 있을까요

보통 Effect를 **불필요하게 사용**하는 데, 두 가지 케이스가 있어요.

- **렌더링 할 데이터를 변경**하기 위해서 Effect를 쓰는 경우.
    
    예를 들어, 어떤 리스트 데이터를 필터링하고 싶은 경우가 있다고 가정해봐요. 리스트가 변경이 일어났을 때, state를 바꿔야겠다!고 생각할 수도 있어요. 그렇지만 이건 **비효율적인 방법**이예요. 
    <br />

    component의 state가 업데이트되면, React는 먼저 component 함수들을 실행해 화면에 무엇이 표시되어야 할 지 연산을 해요. 그런 다음 React는 이 변화들을 ‘커밋’하여 DOM을 변경해 화면을 업데이트해요.
    <br />

    [https://beta.reactjs.org/learn/render-and-commit](https://beta.reactjs.org/learn/render-and-commit)
    <br />
    
    그 다음에 React는 Effect를 실행할 거예요. 만약 Effect 안에서도 상태가 변경된다면, 위의 프로세스들이 **처음부터 다시! 시작**됩니다. 불필요한 렌더링을 하지 않기 위해서는, 컴포넌트의 **상단 부분에서 데이터들을 변환**해야해요. 그 코드들은 자동으로 props나 state가 변경될 때마다 재실행될거에요.
    
- **user event들을 처리**하는데 Effect를 사용하는 경우.
    
    이번에는, 유저가 물건을 살 때 POST 요청을 보내고 알람을 띄우는 작업을 하고싶다고 가정해봐요. 구매 버튼에 등록된 이벤트 핸들러에서는, user가 무슨 일을 어떻게 했는 지 정확하게 알고 있어요. 그런데 Effect가 실행될 때에는, **유저가 어떤 행동을 한건 지 모를거예요**(예를 들면 어떤 버튼이 클릭되었는 지). 그래서 우리가 보통 **이벤트 핸들러에서 사용자 이벤트들을 처리**하게 되는 것이죠.
<br />    

Effect는 **외부의 시스템들과 연동하기 위해**서 사용해야해요. 예를 들어서 jQuery 위젯과 state를 연동하고 싶은 경우에 Effect를 쓸 수 있어요.
<br />

그리고 **데이터를 fetch**하기 위해서도 쓸 수 있어요. 검색 결과를 현재의 검색 쿼리에 동기화하려는 경우 같은 때에, Effect를 사용할 수 있습니다. 현대의 프레임워크들은 Effect를 사용하는 것보다 더 효과적인 내장 데이터 페칭 기능을 제공하고 있다는 것도 알아두세요!
<br />

조금 더 개념이 자리잡을 수 있도록, 몇 가지 구체적인 케이스들을 더 살펴보도록해요.

### state와 props를 기반으로 state 업데이트하기

`firstName`과 `lastName` . 두 개의 state를 가지고 있는 컴포넌트를 가정해볼게요. 우리는 이 두 개의 값을 연결해 `fullName`이라는 값을 만들거에요. 거기에 더해 `firstName` 혹은 `lastName`이 변경될 때마다, `fullName`도 변경되게 하고싶어요. 
<br />

처음에는 본능적으로 `fullName`이라는 state 값을 만들고, Effect에서 값을 업데이트하고 싶을 수도 있는데요.

```jsx
function Form() {
  const [firstName, setFirstName] = useState("Gong");
  const [lastName, setLastName] = useState("Jaehyeok");

  // 이런 state와 Effect는 필요없어요..!
  const [fullName, setFullName] = useState("");
  useEffect(() => {
		setFullName(`${firstName} ${lastName}`);
	}, [firstName, lastName]);
}
```

이 로직은 필요 이상으로 비효율적이고 복잡해요. state값을 위해 모든 렌더링 과정을 거치게 된 후, 또 한 번 `fullName`을 위해서 리렌더링을 발생시켜요. state와 Effect를 모두 제거해봅시다.

```jsx
function Form() {
  const [firstName, setFirstName] = useState("Gong");
  const [lastName, setLastName] = useState("Jaehyeok");

  // 렌더링 중에 연산됩니다. 굿!
  const fullName = `${firstName} ${lastName}`;
}
```

**현재 가지고 있는 state와 props로 만들수 있는 값**이라면, **state에 값을 넣지 마세요**. 대신 렌더링 시 연산이 되도록 하세요. 코드가 더 단순해지고, 간단해지고, 에러를 덜 발생시키게 될 거에요. 이런 접근 방식이 낯설게 느껴진다면, **Thinking In React**를 읽어보고 어떤 값이 상태로 들어가야 하는 지 알게 되실 겁니다.

[(Thinking In React 읽어보기)](https://beta.reactjs.org/learn/thinking-in-react)

### 이펙트없이 무거운 연산을 cache하기

아래의 컴포넌트는 props로 `todos`와 `filter` 값을 받아, `visibleTodos`를 연산합니다. 이번에도 Effect에서 값을 업데이트하고, state에 값을 저장하고 싶은 본능적 욕구가 끓어오르시나요?

```jsx
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState("");

  // 불필요한 state와 Effect들..
  const [visibleTodos, setVisibleTodos] = useState([]);
  useEffect(() => {
    setVisibleTodos(getFilteredTodos(todos, filter));
  }, [todos, filter]);
}
```

위에서 본 예시와 같이, 이 코드도 불필요하고 비효율적인 코드에요. 우선은 state와 props부터 제거해봅시다.

```jsx
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState("");

  // 괜찮은 코드가 되었어요. getFilterdTodos가 그리 무거운 작업이 아니라면요.
  const visibleTodos = getFilteredTodos(todos, filter);
}
```

대부분의 코드에서는 이 정도로만 작성해도 충분히 괜찮은 코드에요.  근데 `getFilteredTodos`함수가 너무 연산이 오래 걸리는 함수라거나, todos의 항목이 많은 경우가 있을 수도 있는데요. 우리는 이런 경우에서 `newTodo`라는 값과는 상관없는, 다른 state가 변경 되었을 때, `getFilteredTodos`를 다시 계산하게 하고 싶지 않아요.

이런 **값비싼 계산을 cache(혹은 memoize)하고 싶을 때**는 **useMemo**를 이용할 수 있습니다.

```jsx
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState("");

  const visibleTodos = useMemo(() => {
    // filter나 todos의 값이 바뀌지 않는 한, 재실행되지 않아요.
    return getFilteredTodos(todos, filter);
  }, [filter, todos]);
}
```

이 코드는 한 줄로 써도 되죠.

```jsx
const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [filter, todos]);
```

React에게 `todos`나 `filter`가 변경되지 않는 한, **내부의 함수가 다시 실행되는 것을 원하지 않는다**는 것을 알려주게 됩니다.
<br />

React는 처음 렌더링 시, `getFilteredTodos`의 **반환 값을 기억**합니다. 그리고 다음에 렌더링을 할 때 `todos`또는 `filter`가 다른 지 확인합니다. 그 전과 같으면 저장되어있는 마지막 결과를 반환하게 됩니다. 만약 그 전과 다르다면, React는 내부의 함수를 다시 호출할 것입니다(그리고 그 반환값을 대신 저장합니다). 
<br />

useMemo에 래핑한 함수는 렌더링 중에 실행되므로 **순수한 계산에서 동작**하게 됩니다.

### props가 변경되었을 때, 모든 컴포넌트의 state를 초기화하기

여기 `ProfilePage` component는 `userId`라는 prop을 받습니다. 페이지에는 comment를 입력하는 input이 있고, `comment`라는 state 값을 이용해 해당 값을 가지고 있어요. 그런데 어느 날, 우리는 문제를 발견하게 되었습니다. 
<br />

프로필 페이지에서 다른 페이지로 이동할 때, `comment`라는 값은 초기화가 되지 않아요. 그래서, 다른 유저의 프로필에다가 실수로 comment를 작성할 수도 있게 되버린 겁니다.
<br />

이런 이슈를 해결하고픈 우리는, `userId`라는 값이 변경될 때마다 `comment`를 초기화하는 코드를 작성하게 됩니다.

```jsx
function ProfilPage({ userId }) {
  const [comment, setComment] = useState("");

  // 코드를 이렇게 작성하지 마세요!
  useEffect(() => {
    setComment(""):
  }, [userId]);
}
```

이건 **불필요한 코드**입니다. `ProfilePage`와 자식들은 처음에 state 값으로 렌더링 된 이후에, 또 다시 렌더링이 발생하게 될겁니다. 
<br />

또 ProfilePage 내부에 state가 있는 **모든** component에서 이 작업을 수행해야 하므로, **복잡한 로직**이 될 수도 있습니다. 예를 들어, comment에 관련된 UI가 중첩된 경우, 중첩된 컴포넌트의 state에도 **각각의 초기화**를 시켜줘야 하기 때문이죠.. 
<br />

대신 ‘**명시적인 key**’를 전달해, profile들이 각각의 user마다 다른 profile이라는 것을 React에게 알려줄 수 있어요. 컴포넌트를 두 개로(외부 컴포넌트와 내부 컴포넌트) 나누고, 외부 컴포넌트에서 내부로 `key` 속성을 전달할 수 있습니다.

```jsx
function ProfilePage({ userId }) {
  return (
    <Profile
      userId={userId}
      key={userId}
    />
  );
}

function Profile({ userId }) {
  // comment state는 key 값이 변경 시, 자동으로 리셋됩니다.
  const [comment, setComment] = useState("");
}
```

일반적으로는, React는 동일한 컴포넌트가 동일한 지점에서 렌더링 될 때, state를 유지하게 되는 데요. `Profile` 컴포넌트에  **key 속성으로`userId` 값을 전달** 하는 것은, `userId`가 다른 Profile component들을 **state가 공유되지 않는 다른 component들로 취급**되도록 요청하는 것입니다.
<br />

우리가 `userId`로 설정한 key값이 언제든 바뀌게 되면, React는 `Profile` component와 그 자식들의 **DOM을 재생성**하고 **상태를 초기화**합니다. 결과적으로 우리가 프로필들을 오갈 때에 **comment는 자동적으로 비워지는 것**이죠.
<br />

한 가지 알아두셔야 할 건, 이번 예시는 외부의 `ProfilePage` component가 프로젝트 내의 다른 파일들에게서 렌더링되는 경우입니다. `ProfilePage`를 렌더링 할 때는 `key`값을 넣어줄 필요는 없는데요, ProfilePage는 `userId`를 prop으로 그냥 전달하면 됩니다. `ProfilePafe` component 내부의 `Profile` component로 key 값을 전달하는 것은 값을 초기화하는데 있어, 세부적인 구현사항입니다.

### prop이 바뀔 때마다 state 조정해주기

어떨 때는, prop이 변경 될 때마다 **state의 전부가 아닌 일부분만 재조정**하고 싶을 수도 있는데요.
<br />

아래의 `List` 컴포넌트는 `items`라는 list를 prop으로 받게 됩니다. 그리고 현재 선택된 아이템을 state로 가지고 있으면서 값을 유지하고 있습니다. 우리는 `items`라는 prop이 바뀔 때마다, `selection`의 값을 null로 만들고 싶은데요.

```jsx
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // 이런 코드는 안돼요..
  useEffect(() => {
    setSelection(null);
  }, [items]);
}
```

이런 코드는 이상적이지 않아요. `items` prop이 바뀔 때마다, `List`와 자식 component들은 먼저 null이 반영되지 않은 오래 된 값으로 렌더링 될 거에요. 그런 다음 React는 DOM을 업데이트하고, Effect를 실행시키게 돼요. 마지막으로 `setSelection(null)`이 실행되고, `List`와 자식 component를 또 다시 렌더링하게 되고, 이 전체의 과정을 또! 반복하게 됩니다.
<br />

우리는 일단 Effect를 제거하고, 대신에 렌더링 과정에서 바로 state를 조정하도록 해봅시다.

```jsx
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // 이제 렌더링 과정에서 state가 조정돼요. 굿!
	const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setSelection(null);
  }
}
```

useState의 ‘이전 렌더 값 저장하기’ 방법을 써보았습니다. 이해하기는 조금 힘들지 모르지만, Effect에서 같은 state를 업데이트하는 것 보다야 나은 방법이죠.
<br />

[(useState의 ‘이전 렌더 값을 저장하기’ 방법이란?)](https://beta.reactjs.org/apis/react/useState#storing-information-from-previous-renders)
<br />

위의 예시에서 `setSelection`은 렌더링 과정 중에 실행됩니다. React는 `List`의  `return` 문이 끝나는 즉시, `List` **component 렌더링을 재시도**하게 되는데요. 하지만 그 시점은 React가 `List` 의 **자식 component를 렌더링하거나, 아직 DOM을 업데이트한 상태가 아닙니다**. 그래서 `List`의 자식 component로 하여금, **오래된 `selection` 값을 건너뛸 수 있게** 해줍니다.
<br />

렌더링 과정 중에 component를 업데이트하게 되면, React는 **반환된** **JSX를 버리고 곧 바로 렌더링을 다시 시도**합니다. 렌더링 재시도가 컴포넌트마다 층층이 일어나는 걸 막기 위해(계단식 재시도), React는 렌더링 과정에서, **렌더링 중인 해당 component의 state만 업데이트** 해주고 있어요. 다른 component의 state를 업데이트를 시도하게 되면, 에러가 발생할거고요. 그리고 조건문 `items ≠= prevItems`는 무한 루프를 일으키지 않기 위해서 꼭 필요합니다.!
<br />

state를 이런 식으로 조정할 때 유의해야할 점은, component를 **예측 가능한 상태**로 유지시켜야 한다는 거예요. 다른 side effect들, 그러니까 DOM을 변경하는 일이라던지, timeout을 설정하는 것들은 **event handler나 Effect에 남아있어야합니다.**
<br />

[(예측 가능한 순수한 컴포넌트 형성에 대해 더 알아보려면)](https://beta.reactjs.org/learn/keeping-components-pure#where-you-_can_-cause-side-effects)
<br />

이 코드 패턴은 Effect를 사용하는 것보다는 아주 좋은 방법이에요. 그런데 대부분의 component에서 이럴 필요까지는 없습니다. 다른 state나 props를 기반으로 state를 업데이트하는 것은, 어찌되었든 데이터의 흐름을 이해하기 어렵게 하고 디버깅하기 곤란하게 만드는 것이에요. 항상 **1. key로 모든 state를 초기화할 수 있을 지,** **2. 렌더링 과정 중에 계산할 수 있을 지** 생각해보시길 바랍니다. 
<br />

예를 들어서, 위의 예제는 선택된 item 값을 저장하고 값을 초기화해주는 것 말고 itemID를 저장하는 방법을 써볼 수도 있어요.

```jsx
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selectionId, setSelectionId] = useState(null);

  // 렌더링 과정에서만 모든 연산이 이루어지는, 가장 좋은 방법!
	const selection = items.find(item => item.id === selectionId) ?? null;
}
```

이제 state를 애초에 조정해줄 필요가 없는 상황이 되었어요. list에서 `selectedId`가 있으면 해당 item은 selected 된 상태로 유지될 것이고, 없으면 null인 상태가 될 거에요. 위의 예시와는 살짝 다르게 동작하고 있지만, 아주 좋은 방식의 코드예요. items를 향한 모든 변경 사항이 유지가 잘 되고 있기 때문이죠. 
<br />

위의 코드 아래의 로직에서는 `selectedId`대신 , `selection`의 값을 사용해야 해요. `selectedId`가 없을 수도 있으니까요.

### 이벤트 핸들러 간 로직을 공유하기

상품의 상세 페이지가 있고, 두 개의 버튼(Buy, Checkout)이 있다고 가정해봅시다. 두 버튼 다 제품을 구매할 수 있도록 하는 버튼이에요. 그리고 사용자가 장바구니에 상품을 넣을 때마다, 알람을 띄워주고도 싶어요. 두 개의 이벤트 핸들러에 `showNotification()`을 추가하면 너무 반복적인 로직이니까, 이걸 Effect에 추가해야지! 라고 생각하게 될 수도 있어요.

```jsx
function ProductPage({ product, addToCart }) {
  // 쓸모없는 effect 사용.. 안 본 눈 삽니다..
  useEffect(() => {
    if (product.isInCart) {
		  showNotification(`Added ${product.name} to the shopping cart!`);
    }
  }, [product]);
  
  function handleBuyClick() {
    addToCart(product);
  }

  function handleCheckoutClick() {
    addToCart(product);
    navigateTo("/checkout");
  }
}
```

**불필요한** Effect**의 사용**입니다. 버그가 발생하기도 쉬운 코드에요. 
<br />

예를 들어, 우리의 어플리케이션이 장바구니의 내용들을 계속해서 기억하고 있는 상황이라고 가정해봅시다. 만약 장바구니에 상품을 추가하고 페이지를 새로고침하게 되면, 알람이 또 다시 발생할거에요. 상품의 상세페이지에서 새로고침을 할 때마다 계속 화면에 알람이 나타날거에요. 이건 `product.isInCart`의 값이, 페이지가 로드될 때 이미 `true`인 값이기 때문이에요. 그래서 `showNotificaion()`은 항상 실행될 수밖에 없죠.
<br />

**코드가 Effect에 있어야 할 지, 아니면 event handler에 있어야 할 지 확실하지 않은 경우, 이 코드를 왜 실행해야 하는 지 그 이유를 곰곰히 생각해보세요.** Effect는, display에서 **이미 보여진 component의 결과물에 대해 실행해야하는 코드에만 사용**해야 합니다. 이번 예제에서는 사용자가 버튼을 눌렀기 때문에 알람을 띄워야 하는 것이지, 페이지가 화면에 보여졌기 때문에 실행해야 하는 것이 아닙니다!
<br />

Effect를 삭제하고, 공통된 로직을 함수로 만들어 각각의 event handler에 넣어주도록 합시다.

```jsx
function ProductPage({ product, addToCart }) {
  // 불필요한 effect도 줄이고, 버그도 고칠 수 있게 되었어요!
  function buyProduct() {
    addToCart(product);
    showNotification(`Added ${product.name} to the shopping cart!`);
  }

  function handleBuyClick() {
    buyProduct();
  }

  function handleCheckoutClick() {
    buyProduct();
    navigateTo('/checkout');
  }
}
```

불필요한 Effect도 없어지고, 버그도 고칠 수 있게 되었어요!