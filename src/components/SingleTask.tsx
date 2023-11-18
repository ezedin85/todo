import { Action, Todo } from "../models/models"

interface Params {
    todo: Todo
    handleStatus: (id: number) => void
    setAction: React.Dispatch<React.SetStateAction<Action>>
    setActiveSection: React.Dispatch<React.SetStateAction<string>>
}

export default function SingleTask({ todo, handleStatus, setAction, setActiveSection }: Params) {

    function handleEdit() {
        setAction({ type: 'edit', id: todo.id })
        setActiveSection('form')
    }

    return (
        <div key={todo.id} className="flex flex-col py-2 px-4 cursor-pointer hover:bg-slate-100" onClick={handleEdit}>
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
                    <i className="fa-solid fa-calendar-days"></i>
                    <span className={todo.completed ? 'text-blue-500' : 'text-red-500'}>{todo.completed ? '#Completed' : '#Not completed'}</span>
                    <span>created: {new Date(todo.id).toDateString()}</span>
                </span>
            </li>
        </div>
    )
}
