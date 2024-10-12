'use client'
import Image from "next/image";
import { useState, useEffect } from 'react'
import axios from 'axios'
export default function Home() {

  // todo post method code
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEditing, setEditing] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  
  // submit a new todo
  //  todo post or create function code
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = {
      todo_title: title,
      todo_description: description
    };
    const url = "http://127.0.0.1:8000/todo_class/";
    try {
      const response = await axios.post(url, newTodo);
      console.log('Todo created successfully: ', response.data);
      // Prepend the new todo and reverse the list to maintain reverse order
      //setTodos((prevTodos) => [...prevTodos, response.data]);
      setTodos((prevTodos) => [response.data, ...prevTodos]);
      setTitle('');
      setDescription('');
    } catch(error) {
      console.error('There was an error creating the todo!', error);
    }
  };
  
  // for delete any of todo item
  // delete todo item
  const handleDelete = async(id) => {
    const url = `http://127.0.0.1:8000/todo_class/${id}/`;
    try {
      await axios.delete(url);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      console.log('Todo Deleted successfully!');
    } catch(error) {
      console.error('There was an error deleting the todo!', error);
    }
  };

  // Trigger edit mode
  const handleEdit = (todo) => {
    setEditing(todo.id);
    setEditTitle(todo.todo_title);
    setEditDescription(todo.todo_description);
  };
  
  const handleUpdate = async(id) => {
    const updatedTodo = {
      todo_title: editTitle,
      todo_description: editDescription,
    };
    const url = `http://127.0.0.1:8000/todo_class/${id}/`;
    try {
      const response = await axios.put(url, updatedTodo);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? response.data: todo))
      );
      console.log('Todo updated successfully: ', response.data);
      setEditing(null);
    } catch(error){
      console.error('There was an error updating the todo!', error);
    }
  }
  
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/todo_class/");
        // i add here reverse order 
        //setTodos(response.data);
        setTodos(response.data.reverse());
        setLoading(false);
      } catch(error) {
        console.error('There was an error fetching the todos!', error);
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);
  
  // this the main display board for todo
  return (
    <div className="flex justify-center text-center mx-auto p-2">
      <main>
        <h1 className="2xl:bg-zinc-50 2xl:shadow-lg">Nextjs and Django Todo Application!</h1>
        {/* here is the form panel for todo application */}
        <div className="bg-slate-100 p-2 text-center text-2xl rounded-md">
          <h1>Todo Input Panel!</h1>
          <div className="flex justify-center">
            <form onSubmit={handleSubmit}>
              <input 
                className="flex p-2 m-1 rounded-md bg-blue-100 text-slate-900"
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your todo title..."
                required
              />
              <input 
                className="flex p-2 m-1 rounded-md bg-blue-100 text-slate-900"
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter your todo description..."
                required
              />
              <button type="submit">Todo Add!</button>
            </form>
          </div> 
        </div>
        {/* here is the get panel and update delete option */}
        <div className="flex  mx-auto">
          <div className="bg-blue-300 p-2 justify-center mx-auto">
            <h1 className="p-2 text-xl">Todo Item!</h1>
            {loading ? (
              <p className="text-slate-950 p-2">Loading...</p>
            ) : (
              <div className="bg-blue-100 justify-center mx-auto p-2 m-1">
                {todos.map(todo => (
                  <div className="p-2 m-1 bg-lime-200 flex list-none justify-center text-start">
                    <li className="flex-col" key={todo.id}>
                      {/* this code adding for updating the todo */}
                      {isEditing === todo.id ? (
                        // edit mode : show inputs for editing title and descripption
                        <div className="flex-col justify-center mx-auto">
                          <div className="flex-col">
                            <input 
                              className="flex p-2 m-1 rounded-md"
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              placeholder="Editing the title again..."
                            />
                            <textarea
                              className="flex p-2 m-1 rounded-md"
                              value={editDescription}
                              onChange={(e) => setEditDescription(e.target.value)}
                            />
                          </div>
                          
                          <div className="flex gap-2 justify-center">
                            <button className="bg-lime-500 p-1 rounded-md" onClick={() => handleUpdate(todo.id)}>Save</button>
                            <button className="bg-red-500 p-1 rounded-md" onClick={() => setEditing(null)}>Cancel</button>
                          </div>
                          
                         
                        </div>
                      ) : (
                        // view mode show todo details
                        <div className="flex-col justify-center mx-auto">
                          <div className="flex-col justify-center mx-auto">
                            <h1 className="bg-indigo-200 p-2 m-1 rounded-md">{todo.todo_title}</h1>
                            <p className="bg-violet-200 p-2 m-1 rounded-md">{todo.todo_description}</p>
                          </div>
                          <div className="flex justify-center text-center mx-auto">
                            <button className="bg-lime-600 p-2 m-1 rounded-md" onClick={() => handleEdit(todo)}>Edit</button>
                            <button className="bg-red-600 p-2 m-1 rounded-md" onClick={() => handleDelete(todo.id)}>Delete</button>
                          </div>
                        </div>
                      )}
                    </li>
                  </div>   
                ))}
              </div>
            )} 
          </div>
        </div>
      </main>
    </div>
  );
}
