import './App.css';
import React, {useState, useEffect} from 'react';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const[completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () =>{
    if (newTodo.trim() === "") {
      return;
    }
    if (allTodos.some(item => item.todo === newTodo)) {
      alert("This task already exists in the list.");
      return;
    }
    let newTodoItem = {
      todo: newTodo,
    }
    let updatedTodo = [...allTodos];
    updatedTodo.push(newTodoItem);
    setAllTodos(updatedTodo);

    localStorage.setItem('todoList', JSON.stringify(updatedTodo));
    setNewTodo("");
  }

  const handleDeleteTodos = (index) =>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('todoList', JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
  }

  const handleCompleteTodo = (index) =>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let completedOn = dd + "-" + mm + "-" + yy + " at " + h + ":" + m + ":" + s;
    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    }
    let updatedCompleted = [...completedTodos];
    updatedCompleted.push(filteredItem);
    setCompletedTodos(updatedCompleted);
    handleDeleteTodos(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompleted));
  }

  const handleDeleteCompletedTodos = (index) =>{
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }

  useEffect(()=>{
    let savedTodos = JSON.parse(localStorage.getItem('todoList'));
    let savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    if(savedTodos){
      setAllTodos(savedTodos);
    }
    if(savedCompletedTodos){
      setCompletedTodos(savedCompletedTodos);
    }
  },[])

  return (
    <div className="App">
        <h1>My Todo App</h1>
        <div className="container">
            <div className="todo-input">
                <div className="todo-input-item">
                  <label>Todo Task</label>
                  <input type="text" placeholder="Enter your Todo Task" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/>
                </div>

                <div className="todo-input-item"> 
                  <button className="primaryBtn" onClick={handleAddTodo}>Add</button>
                </div>
            </div>

          <div className="btn-area">
            <button 
              className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} 
              onClick={() =>{setIsCompleteScreen(false)}}>Todo
            </button>
            <button 
              className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} 
              onClick={() =>{setIsCompleteScreen(true)}}>Completed
            </button>
        </div>

        <div className="todo-list-area">
          {isCompleteScreen ===  false && allTodos.map((item, index) =>{
            return(
                <div className="todo-list-item" key={index}>
                  <h3>{item.todo}</h3>
                  <div>
                    <AiOutlineDelete 
                      className="icon" 
                      title="Do you want to delete this ?" 
                      onClick={() =>handleDeleteTodos(index)}
                    />
                    <BsCheckLg 
                      className="checkIcon" 
                      title="Do you want to complete this ?" 
                      onClick={() =>handleCompleteTodo(index)}
                    />
                  </div> 
                </div>
                );
                })}

        {isCompleteScreen === true && completedTodos.map((item, index) => {
          return (
            <div className="todo-list-item" key={index}>
              <div>
                <h3>{item.todo}</h3>
                <p><small>Completed On: {item.completedOn}</small></p>
              </div>
              <div>
                <AiOutlineDelete
                  className="icon"
                  title="Do you want to delete this ?"
                  onClick={() => handleDeleteCompletedTodos(index)}
                />
              </div>
            </div>
              );
            })}
        </div>
        </div>

    </div>
  );
}

export default App;
