import { TodoListsType } from '../App';

type ActionType = {
    type: string
    [key: string]: any
}

export const todoListsReducer = (state: Array<TodoListsType>, action: ActionType): Array<TodoListsType> => {
    switch (action.type) {
        case 'X':
            return state
        default:
            throw new Error("I don't understand this action type")
    }
}

