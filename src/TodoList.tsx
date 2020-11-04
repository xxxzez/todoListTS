import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import './App.css'
import { TaskType, FilterValuesType } from './App'

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}

function TodoList(props: PropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const addNewTaskTitle = () => {
        if (title.trim() !== '') {
            props.addTask(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
        setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addNewTaskTitle()
        }
    }
    const onAllClickHandler = () => props.changeFilter('all')
    const onCompletedClickHandler = () => props.changeFilter('completed')
    const onActiveClickHandler = () => props.changeFilter('active')

    const tasks = props.tasks.map((task) => {
        const onClickHandler = () => props.removeTask(task.id)
        const changeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked)
        }
        return (
            <li key={task.id} >
                <div className="taskItem">
                    <label className={task.isDone ? 'is-done' : ''}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={changeCheckbox}
                            
                        />
                        <span>{task.title}</span>
                    </label>
                    <div>
                        <button
                            className="waves-effect waves-light btn"
                            onClick={onClickHandler}
                        >
                            X
                        </button>
                    </div>
                </div>
            </li>
        )
    })
    return (
        <div className="todoList">
            <h5>{props.title}</h5>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    
                />
                {error && <div className="error-message">{error}</div>}
                <button
                    className="waves-effect waves-light btn"
                    onClick={addNewTaskTitle}
                >
                    Add task
                </button>
            </div>

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
                    Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList
