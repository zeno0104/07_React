import { Children, createContext, useState } from "react";
import { axiosApi } from "../api/axiosAPI";

export const AuthContext = createContext();

// Context는 Provider(제공자)와 Consumer(소비자) 존재
// 전역 상태를 제공하는 Provider 컴포넌트를 내보낼 것

export const AuthProvider = ({ children }) => {
  // <AppComponent />가 매개변수로 들어옴
  // children으로 받아줌

  // 상태값, 함수
  // 전역적으로 현재 로그인한 회원의 정보를 기억할 상태 정의
  const [user, setUser] = useState(() => {
    const storeUser = localStorage.getItem("userData");

    return storeUser ? JSON.parse(storeUser) : null;
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 이메일 입력 핸들러
  const changeInputEmail = (e) => {
    setEmail(e.target.value);
  };
  // 패스워드 입력 핸들러
  const changeInputPw = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    // 동기식 작동을 멈추게 하는 메서드
    // 즉, form 태그의 제출 이벤트를 막겠다는 것
    e.preventDefault();

    // 비동기 로그인 요청 -> 서버로
    const response = await axiosApi.post("/admin/login", {
      memberEmail: email,
      memberPw: password,
    });
    console.log(response);
    // response JS OBJ 형태로 저장됨
    // response에는 js객체로 넘어옴
    // response.status : 200
    // response.data : 응답데이터가 넘어옴

    const adminInfo = response.data;

    if (adminInfo.length === 0) {
      alert("이메일 혹은 비밀번호 불일치");
      return;
    }
    // 상태에 셋팅
    setUser(adminInfo);

    // 데이터를 localStorage에 저장
    localStorage.setItem("userData", JSON.stringify(adminInfo));

    // 만료시간 지정(1시간 뒤에 로그아웃) 타이머 설정
    setTimeout(() => {
      localStorage.removeItem("userData");
      setUser(null);
      alert("재로그인 해주세요~");
      window.location.href = "/";
    }, 60 * 60 * 1000); // 1시간 후
  };

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      const resp = await axiosApi.get("/admin/logout");

      if (resp.status === 200) {
        localStorage.removeItem("userData");
        setUser(null);
      }
    } catch (error) {
      console.error("로그아웃 중 문제 발생 : ", error);
    }
  };
  // 자식(하위) 컴포넌트에게 전달할 데이터를 하나로 묶기
  const globalState = {
    user,
    setUser,
    changeInputEmail,
    changeInputPw,
    handleLogin,
    handleLogout,
  };
  return (
    <AuthContext.Provider value={globalState}>{children}</AuthContext.Provider>
  );
};

// 브라우저에서 현재 로그인한 회원(관리자) 정보를 기억하도록 해야함.
// localStorage :
// - 브라우저를 닫아도 데이터가 영구적으로 유지
// - 브라우저 전역에서 사용(모든 탭과 창에서 공유되는 데이터)
// - 유효기간 만료 기능 없음

// sessionStorage :
// - 브라우저 탭 또는 창을 닫으면 데이터가 즉시 삭제
// - 현재 탭 또는 창에서만 데이터가 유지됨
// - 유효기간 만료 기능 없음
