import './App.css'
import { useEffect, useState } from 'react'
import FormSection from './components/FormSection'
import ListSection from './components/ListSection'
import MenuSection from './components/MenuSection'
import { Action, Filter, Todo } from './models/models'
import { useLocalStorage } from './hooks/useLocalStorage'


function App() {

    const { getItem } = useLocalStorage('todos')
    const [todos, setTodos] = useState<Todo[]>([])
    const [action, setAction] = useState<Action>({ type: 'add', id: 0 })
    const [filter, setFilter] = useState<Filter>({ status: 'all', category: 'all' })
    const [activeSection, setActiveSection] = useState('list')


    useEffect(() => {
        const savedTodos = getItem()
        if (savedTodos) {
            setTodos(savedTodos)
        }
    }, [])


    return (
        <div className='flex justify-between p-3 border bg-gray-50'>
            <MenuSection filter={filter} setFilter={setFilter} activeSection={activeSection} setActiveSection={setActiveSection}/>
            <ListSection todos={todos} filter={filter} setTodos={setTodos} setAction={setAction} activeSection={activeSection} setActiveSection={setActiveSection}/>
            <FormSection todos={todos} setTodos={setTodos} action={action} setAction={setAction} activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>
    )
}

export default App
