// SpringBoot 서버로, React 클라이언트와 서로 요청/응답 주고받는 예제

import React, { useState } from "react";

const Exam7 = () => {
  const [portMsg, setPortMsg] = useState([]);
  const [userMsg, setUserMsg] = useState("");

  const getPortNumber = () => {
    fetch("http://localhost/getPortNumber") // 요청보낼 서버 경로
      .then((resp) => resp.json())
      .then((port) => {
        setPortMsg(port);
      });
  };
  const getUserInfo = () => {
    fetch("http://localhost/getUserInfo", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "홍길동", age: 20 }),
    })
      .then((resp) => resp.text())
      .then((data) => setUserMsg(data));
  };
  return (
    <div>
      <p>1. 서버로부터 응답 받은 값(GET방식)</p>
      <button onClick={getPortNumber}>GET 요청 보내기</button>
      <ul>
        {portMsg?.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>

      <p>2. 서버로 값 전달 후, 응답 받은 값(POST 방식)</p>
      <button onClick={getUserInfo}>POST 요청 보내기</button>
      <p>{userMsg}</p>
    </div>
  );
};

export default Exam7;
