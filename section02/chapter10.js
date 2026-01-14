// Date 객체와 날짜

// 1. Date객체를 생성하는 방법

// new Date()로 생성자 호출
// 생성자에 아무런 인수를 입력하지 않는다면 현재 시간이 출력됨
let date1 = new Date(); // 생성자
console.log(date1); // Wed Jan 14 2026 16:51:31 GMT+0900 (한국 표준시)

// 특정한 날짜를 출력하고 싶다면 생성자에 "문자열" 또는 (2020, 02, 10, 13, 15, 30)로 표현 가능
// 년_월_일 구분자는 ., 공백, _, -, / 가능
// 날짜뒤에 시간을 표시하고 싶다면 /로 구분하고 시간:분:초 입력
let date2 = new Date("2020-02-10/13:15:30");
console.log(date2); // Mon Feb 10 2020 13:15:30 GMT+0900 (한국 표준시)
let date3 = new Date(2020, 2, 10, 13, 15, 30);
console.log(date3); // Tue Mar 10 2020 13:15:30 GMT+0900 (한국 표준시)

// 2. 타임 스템프
// 특정 시간이 "1970.01.01 00시 00분 00초"로 부터 몇 ms가 지났는지를 의미하는 숫자값
// "1970.01.01 00시 00분 00초" === 협정세계시 === UTC

// getTime() - utc기준으로 부터 date1(현재시간)객체 안에 시간을 계산해줌
// 계속 새로고침 할 수 록 값이 증가됨
let ts1 = date1.getTime();
console.log(ts1); // 1768377906443

let date4 = new Date(ts1); // 현재 시간과 동일한 값을 가짐
console.log(date1, date4);

// 3. 시간 요소들을 추출하는 방법
// 날짜
let year = date1.getFullYear();
let month = date1.getMonth() + 1;
let date = date1.getDate();
// 시간
let hour = date1.getHours();
let minute = date1.getMinutes();
let seconds = date1.getSeconds();
console.log(year, month, date, hour, minute, seconds);

// js"월"은 인덱스 0부터 시작 -> 월을 표시할때는 +1

// 4. 시간 수정하기
date1.setFullYear(2020);
date1.setMonth(2);
date1.setDate(10);
date1.setHours(13);
date1.setMinutes(15);
date1.setSeconds(30);
console.log(date1); // Tue Mar 10 2020 13:15:30 GMT+0900 (한국 표준시)

// 5. 시간을 여러 포멧으로 출력하기
// 영어포멧
console.log(date1.toDateString()); // Tue Mar 10 2020
// 한글포멧
console.log(date1.toLocaleString()); // 2020. 3. 10. 오후 1:15:30
