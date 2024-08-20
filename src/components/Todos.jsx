import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToDo, updateTodo } from "../features/todo/TodoSlice";
import { toogleTodo } from "../features/todo/TodoSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

function Todos() {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [title, setTitle] = useState("");
  const [todoToEdit, setTodoToEdit] = useState(null);
  const [editText, setEditText] = useState("");
  const handleDeleteClick = (todo) => {
    setTitle("Delete Todo");
    setTodoToDelete(todo);
    setOpen(true);
  };

  const handleEditClick = (todo) => {
    setTitle("Update Todo");
    setEditText(todo.text);
    setTodoToEdit(todo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTodoToEdit(null);
    setTodoToDelete(null);
  };

  const handleDelete = () => {
    dispatch(removeToDo(todoToDelete.id));
    handleClose();
  };

  const handleUpdate = () => {
    dispatch(updateTodo({ id: todoToEdit.id, text: editText }));
    handleClose();
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);
  const newarr = [...activeTodos].reverse();
  return (
    <div className="flex items-center justify-center flex-col p-4">
      <ul className="w-full max-w-md">
        {newarr.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between p-2 mb-2 border rounded-lg bg-blue-200 border border-red-200`}
          >
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toogleTodo(todo.id))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700">{todo.text}</span>
            </label>
            <div>
              <IconButton
                onClick={() => handleEditClick(todo)}
                aria-label="delete"
                size="small"
              >
                <EditNoteIcon className="text-blue-700" />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteClick(todo)}
                aria-label="delete"
                size="small"
              >
                <DeleteIcon fontSize="small" className="text-red-500" />
              </IconButton>
            </div>
          </li>
        ))}

        {completedTodos.map((todo, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-2 mb-2 border rounded-lg bg-gray-300"
          >
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toogleTodo(todo.id))}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-500 line-through">{todo.text}</span>
            </label>
            <IconButton
              onClick={() => handleDeleteClick(todo)}
              className="text-red-500 hover:text-red-700"
              aria-label="delete"
              size="small"
            >
              <DeleteIcon fontSize="small" className="text-red-500" />
            </IconButton>
          </li>
        ))}
      </ul>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {todoToEdit ? (
            <>
              <TextField
                fullWidth
                variant="outlined"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                label="Edit Todo"
              />
            </>
          ) : (
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this todo item?
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {todoToEdit ? (
            <Button onClick={handleUpdate} color="primary" autoFocus>
              Save
            </Button>
          ) : (
            <Button onClick={handleDelete} color="error" autoFocus>
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Todos;
