import { useContext } from "react";
import DashBoard from "./components/DashBoard";
import Login from "./components/Login";

import "./css/App.css";
import { AuthContext, AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AppComponent />
    </AuthProvider>
  );
}

function AppComponent() {
  const { user } = useContext(AuthContext); // consumer 발동, 소비를 진행
  // 로그인을 했다면 DashBoard 렌더링
  // 로그인을 안했다면 Login 렌더링
  // -> 조건 : 로그인 여부
  // -> 로그인을 했는지 안했는지를 기억해줄 상태값(user)
  // -> user 에는 로그인 한 사람의 대한 정보가 세팅.
  // -> user는 AuthContext 안에 작성!
  // -> ContextAPI를 이용하여 렌더링 조건 처리 하겠다는 의미!

  return (
    <>
      {user ? (
        <div className="body-container">
          <DashBoard />
        </div>
      ) : (
        <div className="login-section">
          <Login />
        </div>
      )}
    </>
  );
}

export default App;
