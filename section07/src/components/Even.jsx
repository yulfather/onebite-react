import { useEffect } from "react";

// useEffect 언마운트 제어
const Even = () => {
  useEffect(() => {
    // cleanup, 정리함수
    return () => {
      console.log("unMount");
    };
  }, []);

  return <div>짝수입니다.</div>;
};

export default Even;
