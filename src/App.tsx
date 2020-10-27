import React, { useState } from "react"
import "./App.css"
import TodoList from "./TodoList"

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: 1, title: "React", isDone: false },
        { id: 2, title: "HTML", isDone: true },
        { id: 3, title: "CSS", isDone: true },
        { id: 4, title: "Hooks", isDone: false },
        { id: 5, title: "TypeScript", isDone: true },
        { id: 6, title: "Redux", isDone: false },
        { id: 7, title: "Прочитать много всего нового интересного", isDone: false },
    ])
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskID: number) => {
        const filteredTasks = tasks.filter((task) => task.id !== taskID)
        setTasks(filteredTasks)
    }

    const changeFilter = (newFilterValue: FilterValuesType) => {
        setFilter(newFilterValue)
    }

    let tasksForTodoList = tasks
    if (filter === "active") {
        tasksForTodoList = tasks.filter((task) => task.isDone === false)
    } else if (filter === "completed") {
        tasksForTodoList = tasks.filter((task) => task.isDone === true)
    }

    return (
        <div className="App">
            <h4>My TodoLists</h4>

            <div className="todoLists">
                <TodoList
                    title={"What to learn"}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                />
                <TodoList
                    title={"What to repeat"}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                />
                <TodoList
                    title={"What to remind"}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                />
            </div>
        </div>
    )
}

export default App
