import { v1 } from 'uuid'
import { TasksStateType, TaskType } from '../App'
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType,
    todoList1,
    todoList2,
} from './todolists-reducer'

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

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
    | SetTodolistsActionType
    | SetTasksActionType

const initialState: TasksStateType = {}
export const tasksReducer = (
    state: TasksStateType = initialState,
    action: ActionsType
): TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS': {
            const stateCopy = { ...state }
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
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
        case 'SET-TODOLISTS': {
            const stateCopy = { ...state }
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
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
export const setTasksAC = (
    tasks: Array<TaskType>,
    todolistId: string
): SetTasksActionType => {
    return { type: 'SET-TASKS', tasks: tasks, todolistId: todolistId }
}
