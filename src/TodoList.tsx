import React from "react"
import "./App.css"
import { TaskType, FilterValuesType } from "./App"

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
}

function TodoList(props: PropsType) {
    return (
        <div className="todoList">
            <h5>{props.title}</h5>
            <div>
                <input />
                <button className="waves-effect waves-light btn">
                    Add task
                </button>
            </div>
            <ul>
                {props.tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} />
                            <span>{task.title}</span>
                            <button
                                className="waves-effect waves-light btn"
                                onClick={() => props.removeTask(task.id)}
                            >
                                X
                            </button>
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
