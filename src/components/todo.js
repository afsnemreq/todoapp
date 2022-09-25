import React from "react";

const Todo = (props) => {
    const { item, deleteTodo, editTodo, changeIsDone } = props;
    return(
        <div className={`alert alert-${item.isDone === false ? "secondary" : "success"} d-flex justify-content-between align-items-center`}>
              <p>{item.text}</p>
              
              <div>
                <button className="btn btn-sm btn-danger mx-2" onClick={() => deleteTodo(item.id)}>Delete</button>
                <button className="btn btn-sm btn-success mx-2" onClick={() => editTodo(item.id)}>Edit</button>
                <button onClick={() => changeIsDone(item.id)} className="btn btn-sm btn-secondary">
                  {item.isDone === false ? "Done" : "Undone"}
                </button>
              </div>
        </div>
    )    
}
export default Todo