import React, { useState } from "react";

const TodoListPractice = () => {
  const [input, setInput] = useState("");
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
  const handleAddTodo = () => {
    const newTodo = [...todoList, { title: input, isDone: false }];
    setTodoList(newTodo);
    setInput("");
  };
  const handleConfirm = (index) => {
    const newTodo = todoList.map((todo, i) =>
      index === i ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodoList(newTodo);
  };
  const handleDelete = (index) => {
    const newTodo = todoList.filter((_, i) => i !== index);
    setTodoList(newTodo);
  };

  return (
    <div>
      <h1>나의 TodoList</h1>
      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <button onClick={handleAddTodo}>Add Todo</button>

      <ul>
        {todoList.map((todo, index) => (
          <li key={index}>
            <span
              style={{ textDecoration: todo.isDone ? "line-through" : null }}
            >
              {todo.title}
            </span>
            <button onClick={() => handleConfirm(index)}>완료</button>
            <button onClick={() => handleDelete(index)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListPractice;
