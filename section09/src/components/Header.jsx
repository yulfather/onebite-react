import "./Header.css";

const Header = () => {
  return (
    <div className="Header">
      <h3>오늘은🗓️</h3>
      <h1>{new Date().toLocaleDateString("ko-KR")}</h1>
    </div>
  );
};

export default Header;

// 1. new Date() 활용
//  -> 현재 시각을 가진 Date 객체생성

// 2. .toDateString()
//  -> 시간은 버리고, 날짜 정보만
//  -> 영문 고정 포맷 문자열로 변환

// new Date().toString();
// "Sat Jan 24 2026 20:15:30 GMT+0900 (Korean Standard Time)"

// new Date().toDateString();
// "Sat Jan 24 2026"

// new Date().toLocaleDateString("ko-KR");
// "2026. 1. 24."
