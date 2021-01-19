import React, { useEffect, useState } from 'react'
import { todolistsAPI } from '../api/todolists-api'

export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists().then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [newTodolistTitle, setNewTodolistTitle] = useState<string>('')
    const createNewTodolist = () => {
        todolistsAPI.createTodolist(newTodolistTitle).then((res) => {
            setState(res.data)
        })
    }
    return (
        <div>
            {JSON.stringify(state)}
            <input
                type="text"
                placeholder={'newTodolistTitle'}
                value={newTodolistTitle}
                onChange={(e) => {
                    setNewTodolistTitle(e.currentTarget.value)
                }}
            />
            <button onClick={createNewTodolist}>Create new TodoList</button>
        </div>
    )
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTodolist = () => {
        todolistsAPI.deleteTodolist(todolistId).then((res) => {
            setState(res.data)
        })
    }
    return (
        <div>
            {JSON.stringify(state)}
            <input
                type="text"
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}
            />
            <button onClick={deleteTodolist}>Delete Todolist</button>
        </div>
    )
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [newTitle, setNewTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const updateTodolistTitle = () => {
        todolistsAPI.updateTodolist(todolistId, newTitle).then((res) => {
            setState(res.data)
        })
    }
    return (
        <div>
            {JSON.stringify(state)}
            <input
                placeholder={'newTitle'}
                value={newTitle}
                onChange={(e) => {
                    setNewTitle(e.currentTarget.value)
                }}
            />
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}
            />
            <button onClick={updateTodolistTitle}>UpdateTodolistTitle</button>
        </div>
    )
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const getTasks = () => {
        todolistsAPI.getTasks(todolistId).then((res) => {
            setState(res.data)
        })
    }
    return (
        <div>
            {JSON.stringify(state)}
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}
            />
            <button onClick={getTasks}>Get Tasks</button>
        </div>
    )
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
            setState(res.data)
        })
    }
    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input
                    placeholder={'todolistId'}
                    value={todolistId}
                    onChange={(e) => {
                        setTodolistId(e.currentTarget.value)
                    }}
                />
                <input
                    placeholder={'taskId'}
                    value={taskId}
                    onChange={(e) => {
                        setTaskId(e.currentTarget.value)
                    }}
                />
                <button onClick={deleteTask}>Delete Task</button>
            </div>
        </div>
    )
}
