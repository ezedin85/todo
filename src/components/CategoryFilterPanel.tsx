import { Filter } from "../models/models"

interface Props {
    filter: Filter
    handleFilter: (status: string, value: string) => void
}

export default function CategoryFilterPanel({ filter, handleFilter }: Props) {
    return (
        <div className="my-8 ">
            <h2 className="font-semibold text-sm">Filter by Categories</h2>
            <ul className="my-2 pl-4 space-y-3 text-left text-sm text-gray-500">
                <li style={filter.category === 'personal' ? { color: 'blue', fontWeight: "bold" } : {}}
                    className="flex items-center justify-between cursor-pointer hover:text-blue-700"
                    onClick={() => handleFilter('category', 'personal')}
                >
                    <span className="flex items-center space-x-3 ">
                        <span className="w-3 bg-yellow-400 h-3"></span>
                        <span >Personal</span>
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
    )
}
