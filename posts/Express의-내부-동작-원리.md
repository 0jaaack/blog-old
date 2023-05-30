---
title: Express의 내부 동작 원리
tags:
  - express
published: true
date: "2022-09-18"
description: Express 내부 구성 파악
---

## Express 내부 구성

하나의 express 어플리케이션은, 그 자체로 하나의 root 라우터라고 할 수도 있다. 반대로 라우터는 하나의 작은 어플리케이션과도 같다고 할 수 있다. 

조금 더 나아가서, 하나의 express App은 Router를 생성하는 Router 생성자 함수의 인스턴스(_router)라고 할 수 있다. `app.use()` 혹은 `app.route()`는 _router(App 혹은 라우터)에게 Router를 새로 하도록 한다. 그리고 `app.method()`(ex_get, post, put)는 _router에게, Route를 하나 생성하도록 하게 한다.

어떻게 _router가 미들웨어들과 라우터, 라우트들을 내부적으로 구현할 수 있는 걸까? 비밀은 바로 Router, Route, Layer 라는 세 개의 개념으로 설명할 수 있다.

아래와 같은 코드로 예시를 들어보자

```jsx
const express = require('express')
const app = express()

app.use(function middlewareWithoutPath(req, res, next) {
    console.log('use middleware without path')
    next()
})

app.use('/foo', function middlewareWithPath(req, res, next) {
    console.log('use middleware with path')
    next()
})

app.route('/bar')
    .get(function routeBarGet(req, res) {
        res.send('ok')
    })
    .post(function routeBarPost(req, res) {
        res.send('ok')
    })

app.get('/zoo', function getZoo(req, res) {
    res.send('ok')
})

app.listen(3000, () => {
    console.log('listen on 3000...')
})
```

1. path를 설정하지 않은 `app.use()`와 ‘/foo’ path를 설정한 `app.use()` 두 개를 호출하였다.
2. `app.route()`를 호출하였다. 경로는 ‘/bar’로 설정되었다.
3. `app.get()`도 호출하였으며, 경로는 '/zoo'로 설정되었다.

위의 코드는 내부적으로는 다음과 같이 동작하게 된다.

<img width="600" src="https://github.com/ponjaehyeok/ponjaehyeok-blog/assets/79369983/df0c1e0e-dfe0-4b67-8405-15acfee8908a" alt="Screen Shot 2022-09-15 at 23.58.22.png" />

하나씩 어떻게 되는 것인지 살펴보자.

### Layer(레이어)

우선 레이어부터 알아보자.

레이어 하나의 구조는 매우 간단하게 이루어져 있다. path 혹은 method 값을 가지고 있어, 요청이 왔을 때 매칭을 실행한다.

match 함수를 실행해서 들어온 요청이 경로와 일치하게 되면, handle 함수를 실행하게 된다.

```jsx
Layer {
  path   // 라우터일 때
  method // 라우트일 때
  handle
}
```

handle 함수는 때에 따라 여러가지가 될 수도 있다. route를 처리하는 함수 혹은 미들웨어 함수, 에러 핸들러가 될 수도 있다.

레이어는 아래와 같이 될 수 있다.

1. 미들웨어 / 라우트
    
    미들웨어 혹은 라우트는 `(req, res, next) => {}` 로 호출하게 된다.
    
    요청이나 응답을 수정하거나 코드를 실행한 후, 마지막에 응답을 보내거나 `next()`를 호출한다.
    
2. 에러 핸들러
    
    `(err, req, res, next) => {}` 로 호출되는 에러 핸들러는, `next()` 메소드를 통해 이전 레이어에서 던진 error를 처리하게 된다. 
    
3. 다른 라우터
    
    위에서 언급하였듯이, 라우터도 하나의 작은 App으로 볼 수 있다.
    
    App과 라우터의 작은 차이점은, 라우터가 App에서 path를 통해 등록된다는 점이다.
    
    라우터는 하나의 레이어이면서도 내부에 레이어 스택을 가지고 있다.
    

### Router(라우터)

라우터는 express의 메인 아이디어라고 할 수가 있는데, ‘레이어들의 스택’이라고 표현할 수 있다.

express를 쓰는 동안 우리는 많은 use() 메소드를 사용한다.

 `use()`를 쓰는 방식은 아주 다양한데,

1. 라우터들과 미들웨어들, 라우트, 에러 핸들러를 등록할 때 사용한다.
2. 첫 번째 파라미터로 경로를 설정할 수도, 안 할수도 있다.
3. App에도, Router에도 `use()` 메소드를 사용할 수 있다.

라우터에서 `app.use()`가 실행되면, _router는 새로운 Layer 객체를 새롭게 생성한다. 

그리고 레이어에 경로(path)와 미들웨어 함수를 할당한 후, stack으로 push가 된다.

경로를 지정하지 않고 미들웨어를 추가하게 되면, 기본값으로 “/”으로 설정되고, 이는 모든 요청에 대해 미들웨어 함수를 실행한다는 의미이다.

라우터에서 `app.route(path).get()` 혹은  `app.get()`이 실행되면, _router는 새로운 Route 객체와 Layer 객체를 생성한다.

레이어의 `path`는 인자로 들어온 path로 설정되고,  `handle`은 route를 dispatch 하는 함수로 설정된다.

그리고 stack으로 push가 된다.

```jsx
app.route(path).get(fn) ==>

// _router
route = new Route()
route.get(fn)

layer = new Layer()
layer.path = path
layer.handle = route.dispatch
stack.push(layer)
```

라우터는 요청이 들어오면 레이어 스택의 모든 레이어들을 살펴본다. 요청된 경로가 레이어의 경로와 일치하면, 레이어의 handle 함수가 실행된다. 

### Route(라우트)

라우터가 path를 통해 매칭을 한다면, 라우트는 http 메소드로 매칭을 한다.

각 라우트들도 각각의 레이어 스택을 갖고 있다. 그리고 레이어들이 만들어질 때, http 메소드들이 저장이 된다.

```jsx
app.get(path, fn) ==>

// _router:
route = new Route()
route.get(fn)
...

// route.get(fn)
layer = new Layer()
layer.method = 'get'
layer.handle = fn
route.stack.push(layer)
```

여기에 추가적으로, 익스프레스에서는 여러 개의 미들웨어 함수들을 하나의 라우터/라우트에서 처리하는 것도 가능하다.

```jsx
app.use(fn1, fn2, fn3, ...)

app.get('/foo', foo1, foo2, foo3, ...)

app.route('/bar')
  .get(bar1, bar2, ...)
```

위의 각 미들웨어 함수마다, 라우터 혹은 라우트는 하나의 레이어를 만들게 된다.

그리고 각 레이어들은 모두 같은 path 혹은 method를 갖는다. 그리고 하나씩 스택에 추가되는 것이다.

## next()가 동작하는 원리

express에서 요청을 다음 미들웨어 함수로 넘기려면 `next()` 함수를 실행해야 한다. 그렇지 않으면 요청이 다음으로 넘어갈 수가 없다.

라우터에서 내부적으로 `next()`가 어떻게 동작하게 되는 걸까?

레이어와 마찬가지로 라우터에도 `handle()`함수가 존재한다. 

모든 요청은 `handle()`함수에게 전달된다. 

`next()`는, `handle()` 내부에 있는 함수로, 라우터의 레이어 스택을 하나씩 살펴보는 역할을 한다.

아래는 `handle()`함수를 간단히 구현해본 것이다.

```jsx
router.handle = function(req, res) {
  idx = 0; // 하나씩 순회하기 위한 idx 값
  next(); // 최초 실행 시 next()를 호출하여 스택을 순회한다

  function next() {
    while(match !== true) {
      layer = router.stack[idx++]
      match = layer.match(req.path)
    }

    layer.handle_request(req, res, next) // 미들웨어 실행
  }
}
```

여기서 `next()`가 동작하게 되는 두 가지의 이유가 있다.

- `handle`내부에 있는 next 함수가 미들웨어의 파라미터로 전달되면서, 미들웨어 내부에서 `next()`를 실행하게 되어 다음 함수를 실행할 수 있다.
- 함수 내부의 함수이므로, **클로저**가 형성된다. `next()`가 idx의 값을 계속 기억하고 있다는 뜻이다.
    
    그래서 다음에 호출될 때, 다음 idx의 레이어에서 시작할 수 있는 것이다.
    
<img width="600" src="https://github.com/ponjaehyeok/ponjaehyeok-blog/assets/79369983/404a6989-b5aa-4b73-9cc4-d3aff54c6d0e" alt="Screen Shot 2022-09-16 at 0.01.30.png" />

라우터 뿐만 아니라, 라우트에서도 비슷한 방식으로 동작하게 된다.

`route.dispatch`함수에 미들웨어처럼 똑같이 `next()`함수가 실행된다.

그래서 체이닝을 형성할 수 있게 된다.

## requset 처리

이제 request가 들어왔을 때, 어떻게 request가 처리가 되는 지 이해할 수 있게 되었다.

- 레이어 스택 순회
    
    라우터의 `handle()` 함수가 새로운 요청을 받게되면, 레이어 스택을 순회하면서 요청을 처리하게 된다.
    
    라우터는 레이어들을 돌면서, `path` 가 매칭되는 모든 레이어를 실행시킨다.
    
- 경로 매칭
    
    레이어에 있는 `path`를 URL에 매칭시킨다.
    
    여기서 `path` 를 기본적으로 지정해주지 않은 경우, 레이어는 기본적으로 루트 경로를 가지게 된다.
    
- 라우터 내부 레이어 생성
    
    새로운 라우터가 등록되면, App의 root 라우터에 새 레이어가 생성된다.
    
    그 후 라우터 내에서 생성된 모든 미들웨어/경로는 새 레이어의 레이어 스택 내부에서 레이어를 생성하게 된다.
    
- 에러 핸들링
    
    에러 핸들러를 통해 오류가 처리된다.
    
- `handle._request` vs `handle._error`
    
    어떤 레이어의 handle 함수를 정의할 때, 실제로는 다른 래퍼 함수에 의해 실행된다. 그 래퍼함수가 바로 handle._request와 handle._error다.

    레이어 스택을 순회하면서, 라우터는 초깃값이 null인, `LayerError` 가 호출되는 지 추적한다.

    스택의 순회를 반복하는 동안 레이어에서 오류가 발생하는 경우, `next()`에 파라미터를 삽입해서 다음 라우터에 전달한다. LazyError는 error의 발생을 확인 후, 에러를 저장할 것이다. 요청은 에러가 난 상태로 처리되지 않는다. 오류가 없는 상태라면, 라우터는 모든 레이어에서 `handle_reqest` 메소드를 계속해서 호출한다. 에러 핸들러의 경우에는 `handle._request` 만 호출한다. 
    

### request 처리 플로우

이제 실제로 request가 어떤 흐름에서 처리가 진행되는 지 알아보자.

만약 서버의 관리자가 사용자의 모든 정보를 원하는 상황이라고 가정해본다. 코드는 아래와 같다

```jsx
const app = express() // create app

// register app middlewares
app.use(helmet())
app.use(compression())

const adminRouter = express.Router() // create Router
app.use('/admin', adminRouter) // register Router as a Layer in root Router

adminRouter.use(verifyAdminMiddleWare) // register middleware on Router
adminRouter.get('/users', function getUsers(req, res) { // register APIs on Router
  // only an admin can make this request
  //...get users
  return res.send(users)
})

// error handlers
adminRouter.use(notifyErrorHandler)
adminRouter.use(globalErrorHandler)
```

1. 클라이언트는 HTTP GET 메소드 요청을 하게 된다. `GET /admin/users`
2. express가 해당 요청을 받게 되면, App의 루트 라우터에 있는 `handle` 함수로 요청이 전달된다.
3. 루트 라우터는, 가장 위에 정의된 레이어부터 실행한다.
    
    가장 위에는 어플리케이션 레벨 미들웨어들(helmet, compression)들이 있는 레이어들이 있다.
    
    이 레이어들은 경로가 “/”로 설정되어 있으므로 무조건 실행된다. 레이어들의 `handle` 함수인 미들웨어를 실행한다.
    
4. 이제 adminRouter의 `/admin` 경로와 매칭이 되는 지 확인한다.
    
    `/admin`  경로와 매칭이 되면, 라우터의 내부 레이어 스택으로 가게 된다.
    
5. 라우터에서 가장 먼저 정의되는, 라우터 레벨 미들웨어들이 실행된다.
    
    adminRouter에서 verifyAdminMiddleWare()가 실행될 것이다. 
    
    해당 미들웨어는 요청한 클라이언트가 관리자인지 검증하게 된다.
    
    관리자인 경우, `next()`를 호출해 다음으로 넘어가게 된다. 관리자가 아닌 경우에는, 401(미 인증된 사용자), 403(미 승인된 사용자, 클라이언트가 누구인지 아는 상태) 등의 상태 코드를 제출하여 응답을 종료할 수 있다.
    
    혹은 `next()` 에 에러를 전달하여 에러 핸들러로 처리할 수도 있다. 둘 중 어떤 방법이든 LayerError에 저장 된다.
    
6. LayerError가 아직 없다면, 어플리케이션은 `getUsers()`를 실행한다.
    
    함수가 실행되면 user 정보를 받아와 200 상태코드와 함께 클라이언트에게 제출되고, 요청-응답 사이클이 종료된다.
    
7. 이전 스텝에서 LayerError가 있었다면, 경로가 매칭이 되더라도 `getUsers()`는 지나치게 된다.
8. `notifyErrorHandler`는 에러를 기록하고 alert를 보낸다. 아직 클라이언트에게 reponse가 보내지지 않았다면, 여기서도 응답을 보내줄 수 있다.
    
    이 과정에서 다음 레이어에게 error를 또 전달해줄 수도 있다.
    
9. 최후의 에러 핸들러처럼 동작하는 `globalErrorHandler`가 있다. 이전 미들웨어나 에러 핸들러에서 에러가 있었다면 실행하게 된다.
    
    아직 클라이언트에게 응답하지 않았다면, 응답을 보내주게 된다.
    

### 참고

[Express Middlewares, Demystified](https://medium.com/@viral_shah/express-middlewares-demystified-f0c2c37ea6a1)

[Understanding Expressjs](https://blog.laputa.io/understanding-expressjs-d5ef4f4646c8)
