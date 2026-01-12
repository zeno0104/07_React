// React 만을 이용한 TodoList 예제

import React, { useState } from "react";

const TodoList = () => {
  // 작성할 Todo를 기억할 List(배열) 상태
  const [todoList, setTodoList] = useState([
    {
      title: "123",
      isDone: false,
    },
    {
      title: "4567",
      isDone: false,
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  // 초기 상태값을 미리 넣어놔야 보임, key 이름 자유롭게
  // Add Todo 버튼 클릭 시 todoList 상태에 새로운 할 일을 업데이트 이벤트 핸들러 함수
  const handleAddTodo = () => {
    // JavaScript Spread(전개) 연산자 (...)
    // : 배열이나 객체같이 여러 데이터가 모여있는 형태를 낱개 형태로 뿌려주는(펼쳐주는) 기능
    /*
        const 과일 = ["사과", "바나나"];
        const 새로운배열 = [...과일, "딸기"];
        console.log(새로운배열); // ["사과", "바나나", "딸기"]
    */
    setTodoList([
      ...todoList,
      {
        title: inputValue,
        isDone: false,
      },
      /*
       [{
      title: "123",
      isDone: false,
    },
    {
      title: "4567",
      isDone: false,
    },{
        title: inputValue,
        isDone: false,
    }]
      */
      // 기존 todoList가 가진 배열의 요소를 낱개로 펼치고 뒤에 새로운 요소를 추가
      // -> 새로운 배열이 생성됨. 이 새로운 배열을 상태이 todoList 전달하여 셋팅
      // -> React 불변성의 법칙 지킴!
      // -> 즉, todoList 주소와 다름

      // ⭐⭐⭐⭐⭐⭐⭐⭐⭐
      /* 
      React의 불변성의 법칙(Immutable)
      - 원본이 수정되면 안된다는 법칙

      React는 상태가 변했는지 확인할 때 얕은 비교(Shallow Compare) 수행함
      -> 얕은 비교는 메모리 주소값만 보고 '주소가 바뀌었네? 그럼 데이터가 변경되었나보군' 라고 판단함
      원본 [요소만 변경]배열 -> 주소값 변경이 안됌

      원본 객체의 내부 값을 수정하면 메모리 주소는 그대로 유지 -> 불변성 법칙을 위배
      -> 원본이 변경되면(즉, 주소가 그대로면) 리액트는 '데이터가 변하지 않았다' 라고 판단함.
      -> 상태가 변경됨에 따라 화면이 리렌더링 되는건데, React가 변경되지 않았다고 판단하여
      리렌더링이 안된다. 

      [불변성을 지키는 방법]
      원본을 직접 수정 X -> 기존 내용들을 복사한 새로운 객체를 만들어(주소도 새로운 것) 리액트로 전달해야함 == 상태로 사용함

      map, filter, reduce가 immutable -> 즉, 새로운 배열을 반환

      */
    ]);
    setInputValue(""); // input 창 값 비우기
  };
  const handleDeleteTodo = (targetIndex) => {
    /*
        [{title : '123', isDone : false},
        {title:'44444', isDone : false}]
    */
    // filter 함수 : 배열의 요소 중 특정 조건을 만족하는 요소들만 걸러내어 새로운 배열을
    // 반환해주는 함수
    // -> filter는 원본 유지됨(불변성을 지키는 함수)
    const newTodo = todoList.filter((_, i) => i !== targetIndex);
    // i와 index값이 일치하지 않는 요소들만 모아 새로운 배열로 반환함.
    // 즉, 현재 클릭한 todo를 제외한 요소가 모인 새 배열이 생성됨 (마치 삭제 기능처럼 작동함)
    setTodoList(newTodo); // 위 새로 생성된 배열을 상태에 세팅했기 때문에 불변성을 잘 지키면서 구현됨
  };

  // 완료/미완료 상태 업데이트 이벤트 핸들러 함수
  const handleToggleTodo = (targetIndex) => {
    const newTodo = todoList.map(
      (todo, i) =>
        i === targetIndex ? { ...todo, isDone: !todo.isDone } : todo
      // 현재 배열의 i와 매개변수 index가 같으면
      //isDone값을 반대값으로 변경한 내용으로 사용하겠다는 의미
      // 같지 않으면 기존 todo를 그대로 적용하여
      // 새로운 배열을 만들어 반환(map 사용)
    );
    setTodoList(newTodo); // 새로 만들어진 배열을 상태에 전달(불변성 법칙 지킴)
  };
  return (
    <div>
      <h1>나의 TodoList</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      <ul>
        {/* ⭐⭐⭐⭐⭐⭐ 시험쓰 ⭐⭐⭐⭐⭐⭐ */}
        {/* 여러줄일 때 / 한 줄일 때 */}
        {/* {todoList.map((todo, index) => {
          // 중괄호면 return
          return <li key={index}>{todo.title}</li>;
        })} */}

        {/* 한 줄일 때 */}
        {/* {todoList.map((todo, index) => (
          <></>
        ))} */}

        {/* 여러줄 일 때 / 한 줄일 때 -> {}와 return() 구분이 생략된 형태 -> ()로 대신함 */}
        {/*  */}
        {todoList.map((todo, index) => (
          <>
            {/* key는 바뀐 부분만 업데이트 하기 위해 필요 */}
            <li key={index}>
              <span
                style={{
                  textDecoration: todo.isDone ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
              <button onClick={() => handleToggleTodo(index)}>
                {todo.isDone ? "미완료" : "완료"}
              </button>
              <button onClick={() => handleDeleteTodo(index)}>삭제</button>
              {/* <button onClick={handleAddTodo(전달인자)}>추가하기</button> */}
              {/* 위험한 방식 - 즉시 실행(클릭했을 때 수행되는 것이 아닌 즉시 함수가 실행) */}
              {/* 전달할 인자가 있을 경우 ()=> () 이렇게! */}
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
