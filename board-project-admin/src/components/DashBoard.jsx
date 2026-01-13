import React, { useContext } from "react";
import "../css/DashBoard.css";
import Restore from "./Restore.jsx";
import Manager from "./Manager.jsx";
import Statistics from "./Statistics.jsx";
import { AuthContext } from "./AuthContext.jsx";

export default function DashBoard() {
  const { handleLogout } = useContext(AuthContext);
  return (
    <div className="dash-board-container">
      <h1>관리자 페이지</h1>

      <div className="admin-info">
        <p>현재 접속 관리자 : </p>
        <button onClick={handleLogout}>로그아웃</button>
      </div>

      <ul className="tab-box">
        <li className="active">복구</li>
        <li>통계</li>
        <li>관리자 메뉴</li>
      </ul>
    </div>
  );
}
