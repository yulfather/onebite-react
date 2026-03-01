import './Main.css';

function Main({ foo }) {
  const user = {
    name: 'soyul',
    isLogin: false,
  };

  if (user.isLogin) {
    return (
      <div
        style={{
          backgroundColor: 'red',
          fontWeight: 'bold',
          fontSize: '24px',
        }}
      >
        로그아웃{foo}
      </div>
    );
  } else {
    return <div className="Login">로그인{foo}</div>;
  }

  // return <>{user.isLogin ? <div>로그아웃{foo}</div> : <div>로그인</div>}</>;
}

export default Main;
