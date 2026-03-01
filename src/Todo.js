

export default function Todo ( {todo, toggleTodo}){
    function handleTodoClick () {
        toggleTodo(todo.id)// this call the toggleTodo function passed as a prop from the parent component, passing the id of the current todo as an argument
    }
    return(
        <>
          <label>
           <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
           {todo.name}
          </label>
        </>
    )
}
