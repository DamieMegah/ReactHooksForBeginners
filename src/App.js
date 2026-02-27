import { useState, useRef, useEffect } from 'react';
import TodoList  from "./TodoList";

const LOCAL_STORAGE_KEY = 'todoApp.todos' // create a key to store the todos in local storage
function App() {

  const todoNameRef = useRef() // create reference to input field, let us use the input value

  const handleComplete = () => {
    const newTodos = todos.filter(todo => !todo.complete) // create a new array of todos that are not complete, use filter method to remove completed todos
    setTodos(newTodos) // update the state with the new todos array
  }
  // useState to create a state variable for the list of todos, initialize it with an empty array, and setTodos is the function to update the state
const [todos, setTodos] = useState(() => {
  const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (storedTodos) {
    return JSON.parse(storedTodos)
  }
  return [ ]
})

// useEffect to save the todos to local storage whenever the todos state changes, use JSON.stringify to convert the todos array to a string before storing it in local storage
  useEffect(() =>{
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos] // create a copy of the todos array
    const todo = newTodos.find(todo => todo.id === id) // find the todo with the matching id
    todo.complete = !todo.complete // toggle the complete property of the found todo
    setTodos(newTodos) // update the state with the new todos array
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if(name === '') return  //ensure if input value is empty, nothing is added
    setTodos(prevTodos => {
      return[ ...prevTodos, {id:Date.now(), name: name, complete:false}] // add new todo to the list of todos, use spread operator to copy the previous todos and add the new one
    })
    todoNameRef.current.value = null // clear the input field after adding a todo
  
  }
  return (
  <>
   <TodoList  todos ={todos} toggleTodo={toggleTodo}/>
   <input ref ={todoNameRef} type="text" />
   <button onClick ={handleAddTodo}>Add to do </button>
   <button onClick ={handleComplete}>Clear completed</button>
   <div> {todos.filter(todo => !todo.complete).length}left to do</div>
  </>
  )
   
}

export default App;
