import { FaTrashAlt, FaEdit } from 'react-icons/fa'

export function Task({ id, name, completed, onRemove, onEdit, onChangeCompleted }) {
    return (
        <li className="py-2 px-4 border-b-2 mt-4">
            <div className="flex items-center mb-4">
                <input id="default-checkbox" type="checkbox"
                    checked={completed}
                    onChange={e => onChangeCompleted(id)} value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="default-checkbox" className={completed ? "mx-2 w-full text-base line-through text-gray-600 dark:text-gray-300" : "mx-2 w-full text-base text-gray-900 dark:text-gray-300"}>{name}</label>
                <button
                    className="mx-2"
                    type="button"
                    onClick={() => onEdit(id)}
                >
                    <FaEdit size={16} />
                </button>
                <button
                    className="mx-2"
                    type="button"
                    onClick={() => onRemove(id)}
                >
                    <FaTrashAlt size={16} />
                </button>
            </div>
        </li>
    )
}