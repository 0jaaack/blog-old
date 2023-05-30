---
title: Strict Mode
tags:
  - javascript
published: true
date: "2022-10-01"
description: 깐깐한 자바스크립트를 위한 자바스크립트 모드
---


## 개요

**strict mode**는, 그대로 직역하면 엄격한 방식이라는 뜻입니다.
말 그대로 자바스크립트를 엄격하게 사용한다는 말입니다.

자바스크립트는 많은 세월을 거치면서 기존에 작성되었던 문법들에 대해서 문제점이 제기되어졌습니다. 

자바스크립트는 유연한 문법을 가진 언어입니다. 하지만 그런 특성 때문인지 오류로서 발생되어야 할 문법적 실수가 오류를 발생 시키지 않는 경우가 있습니다. 예를 들면 사용할 수 없는 프로퍼티(전역 프로퍼티 등)에 할당을 하는 등의 오류는, 오류로서 잡아내지 않고 문법적 허용이 일어났습니다.

strict mode를 적용해 이러한 오류들을 오류로서 발생시켜 더욱 안전한 javascript 환경을 만들게 됩니다. 그뿐 아니라, 보다 최적화가 용이한 코드가 될 수 있도록 하고, 최신 자바스크립트로의 전환도 용이하게 만들어줍니다.

## 적용하는 방법

자바스크립트 파일 전체를 엄격하게 적용하고 싶으면, 스크립트 최상단에 `"use strict";`를 삽입하면 됩니다. 

또는 함수 내부의 최상단에 넣으면 함수 내에서 strict mode로 동작하게 됩니다.

마지막으로 export/import를 통해 모듈을 사용하는 경우, 모듈의 전체 콘텐츠는 따로 선언하지 않아도 자동으로 strict mode가 적용됩니다.

## Strict Mode에서 시행되는 것들

### 문법 실수를 에러로 변환

1. 전역 변수에 할당하는 실수
    
    일반적으로는 전역 공간에서 변수의 선언 없이 할당을 하게 되면, 전역 객체에 속성이 만들어지게 되고 값의 할당이 이루어지게 되는데요. strict mode에서는 이와 같은 행위는 오류를 일으키게 됩니다.
    
    ```jsx
    "use strict";
    
    val = "abc";
    
    // Uncaught ReferenceError: val is not defined
    ```
    
2. 사용할 수 없는 전역 프로퍼티, 사용할 수 없는 프로퍼티, getter 프로퍼티, 확장 불가능한 프로퍼티에 할당하는 실수
    
    NaN이나 undefined 등과 같은 값은, 값을 할당해 쓸 수 없는 전역 프로퍼티입니다. 이와 같은 값에 할당하는 것은 strict mode에서 error를 발생시킵니다. 
    
    그리고 객체에서 확장 불가한 객체를 사용하는 경우 (주로 `Object.preventExtensions()`를 이용), setter 없이 getter만 있는 getter-only 프로퍼티에 값을 할당하는 경우, 쓸 수 없는 프로퍼티에 할당하는 경우에서 error를 발생시키게 됩니다.
    
    ```jsx
    "use strict";
    
    const NaN = "abc";
    
    // Uncaught SyntaxError: Identifier 'NaN' has already been declared
    
    const obj = {};
    Object.defineProperty(obj, "name", { value: "Lydia", writable: false });
    obj.name = "gong";
    
    // Uncaught TypeError: Cannot assign to read only property 'name' of object
    ```
    
3. 삭제할 수 없는 프로퍼티를 삭제하려는 실수
    
    프로퍼티를 삭제(delete)하려는 시도가, 어떤 효과가 없는 경우에 에러를 반환하게 됩니다.
    
    ```jsx
    "use strict";
    
    delete Object.prototype;
    
    // Uncaught TypeError: Cannot delete property 'prototype' of function Object()
    ```
    
4. 중복된 함수 파라미터 이름을 사용하는 실수
    
    함수의 파라미터가 중복되는 경우, 기존 자바스크립트에서는 이전에 지정된 인수를 숨기게 됩니다. 하지만 이러한 숨김은 완전치 않으며(arguments로 접근할 수 있으므로), 에러를 일으키게 됩니다.
    
    ```jsx
    
    function duplicateParameter(a, a, c) {
    	"use strict";
    
    	const sum = a + b + c;
    
    	return sum;
    }
    
    // Uncaught SyntaxError: Duplicate parameter name not allowed in this context
    ```
    
5. 숫자에 0을 붙여 8진수 구문을 사용하는 실수
    
    기존의 자바스크립트에서는 8진법의 수를 사용할 때, 숫자 리터럴에 0을 붙이는 방식으로 사용하였습니다. 하지만 오용의 소지가 많아 strict mode에서는 에러를 일으키게 됩니다.
    
    ES5에서는 `0o`를 앞에 붙여 8진수를 사용할 수 있게 되었습니다.
    
    ```jsx
    "use strict";
    
    const number = 012;
    
    // Uncaught SyntaxError: Octal literals are not allowed in strict mode.
    ```
    
6. 원시형 데이터에 프로퍼티를 설정하는 실수
    
    원시형(primitive) 값에 프로퍼티를 설정할 수 없습니다. 원래의 경우에는 이러한 설정이 무시되지만, 엄격 모드에서는 에러를 일으키게 됩니다.
    
    ```jsx
    "use strict";
    
    "1".number = 1;
    
    // Uncaught TypeError: Cannot create property 'number' on string '1'
    ```
    

### 변수의 사용을 단순화

strict mode에서는, 변수의 사용을 단순화할 수 있도록 몇 가지 불분명한 케이스를 바로잡아 줍니다.

1. `with`의 사용을 금지
    
    `with`는 인자로 받는 객체를 스코프 내에서 접근가능하도록 해주는 키워드입니다.
    
    ```jsx
    const gongJaeHyeok = {
      mbti: "INTP",
      personalColor: "SPRING_WARM_TRUE",
    	bodyType: "SOEUM"
    };
    
    with (gongJaeHyeok) {
      console.log(mbti); // 접근 가능. "INTP"
      bodyType = "TAEYANG"; // 할당도 가능.
    }
    ```
    
    `with` 라는 키워드는 잘 사용하면 유용하게도 사용할 수 있겠지만, strict mode에서는 권장되지 않는 방법인데요.
    
    가장 큰 이유는 모호함을 들 수 있습니다.
    
    ```jsx
    const gongJaeHyeok = {
      name: "jaehyeok"
    };
    const name = "ken";
    
    with (gongJaeHyeok) {
      console.log(name); // "jaeHyeok" or "ken"?
    }
    ```
    
    해당 name이 어떤 값을 가리키게 될 지는, 직접 실행해보아야만 알 수 있습니다.
    
    이런 모호함 때문에 `with`의 사용은, strict mode에서 에러를 일으키게 됩니다.
    
2. eval이 새로운 변수를 주위 스코프에 추가하는 것을 금지
    
    원래 자바스크립트에서 eval을 사용할 때는, eval 내에서 호출된 변수를 주위의 함수나 전역 스코프에 추가하였습니다.
    
    하지만 strict mode에서 생성된 eval은 내부에서 evaluated 된 코드에서만 변수를 생성하므로, 외부 변수에 영향을 주지 않습니다.
    
    참고로 strict mode 내부에서 정의된 eval의 내부 함수는, strict mode가 적용됩니다.
    
    ```jsx
    "use strict";
    
    const evalX = eval("const x = 1000; x");
    
    console.log(evalX); // 1000
    console.log(x); // Uncaught ReferenceError: x is not defined
    ```
    
3. 일반 이름을 제거하는 것
    
    strict mode에서 변수가 아닌 변수명을 제거하려는 것은 에러를 발생시킵니다.
    

```jsx
"use strict";

const x;

delete x;

// Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.
```

### eval과 arguments를 간단하게 만들기

eval과 arguments를 더욱 간단하게 만들어줄 수 있습니다.

1. eval과 arguments에 바인딩되거나 할당 금지
    
    strict mode에서는 eval.혹은 arguments를 할당 할 수 없습니다. 이는 eval과 arguments를 하나의 키워드로서 다루기 위해서 입니다.
    
    ```jsx
    "use strict";
    
    const eval = "evil";
    
    // Uncaught SyntaxError: Unexpected eval or arguments in strict mode
    ```
    

1. arguments 객체가 값을 추적하지 않음
    
    일반적으로는 arguments 객체는 값의 변화를 추적합니다.
    
    함수의 첫 번째 매개변수를 변경하게 되면,매개변수 뿐 아니라 arguments[0]의 값도 바뀌게 됩니다.
    
    하지만 strict mode의 argumets는 호출 될 때 인수들을 저장하고, 값을 따로 추적하지는 않습니다.
    
    ```jsx
    function nonStrict(a) {
      a = 1000;
      return [arguments[0], a];  
    }
    
    function strict(a){
      "use strict";
    
      a = 1000;
      return [arguments[0], a];
    }
    
    console.log(nonStrict(1)); // [1000, 1000]
    console.log(strict(1)); // [1, 1000]
    ```
    
2. `arguments.callee`의 사용 금지
    
    `arguments.callee`는 현재 실행 중인 함수를 실행하는 함수입니다. 익명의 함수를 작성하는 경우에 유용하게 쓰일 수도 있지만, 현재는 거의 쓰이지 않는 메소드입니다.
    
    초기의 자바스크립트에서 유명 함수식이 없었고, 무명 함수식에서 재귀를 만들기위해 내부적으로 `arguments.callee` 를 사용하였습니다.
    
    하지만 재귀 구현의 한계와 this 관련 문제(global 객체를 가리키는 문제) 등이 있었고, 유명 함수식이 허용되면서 문제가 해결되었습니다. 
    
    거기에 `arguments.callee` 는 인라인 함수의 최적화를 방해한다는 문제점도 있습니다. strict mode에서 arguments.callee를 사용할 경우 에러가 발생합니다.
    

### 보안성이 높은 자바스크립트가 되게 하기

1. this로 함수로 전달된 값이 강제로 객체가 되는 것 방지
    
    일반적인 경우에는 함수에 this를 전달하는 경우, this는 무조건 객체가 됩니다. 성능적인 부분을 차치하고서라도, 전역 객체가 브라우저에 노출되는 것은 위험합니다. 
    
    전역 객체를 보호하기 위해서 this를 전달하는 경우 객체가 되지 않으며, 정의하지 않은 this는 모두 undefined가 됩니다.
    
    **엄격모드에서 this는, 더이상 window를 참조하지 않게 됩니다.** 
    
2. 함수 내부의 적극적인 접근이 제한됩니다.
    
    어떤 함수 `func가 실행될 때`, `func.caller`는 가장 최근 func를 호출한 함수입니다. 
    
    그리고 func.arguments는 fun을 호출하기 위한 인수입니다. 자신의 함수를 실행하는 권한이 있는 함수와, 인수에 접근하기 때문에 보안의 문제가 발생하게 됩니다.
    
    그래서 strict mode의 경우 사용 불가능합니다.
    
    ```jsx
    function strict() {
      "use strict";
    
      strict.caller;
      strict.arguments; 
    // VM1616:4 Uncaught TypeError: 'caller', 'callee', and 'arguments' properties
    // may not be accessed on strict mode functions or the arguments objects
    // for calls to them at strict
    }
    ```
    
3. 인수는 더 이상 해당 함수의 호출 변수에 대한 접근을 제공하지 않음
    
    `arguments.caller`는 함수의 추상화를 통해 값을 숨길 수 있는 보안 기능을 차단해서 보안의 위협이 됩니다. 그리고 최적화에도 좋지 않습니다.
    
    strict mode에서는 사용 불가능합니다.