import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    Paper,
    Toolbar,
    Typography,
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import React, { useState } from 'react'
import { v1 } from 'uuid'
import { AddItemForm } from './AddItemForm'
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

    const changeTaskTitle = (
        id: string,
        newTitle: string,
        todoListID: string
    ) => {
        const todoListTasks = tasks[todoListID]
        const task: TaskType | undefined = todoListTasks.find(
            (task) => task.id === id
        )
        if (task) {
            task.title = newTitle
            setTasks({ ...tasks })
        }
    }

    const removeTodoList = (id: string) => {
        setTodoLists(todoLists.filter((tl) => tl.id !== id))
        delete tasks[id]
        setTasks({ ...tasks })
    }
    const changeTodoListTitle = (id: string, newTitle: string) => {
        let todoList = todoLists.find((tl) => tl.id === id)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
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

    const addTodoList = (title: string) => {
        let newTodoListID = v1()
        let newTodoList: TodoListsType = {
            id: newTodoListID,
            title: title,
            filter: 'all',
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({
            ...tasks,
            [newTodoListID]: [],
        })
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">News</Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: '20px' }}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
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
                                <Grid item>
                                    <Paper style={{ padding: '10px' }}>
                                        <TodoList
                                            changeTaskTitle={changeTaskTitle}
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
                                            changeTodoListTitle={
                                                changeTodoListTitle
                                            }
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </div>
                </Grid>
            </Container>
        </div>
    )
}

export default App
