import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./todo.css";

const getInitalTodos = () => {
  if (localStorage.getItem("Todo") !== null) {
    var newTodo = localStorage.getItem("Todo");
    return JSON.parse(newTodo);
  } else {
    return [];
  }
};
export function Todo() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState(() => getInitalTodos());

  const addTodo = (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") {
      alert("Please Enter Todo Value");
      return null;
    }

    setTodos([
      ...todos,
      {
        text: inputValue,
        id: uuidv4(),
      },
    ]);

    setInputValue("");
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("Todo", JSON.stringify([...todos]));
  }, [todos]);

  return (
    <div className="container">
      <form onSubmit={addTodo}>
        <input
          type={"text"}
          value={inputValue}
          placeholder={"Enter Your Todo"}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {todos.map((todo) => (
        <div>
          <div key={todo.id} className="todo">
            <p>{todo.text}</p>
            <i
              onClick={() => removeTodo(todo.id)}
              className="fa-solid fa-trash-can"
            ></i>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
}
