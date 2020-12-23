import { IconButton } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { Checkbox } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import React, { ChangeEvent, useCallback } from 'react'
import { FilterValuesType, TaskType } from './App'
import './App.css'
import { EditableSpan } from './EditableSpan'
import { AddItemForm } from './AddItemForm'

type PropsType = {
    key: string
    title: string
    tasks: Array<TaskType>
    filter: string
    id: string
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (is: string, newTitle: string) => void
    removeTodoList: (id: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
    const onAllClickHandler = useCallback(
        () => props.changeFilter('all', props.id),
        [props.changeFilter, props.id]
    )
    const onCompletedClickHandler = useCallback(
        () => props.changeFilter('completed', props.id),
        [props.changeFilter, props.id]
    )
    const onActiveClickHandler = useCallback(
        () => props.changeFilter('active', props.id),
        [props.changeFilter, props.id]
    )
    const deleteTodoList = () => {
        props.removeTodoList(props.id)
    }
    const addTask = useCallback(
        (title: string) => {
            props.addTask(title, props.id)
        },
        [props.addTask, props.id]
    )
    const changeTodoListTitle = useCallback(
        (newTitle: string) => {
            props.changeTodoListTitle(props.id, newTitle)
        },
        [props.changeTodoListTitle, props.id]
    )
    let tasksForTodoList = props.tasks

    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter((task) => task.isDone === false)
    } else if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter((task) => task.isDone === true)
    }

    const tasks = tasksForTodoList.map((task) => {
        const onClickHandler = () => props.removeTask(task.id, props.id)
        const changeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
        }
        const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(task.id, newValue, props.id)
        }
        return (
            <div key={task.id}>
                <div className="taskItem">
                    <Checkbox checked={task.isDone} onChange={changeCheckbox} />
                    <EditableSpan
                        title={task.title}
                        onChange={onChangeTitleHandler}
                    />

                    <IconButton onClick={onClickHandler}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
        )
    })

    return (
        <div className="todoList">
            <h3>
                <EditableSpan
                    title={props.title}
                    onChange={changeTodoListTitle}
                />
                <IconButton onClick={deleteTodoList}>
                    <DeleteIcon />
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask} />
            <div>{tasks}</div>
            <div className="filterButtons">
                <Button
                    variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}
                >
                    All
                </Button>
                <Button
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}
                >
                    Active
                </Button>
                <Button
                    variant={
                        props.filter === 'completed' ? 'contained' : 'text'
                    }
                    onClick={onCompletedClickHandler}
                >
                    Done
                </Button>
            </div>
        </div>
    )
})

const Task = (props: TaskType) => {
    const onClickHandler = () => props.removeTask(task.id, props.id)
    const changeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
    }
    const onChangeTitleHandler = (newValue: string) => {
        props.changeTaskTitle(task.id, newValue, props.id)
    }
    return (
        <div key={task.id}>
            <div className="taskItem">
                <Checkbox checked={task.isDone} onChange={changeCheckbox} />
                <EditableSpan
                    title={task.title}
                    onChange={onChangeTitleHandler}
                />

                <IconButton onClick={onClickHandler}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    )
}
