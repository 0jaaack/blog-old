---
title: Hash Table과 충돌, 충돌 해결 기법
tags:
  - 자료 구조
published: true
date: "2022-04-27"
description: 해쉬 브라운과 해쉬 테이블의 상관 관계
---

## 해싱(Hashing)

<img alt="hash brown image" width="500" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbUNoQv%2FbtrAwEoyrwR%2FRkkX0BmxpvdEYZSuGO3UxK%2Fimg.jpg" />

해쉬 브라운(Hash Brown)이라는 음식이 있다. 감자를 잘게 다져서 모양을 잡아 튀긴 음식이다. 맥도날드의 맥모닝 세트에도 있는 음식이다. 

어쨌든 이 해쉬 브라운은, 감자를 해쉬(hash)하여 만들어졌다. 기존의 감자의 형체를 알아볼 수 없도록 다져놓은 것이다.

<img alt="programming hashing image" width="600" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbBYLIF%2FbtrAxHSELel%2F7R14UOrGqj45y3tr94uDLK%2Fimg.jpg" />

마찬가지로 프로그래밍에서 해싱(hashing)이란, 어떤 특정 값을 받아서 고정된 길이의 새로운 값을 도출해 주는 것이다. 이 때 새로운 값을 해시 값이라고 하며, 이러한 기능을 하는 함수를 해시 함수(hash function)라고 한다.

그리고 해쉬 함수를 이용해 자료를 저장하는 자료구조를 바로 **해시 테이블**이라고 한다.

## 해쉬 테이블(Hash Table)
<img alt="hash table image" width="600" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdbjUZu%2FbtrAxOKJiTK%2FJhqtLFeyvEe7RN10Gd41wk%2Fimg.png" />

해쉬 테이블은 해쉬 함수로 변환 된 값을 인덱스(index)로 사용하여, 그 값을 저장하는 자료구조이다. 예를 들어 위 그림에서 James는 해쉬 함수를 거쳐 04라는 인덱스를 부여받게 되고, 인덱스 04에 값(754-231-5342)이 저장된다.


해쉬 테이블의 장점이라고 한다면, 삽입과 삭제, 탐색을 하는데에 O(1)의 시간 복잡도를 갖는다는 것이다. 삽입이나 삭제를 할 때, 굳이 모든 자료를 순회하지 않아도 해쉬 함수를 거쳐서 해당 값의 주솟값을 알 수 있으므로 O(1)의 시간 복잡도를 갖게 되는 것이다.

그렇다고 해서 해쉬 테이블이 만능이라거나, 최고의 자료구조인 것은 아니다. 상황에 따라서 적절한 자료구조가 있을 뿐이고, 해쉬 테이블도 그 중 하나이다.

해쉬 테이블의 한계는 우선 순서가 있는 자료를 구현할 때는 적합하지 않다. 어떤 순서가 정해진 자료를 구현하는 데는 직관적으로 생각해보았을 때도 해쉬 테이블보다는 스택이나 큐, 연결 리스트가 적절하다고 볼 수 있다.

그리고 해쉬 테이블은 자료구조의 일정한 크기를 확보하여야 한다. 보통 해쉬 함수는 해쉬 값의 범위를 부여받아서 그 값을 인덱스로 되돌려준다. 안그러면 어마어마하게 큰 범위의 인덱스로 저장될 수도 있다. 그래서 해쉬 테이블은 일정한 크기를 확보하여야 하는데, 상황에 따라서 비효율적일 수도 있게 된다.

해쉬 테이블의 성능은 해쉬 함수의 성능에 대한 의존도가 크다. 좋은 해쉬 함수를 갖고 있다면 삽입/삭제/탐색의 동작을 하는데에 많은 시간이 걸리지 않는다. 해쉬 테이블의 시간 복잡도는 O(1)이지만, 그건 자료 크기에 상관없이 항상 일정한 시간의 작업이 걸린다는 의미이지 작업 시간의 절대값은 어떤 해시 함수를 사용하느냐에 따라 다를 수 있다.

## 해쉬 함수(Hash Function)
해쉬 함수는 해싱을 수행하는 함수이다. 해쉬 테이블의 성능을 좌우하는 핵심적인 역할을 한다. 보통 해쉬 함수를 직접 만드는 경우는 많지 않고, 공개되어있는 해쉬 함수들을 쓰는 경우가 많다. 대표적인 해쉬 함수에는 SHA, MD5와 같은 것들이 있다. 

해쉬 함수는 꼭 **멱등성**이란 것을 보장해야 한다. 멱등성이 무엇이냐하면, 어떤 동일한 값을 몇 번을 넣어도 항상 동일한 값이 나와야한다는 것이다. 동일한 키값에 대해, 동일한 인덱스 값을 반환해야 우리가 해쉬 테이블을 온전히 사용할 수 있다.

그리고 좋은 해쉬 함수가 되려면 인덱스 값의 분포가 적절해야 한다. 그렇지 않은 경우 충돌이 발생할 가능성이 높고, 이는 해쉬 테이블의 성능 하락으로 이어진다.

## 충돌(Collision)
해쉬 테이블에서 문제가 되는 경우는 대개 충돌이 발생하는 경우이다. 충돌이란, 해싱을 거친 각각의 키 값이 같은 인덱스를 가지게 되는 경우를 말한다.

<img alt="hash table collision image" width="600" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbmVD9Q%2FbtrAxl9Tr4V%2FMaBNOZ4a96JyqZq4xbPQq0%2Fimg.png" />

위에서 인덱스 152를 살펴보면, John Smith라는 키와 Sandra Dee라는 키가 같은 인덱스를 가지는 것을 볼 수가 있다. 다른 키값이 동일한 인덱스를 가지면서 충돌이 발생하게 된 것이다. 

어떤 해쉬 함수라도 충돌이 발생할 수 밖에 없다. 아무리 좋은 해쉬 함수라도 충돌은 일어날 수 있고, 충돌이 없이 정말 완벽하게 인덱스가 분배되는 해쉬 함수는 이 세상에 존재하지 않는다.충돌이 덜 발생할 수록 좋은 해쉬 함수라고 말할 수 있다.

해쉬 테이블의 키의 개수를 K, 그리고 해쉬 테이블의 크기를 N이라고 했을 때 해쉬 테이블의 적재율은 K/N이다. 적재율이 1 초과인 해쉬 테이블은 반드시 충돌이 발생하게 된다.

결국 우리는 해쉬 테이블을 만들 때, 충돌을 대비해서 만들어야 한다. 충돌을 처리하는데는 여러가지 방법이 있는데, 여기서는 Chaining과 Open Adressing을 살펴보고자 한다.

### Chaining

<img alt="hash table chaining image" width="600" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FkDNUL%2FbtrAx7cCN6v%2FUwT0Eqfku6FhJuhTuyIr3k%2Fimg.png" />

Chaining이란, 쉽게 말해 데이터를 연결 리스트로 저장하는 것을 말한다. 위와 같은 상황에서, Chaining 방식은 Sandra Dee는 인덱스 152의 John Smith 다음에 값을 저장한다.

이 때 탐색과 삭제의 시간 복잡도는 최악의 경우 O(n)이 될 수 있다. 하지만 정말 극단적인 최악의 경우를 상정하였을 때의 이야기이고, 보통 평균으로 표현하는 것이 일반적이다.

### Open Adressing

<img alt="hash table open address image" width="600" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcxKaPv%2FbtrAyM66oar%2FA6qMnBRHnysBbr6XSOysD1%2Fimg.png" />

Open Adressing은 해시값에 저장된 주소가 아닌, 다른 주소로 저장하는 방법이다. 위와 같은 상황에서 Sandra Dee값은 비어있는 인덱스 값인 153으로 저장한다.

이와 같은 방법을 썼을 때 해쉬 테이블의 삽입/삭제/탐색의 동작을 살펴보면, 우선 삽입을 할 때, 충돌이 일어날 경우에는 비어있는 다른 주솟값을 찾게 된다. 비어있는 자리를 탐색하는 것을 탐사(Probing)이라고 하는데, 선형 탐사(1씩 더해가면서 탐색)/ 제곱 탐사(1^2, 2^2, 3^2..으로 탐사)/ 이중 해싱(인덱스 값을 한 번 더 해싱)과 같은 방법이 있다.

인덱스의 충돌로 특정 부분에 값이 밀집되는 클러스터링 문제가 발생하는데, 이로 인해서 탐색이나 삭제과정이 느려지게 된다. 선형 탐사와 제곱 탐사, 이중 해싱 순으로 클러스터링이 자주 일어난다. 탐색을 할 때는 해시 값으로 나온 인덱스부터 하나씩 검사해가면서 탐사해나간다.

<img alt="hash table collision time complexity table image" width="600" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbNeb37%2FbtrAxM7dOKf%2FrHBV1pInw8yAUkDgHao4Ok%2Fimg.png" />

각 충돌 해결 기법의 시간 복잡도를 나타낸 그래프이다. 적재율(α)이 높아질수록 각 기법의 시간 복잡도는 위 그래프와 같이 증가하게 된다. 여기서 Successful은 해쉬 테이블에 값이 있는 경우이고, Unsuccessful은 없는 경우이다.

해쉬 테이블의 적재율이 높아지면 높아질수록 데이터의 충돌이 급격하게 늘면서 시간 복잡도도 상승하게 된다. 어느정도 적재율이 높아지게 되면 해쉬 테이블을 확장해주어야 하는데, 이는 그렇게 바람직한 상황이 아니다.

해쉬 테이블의 공간을 확장하게 되면 기존에 있는 노드들을 다시 새 크기에 맞춰 해싱해주어야 하기 때문에, 애초에 확장을 하지 않을 정도로 해쉬 테이블을 설계할 필요가 있다. 그렇다고 너무 많은 공간을 할당해버리면 그것 또한 메모리가 낭비되는 일이다. 

## 활용 
해쉬 자체부터 정말 많은 곳에 사용된다.

우선 보안에서 쓰이게 되는데, 원래의 값과 해시 값 사이에 선형적 관계가 없다. 해시 값으로 아무리 갖고 비틀어봐도 원래의 값을 알 수 없다는 뜻이다. 그래서 비밀번호와 같은 보안적인 값은 해시 값으로 저장하고 나중에 어떤 값을 입력했을 때 해쉬 함수를 거쳐 비교하는 방식이 쓰이기도 한다.

그리고 해쉬 테이블의 대표적인 예시로는 전화번호부(또는 주소록, 사전)를 들수가 있다. 전화번호부는 순서가 중요한 자료 구조가 아니다. 그저 이름과 전화번호를 저장하면 되는 것이다. 그래서 빠른 탐색을 위해서 해쉬 테이블로 구현될 수 있다.

그리고 해쉬 테이블은 블록체인 기술에도 활용된다. 비트코인이나 이더리움과 같은 암호화폐들은 주솟값이 해싱되어 저장되어 있고, 해시 함수를 통해 간단하게 소유권을 증명해낼 수가 있다.

마지막으로 자바스크립트의 객체는, 내부적으로 해쉬 테이블로 이루어져있다. 자바스크립트 엔진에서 해쉬 함수를 통해 객체를 어떤 인덱스 값에 저장하고, 불러온다.

## 참고
- [https://baeharam.netlify.app/posts/data%20structure/hash-table]()
- [https://mangkyu.tistory.com/102]()
