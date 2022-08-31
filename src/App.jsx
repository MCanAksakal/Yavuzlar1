import { useEffect, useMemo, useState } from "react"

import { Form } from './Components/Form'
import { Input } from "./Components/Input"
import { Tasks } from './Components/Tasks'
import Logo from "../src/Assets/yavuzlar.png";


const LOCALSTORAGE_TASKS_KEY = 'todolist-tasks'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTaskName, setSearchTaskName] = useState('')

  const onAddTask = (newTask) => {
    setTasks(currentState => [...currentState, newTask])
    setSearchTaskName('')
  }

  const onRemoveTask = (taskId) => {
    setTasks(currentState => currentState.filter(task => task.id !== taskId))
  }

  const onEditTask = (taskId) => {
    let newEditTask = tasks.find((elem) => {
      return elem.id === taskId
    })
    console.log(newEditTask)
  }

  const onChangeCompleted = (taskId) => {
    const taskIndex = tasks.findIndex(task => task.id === taskId)

    const updatedTask = [...tasks]
    updatedTask[taskIndex].completed = !updatedTask[taskIndex].completed

    setTasks(updatedTask)
  }

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(LOCALSTORAGE_TASKS_KEY, JSON.stringify(tasks))
    }
  }, [tasks])

  useEffect(() => {
    const tasksLocal = localStorage.getItem(LOCALSTORAGE_TASKS_KEY)
    tasksLocal && setTasks(JSON.parse(tasksLocal))
    setIsLoading(false)
  }, [])

  const handleTermSearch = (e) => {
    const valueTerm = e.target.value.toLocaleLowerCase()
    setSearchTaskName(valueTerm)
  }

  const totalTasks = useMemo(() => {
    return tasks.length
  }, [tasks])

  const totalCompletedTasks = useMemo(() => {
    return tasks.filter(task => task.completed).length
  })

  return (
    <div>
      <div className="w-2/3 m-auto">
        <div className="mx-8 my-6 mb-12">
          <div className="flex justify-around w-full">
            <div className="item w-auto h-auto">
              <div className="w-24">
                <img className="max-w-full h-auto" src={Logo} alt="image description" />
              </div>
            </div>
            <div className="item w-full mt-4 ml-8 h-auto">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">To-Do List</h1>
            </div>
          </div>
        </div>

        <Form onSubmit={onAddTask} />

        <hr />

        <Input
          type="text"
          value={searchTaskName}
          onChange={handleTermSearch}
          placeholder="Search for Task"
        />


        <Tasks
          tasks={tasks}
          searchTaskName={searchTaskName}
          onRemoveTask={onRemoveTask}
          onChangeCompletedTask={onChangeCompleted}
          onEditTask={onEditTask}
        />

        <footer className="fixed bottom-0 left-0 z-20 p-4 w-full bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 Yavuzlar Takımı. Mehmet Can Aksakal.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              Total Tasks:
              <span className="px-1">{totalTasks}</span>
            </li>
            <li className="ml-8 mr-4">
              Total Tasks (Completed):
              <span className="px-1">{totalCompletedTasks}</span>
            </li>
          </ul>
        </footer>
      </div>

    </div>
  )
}