import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import "./App.css"
import { TaskType, FilterValuesType } from "./App"

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
    addTask: (title: string) => void
}

function TodoList(props: PropsType) {
    const [title, setTitle] = useState("")
    const addNewTaskTitle = () => {
        props.addTask(title)
        setTitle("")
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
        setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addNewTaskTitle()
        }
    }
    const onAllClickHandler = () => props.changeFilter("all")
    const onCompletedClickHandler = () => props.changeFilter("completed")
    const onActiveClickHandler = () => props.changeFilter("active")

    return (
        <div className="todoList">
            <h5>{props.title}</h5>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button
                    className="waves-effect waves-light btn"
                    onClick={addNewTaskTitle}
                >
                    Add task
                </button>
            </div>
            <ul>
                {props.tasks.map((task) => {
                    const onClickHandler = () => props.removeTask(task.id)
                    return (
                        <li key={task.id}>
                            <div className="taskItem">
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={task.isDone}
                                    />
                                    <span>{task.title}</span>
                                </div>
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
                })}
            </ul>
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
