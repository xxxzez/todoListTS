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
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddItemFormMemo } from './AddItemForm'
import './App.css'
import { AppRootStateType } from './state/store'
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from './state/tasks-reducer'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
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
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodoListsType>>(
        (state) => state.todolists
    )
    const tasks = useSelector<AppRootStateType, TasksStateType>(
        (state) => state.tasks
    )

    const removeTask = (taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    }

    const changeFilter = (
        newFilterValue: FilterValuesType,
        todoListID: string
    ) => {
        dispatch(changeTodolistFilterAC(todoListID, newFilterValue))
    }

    const addTask = (title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }

    const changeTaskStatus = (
        id: string,
        isDone: boolean,
        todoListID: string
    ) => {
        dispatch(changeTaskStatusAC(id, isDone, todoListID))
    }

    const changeTaskTitle = (
        id: string,
        newTitle: string,
        todoListID: string
    ) => {
        dispatch(changeTaskTitleAC(id, newTitle, todoListID))
    }

    const addTodoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    const removeTodoList = (id: string) => {
        const action = removeTodolistAC(id)
        dispatch(action)
    }

    const changeTodoListTitle = (id: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
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
                    <AddItemFormMemo addItem={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl) => {
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
