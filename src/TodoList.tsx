import React, { useState } from "react"
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
        setTitle('')
    }
    return (
        <div className="todoList">
            <h5>{props.title}</h5>
            <div>
                <input
                    value={title}
                    onChange={(e) => {
                        setTitle(e.currentTarget.value)
                    }}
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
                                        onClick={() =>
                                            props.removeTask(task.id)
                                        }
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
                    onClick={() => {
                        props.changeFilter("all")
                    }}
                >
                    All
                </button>
                <button
                    className="waves-effect waves-light btn"
                    onClick={() => {
                        props.changeFilter("active")
                    }}
                >
                    Active
                </button>
                <button
                    className="waves-effect waves-light btn"
                    onClick={() => {
                        props.changeFilter("completed")
                    }}
                >
                    Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList
