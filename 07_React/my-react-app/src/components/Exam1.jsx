// 클래스형 컴포넌트 Exam1의 정의 -> 하지만 보통 맞춤
// 파일명과 해당 파일에 작성될 컴포넌트의 이름을 달라도 됨

import { Component } from "react";

class Exam1 extends Component {
  // React.Component 클래스를 상속받아 클래스형 컴포넌트 정의

  // 생성자 정의
  // props 는 부모 컴포넌트로부터 전달받은 데이터들이 들어가있음
  constructor(props) {
    super(props); // 부모 클래스(컴포넌트)의 생성자를 호출하는 부분, 즉 Component가 부모

    // Exam1 컴포넌트에서 사용할 상태(state)를 정의
    // this.state
    // => 클래스형 컴포넌트에서 컴포넌트의 상태(state) 객체를 의미함
    this.state = {
      // this는 Exam1이라는 객체를 의미
      count: 0, // state 중 count 상태값을 0으로 초기화
    };
    console.log("생성자 호출");
  }

  // 생명주기 코드
  // 탄생(Mount) -> 성장(Update) -> 죽음(Unmount)
  // -> 리액트 컴포넌트의 생명주기(lifecycle)

  // 탄생
  // 컴포넌트가 처음 화면에 나타났을 때 수행되는 함수
  // 뭘 하고 싶은지 안에 정의해주면 됌
  componentDidMount() {
    console.log("componentDidMount : 마운트 완료(태어남)");
  }

  // 성장(Update)
  // 해당 컴포넌트가 업데이트 될 때 (부모로부터 상속받은 props나 state가 변경된 후를 의미)
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate : 업데이트 완료");
    // prevProps : 업데이트가 발생하기 전 부모로부터 전달받은 데이터
    // prevState : 업데이트(상태)가 실행되기 전의 해당 컴포넌트 내부 상태의 데이터
    // react는 과거의 값과 현재의 값을 비교해서 리렌더링을 할지 말지를 결정
    console.log(`이전 state : ${prevState.count}`);
    console.log(`현재 state : ${this.state.count}`);
  }

  // 죽음
  // 해당 컴포넌트가 화면에서 제거될 때
  componentWillUnmount() {
    console.log("componentWillUnmount : 언마운트 완료(제거)");
  }

  // 렌더링 함수 . JSX 문법을 반환하여 화면에 UI를 그린다(렌더링)
  // JS가 섞여있는 HTML = JSX

  // 클래스형 컴포넌트 문법으로 정의된 함수
  // 버튼 클릭 시 호출되는 이벤트 핸들러 함수
  handleClick = () => {
    // 상태 업데이트 : count값을 기존 값 + 1 으로 업데이트
    this.setState({ count: this.state.count + 1 });
  };
  render() {
    return (
      <div>
        <h1>Count : {this.state.count}</h1>
        <button onClick={this.handleClick}>증가 버튼</button>

        <h2>
          부모로부터 전달받은 값 : {this.props.jaehoon} {this.props.test}
        </h2>
      </div>
    );
  }
}
// 다른 파일에서 해당 파일(Exam1.jsx)의 기본으로 지정된 컴포넌트(Exam1)를
// 사용할 수 있도록 내보냄(수출함)
export default Exam1;
