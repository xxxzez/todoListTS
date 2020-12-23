import { IconButton } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { Checkbox } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import React, { ChangeEvent } from 'react'
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
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onCompletedClickHandler = () =>
        props.changeFilter('completed', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const deleteTodoList = () => {
        props.removeTodoList(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }
    const tasks = props.tasks.map((task) => {
        
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
    let tasksForTodoList = props.tasks
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(
            (task) => task.isDone === false
        )
    } else if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(
            (task) => task.isDone === true
        )
    }
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
