import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // StrictMode
  // React 개발 모드에서만 동작하는 래퍼 컴포넌트
  // 엄격하게 제한하겠다는 의미
  // 1. 잠재적 문제 탐지
  // 2. 일부 함수 두 번 실행 (개발자에게 경고하는 행위)
  // 3. 오래된 API를 사용하는 것을 탐지
  // -> 실사용에서는 아무런 영향을 주지 않음.

  // <StrictMode>
  <App />
  // </StrictMode>
);
