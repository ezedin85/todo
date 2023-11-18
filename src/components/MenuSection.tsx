import { Filter } from "../models/models"

interface Props {
    filter: Filter
    setFilter: React.Dispatch<React.SetStateAction<Filter>>
    activeSection: string
    setActiveSection: React.Dispatch<React.SetStateAction<string>>
}

export default function MenuSection({ filter, setFilter, activeSection, setActiveSection }: Props) {

    function handleFilter(status: string, value: string) {
        setFilter(prev => { return { ...prev, [status]: value } })
    }

    function resetFilter() {
        setFilter({ status: 'all', category: 'all' })
    }

    return (
        <div className={`w-full lg:w-1/5 p-4 bg-gray-100 relative rounded-2xl sections ${activeSection === 'menu' ? 'showMenu' : 'hideMenu'}`}>

            <i onClick={() => setActiveSection('list')} className="text-red-500 text-4xl absolute -right-6 top-8 cursor-pointer mobileClose fa-solid fa-circle-xmark"></i>

            <div className="flex justify-between algin-middle my-4">
                <h2 className="text-2xl font-bold">Aiqem To-do</h2>
            </div>

            <div className="my-8">
                <h2 className="font-semibold">Filter by Tasks</h2>
                <ul className="my-2 pl-4 space-y-2 text-left text-sm text-gray-500 ">
                    <li
                        style={filter.status === 'completed' ? { color: 'blue', fontWeight: "bold" } : {}}
                        className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer hover:text-blue-700"
                        onClick={() => handleFilter('status', 'completed')}
                    >
                        <i className="fa-solid fa-circle-check"></i>
                        <span>Completed</span>
                    </li>
                    <li
                        style={filter.status === 'non-completed' ? { color: 'blue', fontWeight: "bold" } : {}}
                        className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer hover:text-blue-700"
                        onClick={() => handleFilter('status', 'non-completed')}
                    >
                        <i className="fa-regular fa-circle-check"></i>
                        <span>Not Completed</span>
                    </li>
                </ul>
            </div>

            <div className="my-8 ">
                <h2 className="font-semibold">Filter by Categories</h2>
                <ul className="my-2 pl-4 space-y-3 text-left text-sm text-gray-500">
                    <li style={filter.category === 'personal' ? { color: 'blue', fontWeight: "bold" } : {}}
                        className="flex items-center justify-between cursor-pointer hover:text-blue-700"
                        onClick={() => handleFilter('category', 'personal')}
                    >
                        <span className="flex items-center space-x-3 ">
                            <span className="w-3 bg-yellow-400 h-3"></span>
                            <span>Personal</span>
                        </span>
                    </li>
                    <li style={filter.category === 'work' ? { color: 'blue', fontWeight: "bold" } : {}}
                        className="flex items-center justify-between cursor-pointer hover:text-blue-700"
                        onClick={() => handleFilter('category', 'work')}
                    >
                        <span className="flex items-center space-x-3">
                            <span className="w-3 bg-red-400 h-3"></span>
                            <span>Work</span>
                        </span>
                    </li>
                </ul>
            </div>

            <button onClick={resetFilter} type="button" className="py-1.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 outline-none  bg-white rounded-md border border-gray-200 hover:text-blue-700 ">Reset Filter</button>
            <button onClick={() => setActiveSection('list')} type="button" className="py-1.5 px-5 me-2 mb-2 text-sm font-medium text-white outline-none  bg-blue-700 rounded-md doneBtn">Done</button>


        </div>
    )
}
