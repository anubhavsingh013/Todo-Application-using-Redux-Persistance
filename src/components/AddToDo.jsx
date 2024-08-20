import  { useState } from "react";
import { useDispatch } from "react-redux";
import { addToDo } from "../features/todo/TodoSlice";
import './Addtodo.css'

function AddToDo() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const addToDoHandler = (e) => {
    e.preventDefault();
    dispatch(addToDo(input));
    setInput("");
  };
  return (
    <div className=' flex items-center justify-center flex-col ' >
      <h1 className='text-2xl font-semibold'>Redux toolkit and Redux Persistance</h1>
      <form onSubmit={addToDoHandler} className="mt-4 " >
      <input
        type="text"
        className="bg-gray-800 rounded-border border-gray-700 focus:border-indigo-500 
        focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8
        translation-colors duration-200 ease-in-out"
        placeholder="Enter a todo"
        value={input}
        required
        onChange={(e) => setInput(e.target.value)}
      />
      
      <button type="submit" className="bg-blue-800 ml-2 rounded-border border-gray-700 focus:border-indigo-500 
        focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8
        translation-colors duration-200 ease-in-out">Add </button>
    </form>
    </div>
  );
}

export default AddToDo;
