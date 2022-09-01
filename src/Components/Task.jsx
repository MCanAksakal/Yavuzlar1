import { FaCheck, FaTrashAlt, FaEdit } from "react-icons/fa";
import { useState } from "react";

export function Task({
  id,
  name,
  completed,
  edit,
  onRemove,
  onEdit,
  onEditSave,
  onChangeCompleted,
}) {
  if (edit) {
    const [hello, setHello] = useState(name);

    const handleChange = (event) => {
      setHello(event.target.value);

      console.log("value is:", event.target.value);
    };

    return (
      <li className="py-2 px-4 border-b-2 mt-4">
        <div className="flex items-center mb-4">
          <input
            type="text"
            id="message"
            name="message"
            onChange={handleChange}
            value={hello}
            placeholder={hello}
            className="w-full px-4 py-2 rounded-sm shadow-lg border border-gray-300 bg-gray-100"
          />
          <button
            className="mx-2"
            type="button"
            onClick={(e) => onEditSave(id, hello)}
          >
            <FaCheck size={16} />
          </button>
        </div>
      </li>
    );
  } else {
    return (
      <li className="py-2 px-4 border-b-2 mt-4">
        <div className="flex items-center mb-4">
          <input
            id="default-checkbox"
            type="checkbox"
            checked={completed}
            onChange={(e) => onChangeCompleted(id)}
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="default-checkbox"
            className={
              completed
                ? "mx-2 w-full text-base line-through text-gray-600 dark:text-gray-300"
                : "mx-2 w-full text-base text-gray-900 dark:text-gray-300"
            }
          >
            {name}
          </label>
          <button className="mx-2" type="button" onClick={() => onEdit(id)}>
            <FaEdit size={16} />
          </button>
          <button className="mx-2" type="button" onClick={() => onRemove(id)}>
            <FaTrashAlt size={16} />
          </button>
        </div>
      </li>
    );
  }
}
