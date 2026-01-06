import React, { useEffect, useState } from "react";

// 함수형 컴포넌트 예제
const Exam2 = ({ jaehoon, test }) => {
  // {jaehoon, test} : 구조분해할당
  // 상태 정의
  const [count, setCount] = useState(0);

  // useEffect() : 함수형 컴포넌트에서 렌더링 이후 실행되는 코드(부수효과)를 작성할 때 사용하는 Hook
  // 클래스형 컴포넌트의 componentDidMount, componentDidUpdate,
  // componentWillUnmount와 같은 기능을 사용하는게 가능하다
  useEffect(() => {
    // 이 안의 들어오는 코드는 컴포넌트가 렌더링 된 후 실행됌(부수 효과 == side effect)
    console.log("마운트 완료 또는 업데이트 됨");
    // componentDidMount or componentDidUpdate 기능

    return () => {
      // component 언마운트
      // clean-up 코드, 즉 정리 코드
      // => 언마운트 시 실행되는 코드(componentWillUnmount 기능)
      console.log("언마운트 됨");
    };
  }, [count]); // 의존성 배열
  // 경우 1) 의존성 배열을 안적은 경우
  // 컴포넌트가 리렌더링 될 때마다 매번 실행(무분별한 렌더링으로 인한 성능 저하)

  // 경우 2) 의존성 배열을 빈배열로 적은 경우
  // 마운트시 1회 실행, 언마운트시 return 구문 1회 실행

  // 경우 3) 배열에 값을 작성 시
  // 배열에 있는 값이 변경될 때 마다 아래 과정 수행
  // 1) 이전 Effect를 정리(clean-up:언마운트)
  // 2) 그 다음 새로운 Effect를 시행(마운트)
  // => 즉, count 상태가 변경되면 clean-up이 먼저 실행되고 위에 정의된 기능들이 수행됌
  // 3)
  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <>
      {/* 함수형 컴포넌트로 클래스형 컴포넌트와 동일하게 구현 */}
      <div>
        <h1>count : {count}</h1>
        <button onClick={handleClick}>증가 버튼</button>
        <h2>
          부모로부터 전달받은 값 : {jaehoon} {test}
        </h2>
      </div>
    </>
  );
};

export default Exam2;
