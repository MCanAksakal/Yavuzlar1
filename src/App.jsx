import { useEffect, useMemo, useState } from "react";

import { Form } from "./Components/Form";
import { Input } from "./Components/Input";
import { Tasks } from "./Components/Tasks";
import Logo from "../src/Assets/yavuzlar.png";

const LOCALSTORAGE_TASKS_KEY = "todolist-tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTaskName, setSearchTaskName] = useState("");

  const onAddTask = (newTask) => {
    setTasks((currentState) => [...currentState, newTask]);
    setSearchTaskName("");
  };

  const onRemoveTask = (taskId) => {
    setTasks((currentState) =>
      currentState.filter((task) => task.id !== taskId)
    );
  };

  const onEditTask = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    const editTask = [...tasks];

    editTask[taskIndex].edit = true;

    setTasks(editTask);
    console.log(editTask);
  };

  const onEditSaveTask = (taskId, Hello) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    const editTask = [...tasks];

    editTask[taskIndex].edit = false;
    editTask[taskIndex].name = Hello;

    setTasks(editTask);
  };

  const onChangeCompleted = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    const updatedTask = [...tasks];
    updatedTask[taskIndex].completed = !updatedTask[taskIndex].completed;

    setTasks(updatedTask);
  };

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(LOCALSTORAGE_TASKS_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    const tasksLocal = localStorage.getItem(LOCALSTORAGE_TASKS_KEY);
    tasksLocal && setTasks(JSON.parse(tasksLocal));
    setIsLoading(false);
  }, []);

  const handleTermSearch = (e) => {
    const valueTerm = e.target.value.toLocaleLowerCase();
    setSearchTaskName(valueTerm);
  };

  const totalTasks = useMemo(() => {
    return tasks.length;
  }, [tasks]);

  const totalCompletedTasks = useMemo(() => {
    return tasks.filter((task) => task.completed).length;
  });

  return (
    <div>
      <div className="w-2/3 m-auto">
        <div className="mx-8 my-6 mb-12">
          <div className="flex justify-around w-full">
            <div className="item w-auto h-auto">
              <div className="w-24">
                <img
                  className="max-w-full h-auto"
                  src={Logo}
                  alt="image description"
                />
              </div>
            </div>
            <div className="item w-full mt-4 ml-8 h-auto">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                To-Do List
              </h1>
            </div>
          </div>
        </div>

        <div class="flex my-2">
          <div class="item w-full h-auto"></div>
          <div class="item w-full h-auto"></div>
          <div class="item w-full h-auto"></div>
          <div class="item w-full h-auto">
            <div class="relative">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>

              <Input
                type="text"
                value={searchTaskName}
                onChange={handleTermSearch}
                placeholder="Search for Task"
                class="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <Form onSubmit={onAddTask} />

        <hr />

        <Tasks
          tasks={tasks}
          searchTaskName={searchTaskName}
          onRemoveTask={onRemoveTask}
          onChangeCompletedTask={onChangeCompleted}
          onEditTask={onEditTask}
          onEditSaveTask={onEditSaveTask}
        />

        <footer className="fixed bottom-0 left-0 z-20 p-4 w-full bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2022 Yavuzlar Takımı. Mehmet Can Aksakal.
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
  );
}
