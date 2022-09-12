import React,{ useState } from "react";

function App() {

  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);


  const changeIsDone = (id) => {

      const searchedTodo = todos.find((item) => item.id === id);

      const updatedTodo = {
          ...searchedTodo,
          isDone: !searchedTodo.isDone,
      };


      const filteredTodos = todos.filter((item) => item.id !== id);

      setTodos([updatedTodo, ...filteredTodos]);
      console.log(setTodos);

  };


  const handleSubmit = (event) => {
      event.preventDefault();
      if (todoText === "")
      {
          alert("Todo text can't be empty !!!");
          return;
      }

      const hasTodos = todos.find(item => item.text === todoText);

      if (hasTodos !== undefined)
      {
          alert("You have the todo already");
          return;
      }

      const newTodo={
          id: new Date().getTime(),
          isDone: false,
          text: todoText,
          date: new Date(),
      }
    
      setTodos([newTodo, ...todos]);
      setTodoText("");
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

      {
          todos.length <= 0 ? (
              <p className="text-center my-5">You don't have any todos yet.</p>
          ) : (

            <div>
               {
                  todos.map((item) => (
                      <div className="alert alert-primary d-flex justify-content-between align-items-center">
                          <p>{item.text}</p>
                          <button onClick={() => changeIsDone(item.id) } className="btn btn-primary">
                              {
                                 item.isDone === false ? "Done" : "Undone"
                              }
                          </button>
                      </div>
                    )
                  )
               }
            </div>

          )
      }
    </div>
  );
}

export default App;
