import { useEffect, useState } from "react"
import { Action, Todo } from "../models/models"
import { useLocalStorage } from "../hooks/useLocalStorage"

// Define the component props interface
interface Props {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  action: Action
  setAction: React.Dispatch<React.SetStateAction<Action>>
  activeSection: string
  setActiveSection: React.Dispatch<React.SetStateAction<string>>
  setActiveTask: React.Dispatch<React.SetStateAction<number>>
}

export default function FormSection({ todos, setTodos, action, setAction, activeSection, setActiveSection, setActiveTask }: Props) {

  // Custom hook to handle local storage
  const { setItem } = useLocalStorage('todos')

  // State to manage while the current todo being edited or added
  const [todo, setTodo] = useState<Todo>({ id: 0, title: "", description: "", category: "", completed: false })

  // Effect to update the form when editing a task
  useEffect(() => {
    if (action.type === 'edit') {
      const activeTodo = todos.filter(todo => todo.id === action.id)
      setTodo(activeTodo[0])
    }
  }, [action, todos])

  // Function to reset the form to its initial state
  function resetForm() {
    setTodo({ id: 0, title: "", description: "", category: "", completed: false })
    setAction({ type: 'add', id: 0 })
    setActiveSection('list') // Display only the list section when the screen width is less than 768 pixels.
    setActiveTask(0)
  }

  // Function to handle input changes in the form
  function handleChange(e: React.FormEvent) {
    const { name, value } = e.target as HTMLInputElement
    setTodo(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  // Function to delete a task
  function deleteTask() {
    let updatedTodos: Todo[] = []
    updatedTodos = todos.filter(value => value.id !== action.id)
    setItem(updatedTodos)
    setTodos(updatedTodos)
    resetForm()
  }

   // Function to handle form submission
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (action.type === 'edit') {
      let updatedTodos: Todo[] = []
      updatedTodos = todos.map(value => { return value.id === action.id ? todo : value })
      setItem(updatedTodos)
      setTodos(updatedTodos)
    } else {
      setItem([{ ...todo, id: Date.now() }, ...todos])
      setTodos([{ ...todo, id: Date.now() }, ...todos])
    }

    resetForm()
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full md:w-1/3 lg:w-1/4 p-4 bg-gray-100 rounded-2xl relative sections ${activeSection === 'form' ? 'showForm' : 'hideForm'}`}>
      <i onClick={() => setActiveSection('list')} className="text-red-500 text-4xl absolute -left-6 top-8 cursor-pointer mobileClose fa-solid fa-circle-xmark"></i>
      <h2 className="font-bold text-red-500">{action.type === 'add' ? 'Add a new Task:' : 'Update a Task: '} </h2>
      <input type="text" className="block w-full p-2 my-4 outline-none text-sm text-gray-900 border border-gray-300 rounded-lg bg-transparent" placeholder="Task name"
        name="title"
        value={todo.title}
        onChange={handleChange}
        required
      />

      <textarea className="block w-full p-2 my-4 outline-none text-sm text-gray-900 border border-gray-300 rounded-lg bg-transparent" placeholder="Description" rows={7}
        name="description"
        value={todo.description}
        onChange={handleChange}
      ></textarea>


      <label htmlFor="category" className="mb-2 text-sm font-medium text-gray-900 mr-4">Category: </label>
      <select name="category" value={todo.category} onChange={handleChange} required id="category" className="bg-gray-50 border outline-none border-gray-300 text-gray-900 rounded-md text-xs p-1">
        <option value="" disabled>Choose a category</option>
        <option value="personal">Personal</option>
        <option value="work">Work</option>
      </select>

      <div className="absolute bottom-0 right-0 my-6 text-center w-full">
        <button onClick={resetForm} type="button" className="w-5/12 py-1.5 me-2 mb-2 text-sm font-medium text-gray-900 outline-none  bg-white rounded-md border border-gray-200 hover:text-blue-700 ">Cancel</button>
        <button type="submit" className="w-5/12 py-1.5 me-2 mb-2 text-sm font-medium text-gray-900 outline-none bg-yellow-400 rounded-md border border-gray-200 hover:text-white">{action.type === 'add' ? 'Add Task' : 'Save changes'}</button>
        {action.type === 'edit' && <button onClick={deleteTask} type="button" className="py-1.5 px-5 me-2 mb-2 text-sm font-medium text-white outline-none  bg-red-500 rounded-md  hover:bg-red-600 w-11/12">Delete Task</button>}
      </div>
    </form>
  )
}
