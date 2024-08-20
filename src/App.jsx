
import './App.css'
import AddToDo from './components/AddToDo'
import Todos from './components/Todos'

function App() {
  return (
    <div className='min-h-screen justify-center items-center bg-gray-200'>
      <AddToDo/>
      <Todos/>
    </div>
  )
}

export default App
