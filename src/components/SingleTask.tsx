import { Action, Todo } from "../models/models"

// Define the component props interface
interface Params {
    todo: Todo
    handleStatus: (id: number) => void
    setAction: React.Dispatch<React.SetStateAction<Action>>
    setActiveSection: React.Dispatch<React.SetStateAction<string>>
    activeTask: number
    setActiveTask: React.Dispatch<React.SetStateAction<number>>
}

export default function SingleTask({ todo, handleStatus, setAction, setActiveSection, activeTask, setActiveTask }: Params) {

    // Function to handle the 'Edit' action for a task
    function handleEdit() {
        setAction({ type: 'edit', id: todo.id })
        setActiveSection('form')
        setActiveTask(todo.id)
    }

    // Function to determine the background color based on whether the task is active <being edited>
    function isActive(id: number) {
        if (id === activeTask) {
            console.log(activeTask);
            return 'bg-slate-200'
        }
        return 'bg-transparent'
    }

    return (
        // Task container with click and hover interactions
        <div key={todo.id} className={`flex flex-col py-2 px-4 cursor-pointer rounded-md hover:bg-slate-200 ${isActive(todo.id)}`} onClick={handleEdit}>
            <div className="flex items-center justify-between">
                <dt style={todo.completed ? { textDecoration: 'line-through' } : {}} className="font-medium text-sm">{todo.title}</dt>
                <input type="checkbox" onChange={() => handleStatus(todo.id)} checked={todo.completed} onClick={(e) => { e.stopPropagation() }} />
            </div>
            <li className="flex items-center text-xs gap-4 pl-4">
                <span className="flex items-center space-x-1">
                    <span className={`w-3 ${todo.category === 'work' ? 'bg-red-400' : 'bg-yellow-400'} h-3`}></span>
                    <span>{todo.category}</span>
                </span>
                <span className="flex items-center space-x-4">
                    <span className={`${todo.completed ? 'text-blue-500' : 'text-red-500' } hidden sm:block `}>{todo.completed ? '#Completed' : '#Not completed'}</span>
                    <span className="flex gap-1">
                        <i className="fa-solid fa-calendar-days"></i>
                        <span> {new Date(todo.id).toDateString()}</span>
                    </span>
                </span>
            </li>
        </div>
    )
}
