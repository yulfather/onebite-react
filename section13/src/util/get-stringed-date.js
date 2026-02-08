// input 테그 속성에 date설정에 따른 초기값 설정 시 new Date()객체의 포멧으로 설정이 안되어
// String 타입에 초기값 설정을 위한 함수

export const getStringedDate = (targetDate) => {
  // 날짜 -> yyyy-mm-dd
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};
