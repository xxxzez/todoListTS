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
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddItemForm } from './AddItemForm'
import './App.css'
import { AppRootStateType } from './redux/store'
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from './redux/tasks-reducer'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from './redux/todolists-reducer'
import { TodoList } from './TodoList'

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

export const App = React.memo(() => {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodoListsType>>(
        (state) => state.todolists
    )
    const tasks = useSelector<AppRootStateType, TasksStateType>(
        (state) => state.tasks
    )

    const removeTask = useCallback(function (
        taskID: string,
        todoListID: string
    ) {
        dispatch(removeTaskAC(taskID, todoListID))
    },
    [])

    const changeFilter = useCallback(function (
        newFilterValue: FilterValuesType,
        todoListID: string
    ) {
        dispatch(changeTodolistFilterAC(todoListID, newFilterValue))
    },
    [])

    const addTask = useCallback(function (title: string, todoListID: string) {
        dispatch(addTaskAC(title, todoListID))
    }, [])

    const changeTaskStatus = useCallback(function (
        id: string,
        isDone: boolean,
        todoListID: string
    ) {
        dispatch(changeTaskStatusAC(id, isDone, todoListID))
    },
    [])

    const changeTaskTitle = useCallback(function (
        id: string,
        newTitle: string,
        todoListID: string
    ) {
        dispatch(changeTaskTitleAC(id, newTitle, todoListID))
    },
    [])

    const addTodoList = useCallback(function (title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [])

    const removeTodoList = useCallback(function (id: string) {
        const action = removeTodolistAC(id)
        dispatch(action)
    }, [])

    const changeTodoListTitle = useCallback(function (
        id: string,
        newTitle: string
    ) {
        dispatch(changeTodolistTitleAC(id, newTitle))
    },
    [])

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
                    {todolists.map((tl) => {
                        let tasksForTodoList = tasks[tl.id]
                        return (
                            <Grid item>
                                <Paper style={{ padding: '15px' }}>
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
                </Grid>
            </Container>
        </div>
    )
})
