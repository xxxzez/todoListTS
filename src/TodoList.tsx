import { IconButton } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import React, { useCallback, useEffect } from 'react'
import { FilterValuesType } from './App'
import './App.css'
import { EditableSpan } from './EditableSpan'
import { AddItemForm } from './AddItemForm'
import { Task } from './Task'
import { useDispatch } from 'react-redux'
import { fetchTasksTC } from './redux/tasks-reducer'
import { TaskStatuses, TaskType } from './api/todolists-api'

type PropsType = {
    key: string
    title: string
    tasks: Array<TaskType>
    filter: string
    id: string

    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (is: string, newTitle: string) => void
    removeTodoList: (id: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

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
        tasksForTodoList = props.tasks.filter(
            (task) => task.status === TaskStatuses.New
        )
    } else if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(
            (task) => task.status === TaskStatuses.Completed
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
            <div>
                {tasksForTodoList.map((task) => (
                    <Task
                        task={task}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        todolistId={props.id}
                        key={task.id}
                    />
                ))}
            </div>
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
