import React, { useState } from 'react'
import { v1 } from 'uuid'
import './App.css'
import TodoList from './TodoList'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: 'React', isDone: false },
        { id: v1(), title: 'HTML', isDone: true },
        { id: v1(), title: 'CSS', isDone: true },
        { id: v1(), title: 'Hooks', isDone: false },
        { id: v1(), title: 'TypeScript', isDone: true },
        { id: v1(), title: 'Redux', isDone: false },
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskID: string) => {
        const filteredTasks = tasks.filter((task) => task.id !== taskID)
        setTasks(filteredTasks)
    }

    const changeFilter = (newFilterValue: FilterValuesType) => {
        setFilter(newFilterValue)
    }

    const addTask = (title: string) => {
        const task = {
            id: v1(),
            title: title,
            isDone: false,
        }
        const newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    let tasksForTodoList = tasks
    if (filter === 'active') {
        tasksForTodoList = tasks.filter((task) => task.isDone === false)
    } else if (filter === 'completed') {
        tasksForTodoList = tasks.filter((task) => task.isDone === true)
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        const task: TaskType | undefined = tasks.find((task) => task.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    return (
        <div className="App">
            <h4>My TodoLists</h4>

            <div className="todoLists">
                <TodoList
                    title={'What to learn'}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                />
            </div>
        </div>
    )
}

export default App
