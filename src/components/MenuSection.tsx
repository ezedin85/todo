import { Filter } from "../models/models"
import TaskFilterPanel from "./TaskFilterPanel"
import CategoryFilterPanel from "./CategoryFilterPanel"

// Define the component props interface
interface Props {
    filter: Filter
    setFilter: React.Dispatch<React.SetStateAction<Filter>>
    activeSection: string
    setActiveSection: React.Dispatch<React.SetStateAction<string>>
}

export default function MenuSection({ filter, setFilter, activeSection, setActiveSection }: Props) {

    // Function to handle filter changes based on status and value
    function handleFilter(status: string, value: string) {
        setFilter(prev => { return { ...prev, [status]: value } })
    }

    // Function to reset the filter to default values
    function resetFilter() {
        setFilter({ status: 'all', category: 'all' })
    }

    return (
        <div className={`w-full md:w-1/4 lg:w-1/5 p-4 bg-gray-100 relative rounded-2xl sections ${activeSection === 'menu' ? 'showMenu' : 'hideMenu'}`}>

            {/* Close button for screens with a width less than 768 pixels */}
            <i onClick={() => setActiveSection('list')} className="text-red-500 text-4xl absolute -right-6 top-4 cursor-pointer mobileClose fa-solid fa-circle-xmark"></i>

            <div className="flex justify-between algin-middle my-4">
                <h2 className="text-2xl font-bold">To-Do App</h2>
            </div>

            {/* Filters */}
            <TaskFilterPanel filter={filter} handleFilter={handleFilter} />
            <CategoryFilterPanel filter={filter} handleFilter={handleFilter} />

            {/* Reset and Done buttons */}
            <button onClick={resetFilter} type="button" className="py-1.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 outline-none  bg-white rounded-md border border-gray-200 hover:text-blue-700 ">Reset Filter</button>
            <button onClick={() => setActiveSection('list')} type="button" className="py-1.5 px-5 me-2 mb-2 text-sm font-medium text-white outline-none  bg-blue-700 rounded-md doneBtn">Done</button>

        </div>
    )
}
