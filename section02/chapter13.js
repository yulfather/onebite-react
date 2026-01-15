// 비동기 작업 처리하기 Promise

// 1) Promise 인스턴스화 시점에 실제로 일어나는 일
// const p = new Promise((resolve, reject) => {
//   // executor
// })

// 내부흐름(핵심)

// 1. Promise 객체생성
// - 엔진은 "Promise 레코드(내부슬롯)" 같은 것을 만들고, 아래정보를 갖는다
// -> [PromiseState]: "pending"으로 시작
// -> [PromiseResult]: undefined 아직 결과 없음
// -> [FulfillReactions]: then으로 등록될 "성공" 콜백 대기열
// -> [RejectReactions]: then/catch로 등록될 실패 "콜백" 대기열

// 2. executor함수 즉시(synchronous:동기화)실행
// - new Promise(executor)의 executor는 "비동기처럼 보이지만 실행 자체는 즉시 동기적으로" 호출
// - 엔진은 executor에 resolve, reject 함수 2개를 만들어서 인자로 전달합나다.
//  -> 이 resolve/reject는 "그 Promise 인스턴스 p를 정착시키는 전용 함수"라고 봄면됨

// 3. executor 내부에서 resolve/reject를 호출하면 "정착(settle)" 시도
// - resolve(value) 또는 reject(reason)가 호출되면
//  -> 아직 pending -> 상태를 바꾸고, 결과를 저장하고, 대기 중 콜백들을 실행예약
//  -> 이미 settled이면 -> 무시됨(Promise는 단 한 번만 정착)

// 4. executor에서 에러가 throw되면 자동 reject
// - executor실행 중 예외가 발행하면 엔진이 reject(error)를 호출한 것과 동일하게 처리
// - 이미 resolve/reject로 정착했다면 throw는 의미가 없어집니다.

// 2) Promise의 "상태(state)"는 무엇이며 어떻게 변하는가?
// Promise의 상태는 외부에서 직접 읽을 수있는 "공식 프로퍼티"가 아니라
// 내부 상태(Internal Satate)

// 상태 전이
// - pending(대기)
//  -> fulfilled(이행, 성공) : resolve(value)로 정착
//  -> rejected(거부, 실패) : reject(reason)로 정착

// 규칙(매우중요)
// - 한 번만 정착(Immutable settle)
//  -> pending -> fulfilled/rejected로 "한 번" 바뀌고 끝
// - 정착된 이후 resolve/reject는 무시됨
// - resolve로 또 다른 Promise/thenable을 주면 "동화(assimilation)"가 일어남
//  -> resolve(otherPromise) 같은 형태는 "바로 fulfilled"가 아님
//  -> otherPromise가 fulfilled/rejected되는 결과를 따라가도록 처리

// 3) then/catch/finally를 호출할 때 벌어지는 일(핵심구조)
// p.then(onFulfilled, onRejected)

// 내부흐름
// 1. then은 새 Promise를 하나 만들어서 반환(체이닝의 핵심)
//  -> 이를 흔히 p2라고 부름
// 2. 엔진은 p의 상태를 보고 분기
//  -> p가 pending이면
//   -> onFulfilled, onRejected를 "반응(reaction)"으로 등록
//   -> p가 나중에 정착되면 실행되도록 대기열에 저장
//  -> p가 이미 fulfilled/rejected이면
//   -> 콜백을 "즉시 실행"하는게 아니라
//   -> 마이크로태스크(microtast)로 실행 예약
//   -> 항상 비동기적으로 다음 턴에 실행되는 것처럼 보이기

// 호출했을 때 실행 순서 -> 마이크로태스크
// -> Promise가 정착되면 then/catch의 콜백은 "즉시" 호출되는게 아니라,
// 마이크로 태스크 큐에 들어가서 실행

// 개념정리
// new Promise(executor)를 호출하면 Promise 인스턴스가 생성되고
// executor는 즉시 동기적으로 실행된다.
// executor 내부에서 resolve 또는 reject가 호출되면
// Promise는 정착되고,
// 그 결과를 처리하는 then / catch의 콜백은
// 마이크로태스크 큐에 등록되어 비동기적으로 실행된다.

// 2. Promise
// -> 비동기 작업을 효율적으로 처리할 수 있도록 도와주는 자바스크립트의 내장 객체

// new Promise() 생성자 사용
// 생성자의 인수로 비동기 작업을 실행 할 콜백함수 입력
const promise = new Promise((resolve, reject) => {
  // 비동기 작업 실해하는 콜백함수(executor)
  // 상태 전이 PromiseState
  // - pending(대기)
  //  -> fulfilled(이행, 성공) : resolve(value)로 정착
  //  -> rejected(거부, 실패) : reject(reason)로 정착

  setTimeout(() => {
    console.log("안녕");
    // PromiseResult : resolve/reject의 인자로 등록
    resolve("성공");
  }, 2000);
});
// Promise 객체 내부 프로퍼티
// -> PromiseState : "pending"
setTimeout(() => {
  console.log(promise); // Promise {<fulfilled>: '성공'}
}, 3000);

// 예제1
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    const num = 10;
    // typeof num === "number" ? resolve(num + 10) : reject("num 에러발생");
    if (typeof num === "number") {
      resolve(num + 10);
    } else {
      reject("num 에러발생");
    }
  }, 2000);
});
setTimeout(() => {
  console.log(promise1); // Promise {<fulfilled>: 20}
}, 3000);

// 예제2 - then 메서드 활용
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    const num = null;
    typeof num === "number" ? resolve(num + 20) : reject("num이 없다");
  }, 2000);
});
// promise2실행에 따라 성공시 resolve()가 실행
// resolve()의 결과 값을 then((결과값) => {})의 콜백함수의 인자로 전달
promise2.then((value) => {
  console.log(value); // 30
});

// promise2실행에 따라 실패시 reject()가 실행
promise2.catch((error) => {
  console.log(error); // num이 없다
});

// then() 메서는 Promise를 다시한번 반환함
// then().then().catch()형식으로 연결하여 사용가능
//  -> Promise Chaining
promise2
  .then((value) => {
    console.log(value);
  })
  .catch((value) => {
    console.log(value); // num이 없다
  });

// 함수 안에서 동적으로 매개변수를 받아 사용
function add10(num) {
  const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      typeof num === "number" ? resolve(num + 10) : reject("num이 입력안됨");
    }, 2000);
  });

  return promise3;
}

add10(40).then((value) => {
  console.log(value); // 50
});

// 잘못된 사용방법
// Promise를 사용하는 이유가 callback지옥을 탈출하기 위함
// 아래처럼 코드를 작성하면 Promise를 장점을 살리수 없다.
const p = add10(10);

p.then((result) => {
  console.log(result); // 20

  const newP = add10(result);

  newP.then((result) => {
    console.log(result); // 30

    const newNewP = add10(result);

    newNewP.then((result) => {
      console.log(result); // 40
    });
  });
});

// 개선된 코드
add10(50)
  .then((result) => {
    console.log(result); // 60
    return add10(result);
  })
  .then((result) => {
    console.log(result); // 70
    return add10(result);
  })
  .then((result) => {
    console.log(result); // 80
    return add10(result);
  })
  .catch((error) => {
    console.log(error);
  });
