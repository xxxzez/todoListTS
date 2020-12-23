import { v1 } from 'uuid'
import { TasksStateType } from '../App'
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    todoList1,
    todoList2,
} from './todolists-reducer'

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    todolistId: string
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todolistId: string
    title: string
}

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TasksStateType = {
    [todoList1]: [
        { id: v1(), title: 'React', isDone: false },
        { id: v1(), title: 'HTML', isDone: true },
        { id: v1(), title: 'CSS', isDone: true },
    ],
    [todoList2]: [
        { id: v1(), title: 'Hooks', isDone: false },
        { id: v1(), title: 'TypeScript', isDone: true },
        { id: v1(), title: 'Redux', isDone: false },
    ],
}
export const tasksReducer = (
    state: TasksStateType = initialState,
    action: ActionsType
): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = { ...state }
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter((t) => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = { ...state }
            const tasks = state[action.todolistId]
            const newTask = {
                id: v1(),
                title: action.title,
                isDone: false,
            }
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks.map((t) =>
                t.id === action.taskId ? { ...t, isDone: action.isDone } : t
            )
            return { ...state }
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId]
            state[action.todolistId] = todolistTasks.map((t) =>
                t.id === action.taskId ? { ...t, title: action.title } : t
            )
            return { ...state }
        }
        case 'ADD-TODOLIST': {
            const stateCopy = { ...state }
            stateCopy[action.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST':
            const stateCopy = { ...state }
            delete stateCopy[action.id]
            return stateCopy
        default:
            return state
    }
}

export const removeTaskAC = (
    taskId: string,
    todolistId: string
): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', todolistId, taskId }
}
export const addTaskAC = (
    title: string,
    todolistId: string
): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId }
}
export const changeTaskStatusAC = (
    taskId: string,
    isDone: boolean,
    todolistId: string
): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', taskId, todolistId, isDone }
}
export const changeTaskTitleAC = (
    taskId: string,
    title: string,
    todolistId: string
): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', taskId, todolistId, title }
}
