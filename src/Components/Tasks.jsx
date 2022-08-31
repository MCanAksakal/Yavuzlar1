import { useMemo } from 'react'

import { Task } from './Task'
import { BoxAlert } from './BoxAlert'

export function Tasks({ tasks, searchTaskName, onRemoveTask, onChangeCompletedTask, onEditTask }) {

    const isVisibleTask = (task) => {
        const taskName = task.name.toLocaleLowerCase()
        return taskName.includes(searchTaskName)
    }

    const stateTasks = useMemo(() => {
        if (tasks.length === 0) {
            return 'empty'
        } else if (!tasks.some(task => isVisibleTask(task))) {
            return 'search-empty'
        }

        return 'default'

    }, [tasks, searchTaskName])

    if (stateTasks === 'empty') {
        return <BoxAlert type={stateTasks} />
    }

    if (stateTasks === 'search-empty') {
        return <BoxAlert type="warning" />
    }

    return (
        <ul className="space-y-1 list-none list-inside text-gray-500 dark:text-gray-400">
            {tasks.map(task => isVisibleTask(task) && (
                <Task
                    {...task}
                    key={task.id}
                    onRemove={onRemoveTask}
                    onEdit={onEditTask}
                    onChangeCompleted={onChangeCompletedTask}
                />
            ))}
        </ul>
    )
}