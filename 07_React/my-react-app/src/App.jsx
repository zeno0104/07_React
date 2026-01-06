// import "./App.css";

import { useState } from "react";
import Exam1 from "./components/Exam1";
import Exam2 from "./components/Exam2";

function App() {
  // 상태 (state)

  const [showExam, setShowExam] = useState(true);

  return (
    // js 단일 주석
    /* js 범위 주석 */
    // <></> : fragment (html 역할을 하는게 아닌 감쌀 태그가 없을 때 사용하면 됌)
    <>
      {/* <></> jsx 안에서는 // 안됌 */}
      {/* jsx 주석 */}
      {/* <h1>안녕하세요</h1> */}
      <button onClick={() => setShowExam(!showExam)}>클릭</button>
      {/* 조건부 렌더링 : 조건에 따라 렌더링되는 방법 
        && 앞에있는 showExam이 true면 Exam1이 렌더링 됨
        false면 Exam1 렌더링 되지 않음
        => 즉, 죽었다는 것(즉, 언마운트 되었다는 의미)
      */}
      {showExam && <Exam2 jaehoon="hello" test="world" />}

      {/* <Exam2 test1="hello" test2="world" /> */}
    </>
  );
}

export default App;
