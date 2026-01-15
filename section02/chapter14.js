// 비동기 작업 처리하기

// 3. async / await

// 3-1. async
// 함수를 비동기 함수로 만들어주는 키워드
//  -> 함수가 Promise를 반환하도록 변환

async function getData1() {
  return {
    name: "soyul",
    id: "park",
  };
}
console.log(getData1());
// Promise {<fulfilled>: {…}}
// [[Prototype]]: Promise
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: Object
// id: "park"
// name: "soyul"

// async함수에서 Promise를 return하면 async는 아무런 기능없이 Promise자체를 반환한다.
async function getData2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: "soyul",
        age: 7,
      });
    }, 3000);
  });
}
console.log(getData2);
//  Promise자체를 반환
// async ƒ getData2() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({
//         name: "soyul",
//         age: 7,
//       });
//     }, 3000);
//   });
// }

// 3-2. await
// async 함수 내부에서만 사용이 가능 한 키워드
// 비동기 함수가 다 처리되기를 기다르는 함수

// 기존 비동기 코드 호출 then() 사용
function printData1() {
  getData2().then((result) => {
    console.log(result);
  });
}
printData1(); // {name: 'soyul', age: 7}

// await을 붙이면 then()메서드 없이 비동기 코드를 기다려준다
async function printData2() {
  const data = await getData2();
  console.log(data); // {name: 'soyul', age: 7}
}
printData2();
