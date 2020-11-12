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

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
function App() {
    const removeTask = (taskID: string, todoListID: string) => {
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter((t) => t.id !== taskID)
        setTasks({ ...tasks })
    }

    const changeFilter = (
        newFilterValue: FilterValuesType,
        todoListID: string
    ) => {
        const todoList = todoLists.find((tl) => tl.id === todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }

    const addTask = (title: string, todoListID: string) => {
        const task = {
            id: v1(),
            title: title,
            isDone: false,
        }
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = [task, ...todoListTasks]
        setTasks({ ...tasks })
    }

    const changeTaskStatus = (
        id: string,
        isDone: boolean,
        todoListID: string
    ) => {
        const todoListTasks = tasks[todoListID]
        const task: TaskType | undefined = todoListTasks.find(
            (task) => task.id === id
        )
        if (task) {
            task.isDone = isDone
            setTasks({ ...tasks })
        }
    }

    const removeTodoList = (id: string) => {
        setTodoLists(todoLists.filter((tl) => tl.id !== id))
        delete tasks[id]
        setTasks({ ...tasks })
    }

    type TodoListsType = {
        id: string
        title: string
        filter: FilterValuesType
    }

    const todoList1 = v1()
    const todoList2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {
            id: todoList1,
            title: 'For today',
            filter: 'all',
        },
        {
            id: todoList2,
            title: 'For tomorrow',
            filter: 'all',
        },
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoList1]: [
            { id: v1(), title: 'React', isDone: false },
            { id: v1(), title: 'HTML', isDone: true },
            { id: v1(), title: 'CSS', isDone: true },
        ],
        [todoList2]: [
            { id: v1(), title: 'Hooks', isDone: false },
            { id: v1(), title: 'TypeScript', isDone: true },
            { id: v1(), title: 'Redux', isDone: false },
        ],
    })

    return (
        <div className="App">
            <h4>My TodoLists</h4>

            <div className="todoLists">
                {todoLists.map((tl) => {
                    const allTodoListTasks = tasks[tl.id]
                    let tasksForTodoList = allTodoListTasks
                    if (tl.filter === 'active') {
                        tasksForTodoList = allTodoListTasks.filter(
                            (task) => task.isDone === false
                        )
                    } else if (tl.filter === 'completed') {
                        tasksForTodoList = allTodoListTasks.filter(
                            (task) => task.isDone === true
                        )
                    }
                    return (
                        <TodoList
                            key={tl.id}
                            filter={tl.filter}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            removeTodoList={removeTodoList}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default App
