import { todolistsAPI } from './../api/todolists-api'
import { FilterValuesType } from '../App'
import { v1 } from 'uuid'
import { TodoListsType } from '../App'
import { TodoListType } from '../api/todolists-api'
import { Dispatch } from 'redux'

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodoListType>
}
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

export const todoList1 = v1()
export const todoList2 = v1()
const initialState: Array<TodoListsType> = [
    {
        id: todoList1,
        title: 'For today',
        filter: 'all',
    },
    {
        id: todoList2,
        title: 'For tomorrow',
        filter: 'all',
    },
]

export const todoListsReducer = (
    state: Array<TodoListsType> = initialState,
    action: ActionsType
): Array<TodoListsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter((tl) => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [
                {
                    id: action.todolistId,
                    title: action.title,
                    filter: 'all',
                },
                ...state,
            ]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find((tl) => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER':
            const todoList = state.find((tl) => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        case 'SET-TODOLISTS': {
            return action.todolists.map((tl) => {
                return {
                    ...tl,
                    filter: 'all',
                }
            })
        }
        default:
            return state
    }
}

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: id }
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title, todolistId: v1() }
}
export const changeTodolistTitleAC = (
    id: string,
    title: string
): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id, title }
}
export const changeTodolistFilterAC = (
    id: string,
    filter: FilterValuesType
): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id, filter }
}
export const setTodolistsAC = (
    todolists: Array<TodoListType>
): SetTodolistsActionType => {
    return { type: 'SET-TODOLISTS', todolists: todolists }
}

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists().then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
    }
}
