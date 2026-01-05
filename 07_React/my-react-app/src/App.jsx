import { useState } from "react";
import "./App.css";

function App() {
  // 상태 (state)

  // const [count, setCount] = useState(0);

  return (
    // js 단일 주석
    /* js 범위 주석 */
    // <></> : fragment (html 역할을 하는게 아닌 감쌀 태그가 없을 때 사용하면 됌)
    <>
      {/* <></> jsx 안에서는 // 안됌 */}
      {/* jsx 주석 */}
      <h1>안녕하세요</h1>
    </>
  );
}

export default App;
