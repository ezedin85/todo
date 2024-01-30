import { Filter } from "../models/models"

interface Props {
    filter: Filter
    handleFilter: (status: string, value: string) => void
}

export default function TaskFilterPanel({ filter, handleFilter }: Props) {
    return (
        <div className="my-8">
            <h2 className="font-semibold">Filter by Tasks</h2>
            <ul className="my-2 pl-4 space-y-2 text-left text-gray-500 text-xs ">
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

    )
}
