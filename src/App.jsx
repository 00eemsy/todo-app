import { useState, useEffect } from 'react'
import supabase from "../helper/supabaseClient";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  })

  async function addTodo(dueDate) {
    if (!title.trim) return;

    const {error} = await supabase.from("todos").insert([{title: title, completed: false, due_date: dueDate}]);
    if (error) console.error(error);
    else {
      setTitle("");
      fetchTodos();
    }
  }

  async function fetchTodos() {
    const {data, error} = await supabase.from("todos").select("*").order("created_at", {ascending: true});

    if (error) console.error(error);
    else {
      setTodos(data);
    }
  }

  async function completeTodo(id) {
    await supabase.from("todos").update({completed: true}).eq("id", id);
    fetchTodos();
  }

  async function deleteTodo(id) {
    await supabase.from("todos").delete().eq("id", id);
    fetchTodos();
  }

  async function updateTodo(id, value) {
    await supabase.from("todos").update({title: value}).eq("id", id);
    fetchTodos();
  }

  async function clearAll(bool) {
    await supabase.from("todos").delete().in("completed", [bool]);
    fetchTodos();
  }

  return (
    <div>
      <h1>todo list</h1>

      <input value={title} onChange={(e)=> {setTitle(e.target.value)}}
      placeholder="add a new todo"/>

      <button onClick={() => addTodo(prompt("due date:", ""))}>add</button>

      <h2>incomplete todos</h2>
      <button 
        onClick={() => clearAll(false)}>clear all</button>

      <div>
        {todos
          .filter((t) => !t.completed)
          .map((todo) => (
          <div key={todo.id} >
            <span>{todo.title}</span>
            <button 
              onClick={() => completeTodo(todo.id)}>complete</button>
            <button
              onClick={() => updateTodo(todo.id, prompt("new title:", todo.title))}>update</button>
            <button 
              onClick={() => deleteTodo(todo.id)}>delete</button>
          </div>
        ))}
      </div>

      <h2>completed todos</h2>
      <button 
        onClick={() => clearAll(true)}>clear all</button>
      <div>
        {todos
          .filter((t) => t.completed)
          .map((todo) => (
          <div key={todo.id} >
            <span>{todo.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
