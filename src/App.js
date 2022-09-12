import React,{ useState } from "react";

function App() {

  const [todoText, setTodoText] = useState("")

  const handleSubmit = (event) => {
      event.preventDefault();
      if (todoText === "")
      {
          alert("Todo text can't be empty !!!");
          return;
      }

      alert(todoText);
  };

  return (
    <div className="container">
      <h1 className="text-center my-5">To Do App Project</h1>

      <form onSubmit={ handleSubmit }>
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Type your todo.. ." value={todoText} onChange={(event)=> setTodoText(event.target.value) } />
            <button className="btn btn-outline-secondary" type="submit">ADD</button>
        </div>
      </form>
    </div>
  );
}

export default App;
