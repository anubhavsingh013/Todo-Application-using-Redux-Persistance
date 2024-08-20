import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState={
    todos:[{id:1,text:'hello world',completed:false}]
}
export const todoSlice=createSlice({
    name:'todo',
    initialState,
    reducers:{
        addToDo:(state,action)=>{
            const todo={
                id:nanoid(),
                text:action.payload,
                completed:false
            }
            state.todos.push(todo);
        },
        removeToDo:(state,action)=>{
            state.todos=state.todos.filter((item)=>
                 item.id!==action.payload
            )
        },
        toogleTodo:(state,action)=>{
            const toDoItem=state.todos.find((item)=>item.id===action.payload)
            if(toDoItem){
                toDoItem.completed=!toDoItem.completed;
            }
        },
        updateTodo:(state,action)=>{
            const toDoItem=state.todos.find((item)=>item.id===action.payload.id)
            if(toDoItem){
                toDoItem.text=action.payload.text
            }
        }
    }
})

export const {addToDo,removeToDo,toogleTodo,updateTodo}=todoSlice.actions;
export default todoSlice.reducer;