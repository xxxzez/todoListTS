import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import { v1 } from 'uuid'
import { AppRootStateType } from '../redux/store'
import { tasksReducer } from '../redux/tasks-reducer'
import { todoListsReducer } from '../redux/todolists-reducer'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer,
})

const todoList1 = v1()
const todoList2 = v1()
const initialGlobalState = {
    todolists: [
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
    ],
    tasks: {
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
    },
}

export const storyBookStore = createStore(
    rootReducer,
    initialGlobalState as AppRootStateType
)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
