import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

import "../css/Login.css";

function Login() {
  const { changeInputEmail, changeInputPw, handleLogin } =
    useContext(AuthContext);
  return (
    <div className="login-container">
      <h1>KH BoardProject Admin</h1>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">이메일:</label>
          <input type="email" id="email" required onChange={changeInputEmail} />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            required
            onChange={changeInputPw}
          />
        </div>
        <button type="submit" id="submit" onClick={handleLogin}>
          로그인
        </button>
      </form>
    </div>
  );
}

export default Login;
