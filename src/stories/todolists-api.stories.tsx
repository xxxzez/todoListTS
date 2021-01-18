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
    useEffect(() => {
        todolistsAPI.createTodolist('s').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '0afc49bf-1a60-4eac-96f9-e23b48861218'
        todolistsAPI.deleteTodolist(todoListId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = 'f07e7866-c865-4778-8f33-9498426cc43c'
        const title = 'dddd'
        todolistsAPI.updateTodolist(todoListId, title).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'f07e7866-c865-4778-8f33-9498426cc43c'
        todolistsAPI.getTasks(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

// export const DeleteTask = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todoListId = '0afc49bf-1a60-4eac-96f9-e23b48861218'
//         const taskId = ''
//         todolistsAPI.deleteTask(todoListId, taskId).then((res) => {
//             setState(res.data)
//         })
//     }, [])

//     return <div> {JSON.stringify(state)}</div>
// }

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTask = todolistsAPI
        .deleteTask(todolistId, taskId)
        .then((res) => {
            setState(res.data)
        })

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input
                    type="text"
                    placeholder={'todolistId'}
                    value={todolistId}
                    onChange={(e) => {
                        setTodolistId(e.currentTarget.value)
                    }}
                />
                <input
                    type="text"
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
