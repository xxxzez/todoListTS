import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import './App.css'
import { TaskType, FilterValuesType } from './App'

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
    const tasks = props.tasks.map((task) => {
        const onClickHandler = () => props.removeTask(task.id, props.id)
        const changeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
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
                        <span>{task.title}</span>
                    </label>
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
                <h5>{props.title}</h5>
                <button
                    className="waves-effect waves-light btn"
                    onClick={deleteTodoList}
                >
                    x
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

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title)
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
            addItem()
        }
    }
    return (
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            {error && <div className="error-message">{error}</div>}
            <button
                className="waves-effect waves-light btn"
                onClick={addItem}
            >
                Add task
            </button>
        </div>
    )
}

export default TodoList
