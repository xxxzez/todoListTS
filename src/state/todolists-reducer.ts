import { v1 } from 'uuid';
import { TodoListsType } from '../App';

type ActionType = {
    type: string
    [key: string]: any
}

export const todoListsReducer = (state: Array<TodoListsType>, action: ActionType): Array<TodoListsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter((tl) => tl.id !== action.id)
        }
        case 'ADD-TODOLIST':{
            return [...state, {
                id: v1(),
                title: action.title,
                filter: 'all'
            }]
        }
        case 'CHANGE-TODOLIST-TITLE':{
            const todoList = state.find(tl => tl.id === action.id)
            if(todoList){
                todoList.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER':
            const todoList = state.find(tl => tl.id === action.id)
            if(todoList){
                todoList.filter = action.filter
            }
            return [...state]
        default:
            throw new Error("I don't understand this action type")
    }
}