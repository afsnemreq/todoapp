import React, { useState, useEffect } from "react";
import Todo from "./components/todo";
import Form from "./components/form";

function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(0);

  useEffect(()=> {
    const todosFromLocalStorage = localStorage.getItem("todos");

    if (todosFromLocalStorage === null)
    {
        localStorage.setItem("todos", JSON.stringify([]));
    }
    else {
        setTodos(JSON.parse(todosFromLocalStorage));
    }

  },[]);

  const deleteTodo = (id) => {
    const searchedTodo = todos.find((item) => item.id === id);
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos([...filteredTodos]);
    localStorage.setItem("todos", JSON.stringify([...filteredTodos]));
  }

  const editTodo = (id) => {
    setIsEdit(true);
    setEditId(id);
    const searchedTodo = todos.find((item) => item.id === id);
    setTodoText(searchedTodo.text);
  }

  const changeIsDone = (id) => {
    const searchedTodo = todos.find((item) => item.id === id);
    const updatedTodo = {
      ...searchedTodo,
      isDone: !searchedTodo.isDone,
    };
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos([updatedTodo, ...filteredTodos]);
    localStorage.setItem("todos", JSON.stringify([updatedTodo, ...filteredTodos]));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoText === "") {
      alert("Todo text can't be empty!");
      return;
    }

    const hasTodos = todos.find((item) => item.text === todoText);
    if (hasTodos !== undefined) {
      alert("You have the todo already");
      return;
    }
    if (isEdit == false)
    {
      const newTodo = {
        id: new Date().getTime(),
        isDone: false,
        text: todoText,
        date: new Date(),
      };
  
      setTodos([...todos, newTodo]);
      localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
      setTodoText("");
    }
    else if (isEdit == true)
    {
      const searchedTodo = todos.find((item) => item.id === editId);
      const updatedTodo = {
        ...searchedTodo,
        text: todoText,
      };
      const filteredTodos = todos.filter((item) => item.id !== editId);

      setTodos([...filteredTodos, updatedTodo]);
      localStorage.setItem("todos", JSON.stringify([...filteredTodos, updatedTodo]));
      setTodoText("");
    }

  };
  return (
    <div className="container">
      <h1 className="text-center my-5">Todo App</h1>
      <Form handleSubmit={handleSubmit} todoText={todoText} setTodoText={setTodoText} />

      {todos.length <= 0 ? (
        <p className="text-center my-5">You don't have any todos yet.</p>
      ) : (
        <>
          {todos.map((item) => (
              <Todo item={item} deleteTodo={deleteTodo} editTodo={editTodo} changeIsDone={changeIsDone} />
          ))}
        </>
      )}
    </div>
  );
}

export default App;