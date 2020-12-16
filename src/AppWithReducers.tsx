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

import React, { useReducer } from 'react'
import { v1 } from 'uuid'
import { AddItemFormMemo } from './AddItemForm'
import './App.css'
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
} from './state/tasks-reducer'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todoListsReducer,
} from './state/todolists-reducer'
import TodoListMemo from './TodoList'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function AppWithRedux() {
    const removeTask = (taskID: string, todoListID: string) => {
        dispatchToTasks(removeTaskAC(taskID, todoListID))
    }
    const changeFilter = (
        newFilterValue: FilterValuesType,
        todoListID: string
    ) => {
        dispatchToTodolist(changeTodolistFilterAC(todoListID, newFilterValue))
    }
    const addTask = (title: string, todoListID: string) => {
        dispatchToTasks(addTaskAC(title, todoListID))
    }
    const changeTaskStatus = (
        id: string,
        isDone: boolean,
        todoListID: string
    ) => {
        dispatchToTasks(changeTaskStatusAC(id, isDone, todoListID))
    }
    const changeTaskTitle = (
        id: string,
        newTitle: string,
        todoListID: string
    ) => {
        dispatchToTasks(changeTaskTitleAC(id, newTitle, todoListID))
    }
    const addTodoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTasks(action)
        dispatchToTodolist(action)
    }
    const removeTodoList = (id: string) => {
        dispatchToTodolist(removeTodolistAC(id))
    }
    const changeTodoListTitle = (id: string, newTitle: string) => {
        dispatchToTodolist(changeTodolistTitleAC(id, newTitle))
    }

    const todoList1 = v1()
    const todoList2 = v1()

    const [todoLists, dispatchToTodolist] = useReducer(todoListsReducer, [
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

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
                    <AddItemFormMemo addItem={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
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
                                <Paper style={{ padding: '15px' }}>
                                    <TodoListMemo
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
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux
