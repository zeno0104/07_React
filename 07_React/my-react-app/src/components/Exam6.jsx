// Context API : React 컴포넌트 트리 전체에서
// 데이터를 공유할 수 있는 방법을 제공
// 부모자식간 관계가 중첩된 구조에서 데이터를 전달하는데 있어
// 불필요한 props drilling(상태 내리꽂기)를 방지함.
// -> 사용하기 위해선 useContext hook이 필요함.

import React, { createContext, useContext, useState } from "react";

// React.createContext() : Context 객체를 생성 시 사용하는 함수
// Context : react에서 컴포넌트 계층 구조를 통해 데이터를 효율적으로 전달하기 위한 메커니즘(작동방식/원리)

// Provider : 데이터를 제공
// Consumer : 데이터를 소비

// 전역적으로 context 생성
const UserContext = createContext(null);

// 부모 컴포넌트 역할을 함(Exam6)
const Exam6 = () => {
  const [user, setUser] = useState("홍길동");

  // Context.Provider : 하위 컴포넌트에게 데이터를 전달할 때 (제공할 때) 사용
  return (
    // 생성한 Context 작성 및 value에는 전달할 상태값을 전달

    <UserContext.Provider value={{ user, setUser, test: "test값 입니다." }}>
      <h1>부모 : 부모가 가진 상태 값 {user}</h1>
      <Child1 />
    </UserContext.Provider>
  );
};

const Child1 = () => {
  return (
    <>
      <h1>Child1</h1>
      <Child2 />
    </>
  );
};
const Child2 = () => {
  const contextValue = useContext(UserContext);
  // useContext : Context로 등록된 객체 중 이름이 UserContext를 꺼내어
  // 데이터를 사용(소비) 하겠다는 의미
  return (
    <>
      <h1>
        child2 :{contextValue.user} / {contextValue.test}
      </h1>
      <Child3 />
    </>
  );
};
const Child3 = () => {
  const contextValue = useContext(UserContext);
  return (
    <>
      <h1>
        child3 : {contextValue.user} / {contextValue.test}
      </h1>
    </>
  );
};

export default Exam6;
