import { useEffect, useState, useRef } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  const firstRender = useRef(true)


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])



  const saveToLs = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }



  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)

  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });

    setTodos(newTodos)

  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")

  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)

  }


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-slate-100 min-h-[80vh] md:w-[35%]">
        <h1 className='font-bold text-center text-3xl text-slate-800'>SimplyDo - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold text-slate-700'>Add a Todo</h2>
          <div className="flex">

            <input onChange={handleChange} value={todo} type="text" className='w-full bg-white border border-slate-300 
             rounded-full px-5 py-2 
             focus:outline-none focus:ring-2 
             focus:ring-blue-500' placeholder='Add a new Task' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-blue-600 hover:bg-blue-700 
                   text-white rounded-full px-4 py-2 
                   font-semibold transition-colors '>Save</button>
          </div>
        </div>

        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>

        <h2 className='text-2xl font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to Display</div>}
          {todos.map(item => {



            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between 
             bg-white p-3 rounded-lg 
             shadow-sm hover:shadow-md 
             hover:bg-slate-50 
                 transition-all duration-200">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through text-slate-400 transition-all"
                  : "text-slate-800"}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-blue-600 hover:bg-blue-700 
                   text-white rounded-full px-4 py-2 
                   font-semibold transition-colors'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-blue-600 hover:bg-blue-700 
                   text-white rounded-full px-4 py-2 
                   font-semibold transition-colors'><AiFillDelete /></button>
              </div>
            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App
