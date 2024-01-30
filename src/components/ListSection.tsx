import { useLocalStorage } from "../hooks/useLocalStorage";
import { Action, Filter, Todo } from "../models/models";
import SingleTask from "./SingleTask";

// Define the component props interface
interface Params {
  todos: Todo[]
  filter: Filter
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  setAction: React.Dispatch<React.SetStateAction<Action>>
  setActiveSection: React.Dispatch<React.SetStateAction<string>>
  activeTask: number
  setActiveTask: React.Dispatch<React.SetStateAction<number>>
}

// ListSection component for displaying and managing tasks
export default function ListSection({ todos, filter, setTodos, setAction, setActiveSection, activeTask, setActiveTask }: Params) {

  // Custom hook to handle local storage
  const { setItem } = useLocalStorage('todos')

  // Function to toggle task completion status
  function handleStatus(id: number) {
    let updatedTodos: Todo[] = []
    updatedTodos = todos.map(value => { return value.id === id ? { ...value, completed: !value.completed } : value })
    setItem(updatedTodos)
    setTodos(updatedTodos)
  }

  // Function to filter todos based on status and category
  function filteredTodos() {
    return todos.filter(todo =>
      (filter.status === 'all' || todo.completed === (filter.status === 'completed')) &&
      (filter.category === 'all' || todo.category === filter.category)
    )
  }

  // Function to generate a message based on the current filter settings
  function filterMessage() {
    return (filter.status !== 'all' ? filter.status : '') + ' ' + (filter.category !== 'all' ? filter.category : '') + ' Tasks'
  }

  return (
    <div className={`w-full md:w-3/5 lg:w-1/2 sections`} >

      {/* Section header with filter information and task count */}
      <div className="flex items-center gap-5" >
        <h2 className="xl:text-3xl font-bold">{filterMessage()}</h2>
        <span className="border px-3 py-1 rounded-lg">{filteredTodos().length}</span>
      </div>

      {/* Mobile menu and add task button */}
      <div className="flex justify-between items-center gap-2 text-gray-500 p-2 mt-2 onlyForMobile">
        <i onClick={() => setActiveSection('menu')} className="fa-solid text-red-500 fa-bars text-2xl cursor-pointer "></i>
        <button onClick={() => setActiveSection('form')} type="button" className="px-4 py-1.5 me-2 mb-2 text-xs font-medium text-white outline-none  bg-red-500 rounded-md  ">Add Task</button>
      </div>

      <div className="flex items-center gap-2 text-gray-500 border border-gray-200 p-2 mt-8">
        <span>+</span>
        <dt className="font-medium">Tasks List</dt>
      </div>

      {/* Display tasks or show message if no tasks match the filter */}
      <dl className=" text-gray-500 divide-y divide-gray-200">

        {
          filteredTodos().length === 0 &&
          <div className="my-4  text-xs">
            No <span className="text-red-500"> {filterMessage()}</span> Found
          </div>
        }
        {
          filteredTodos().map((todo: Todo) => {
            return (
              <SingleTask
                todo={todo}
                handleStatus={handleStatus}
                setAction={setAction}
                setActiveSection={setActiveSection}
                key={todo.id}
                activeTask={activeTask}
                setActiveTask={setActiveTask}
              />
            )
          })
        }
      </dl>

    </div>
  )
}
