import React, { ChangeEvent } from 'react'
import './App.css'
import { TaskType, FilterValuesType } from './App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'

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

function TodoList(props: PropsType) {
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
            <li key={task.id}>
                <div className="taskItem">
                    <label className={task.isDone ? 'is-done' : ''}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={changeCheckbox}
                        />
                    </label>
                    <EditableSpan title={task.title} onChange={onChangeTitleHandler} />
                    <div>
                        <button
                            className="waves-effect waves-light btn"
                            onClick={onClickHandler}
                        >
                            x
                        </button>
                    </div>
                </div>
            </li>
        )
    })
    return (
        <div className="todoList">
            <div className="taskItem">
                <h3>
                    <EditableSpan title={props.title} onChange={changeTodoListTitle} />
                </h3>
                <button
                    className="waves-effect waves-light btn"
                    onClick={deleteTodoList}
                >
                    x
                </button>
            </div>
            <AddItemForm addItem={addTask} />
            <ul>{tasks}</ul>
            <div className="filterButtons">
                <button
                    className="waves-effect waves-light btn"
                    onClick={onAllClickHandler}
                >
                    All
                </button>
                <button
                    className="waves-effect waves-light btn"
                    onClick={onActiveClickHandler}
                >
                    Active
                </button>
                <button
                    className="waves-effect waves-light btn"
                    onClick={onCompletedClickHandler}
                >
                    Done
                </button>
            </div>
        </div>
    )
}

export default TodoList
