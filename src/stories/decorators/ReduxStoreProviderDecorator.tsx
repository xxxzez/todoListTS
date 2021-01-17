import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import { v1 } from 'uuid'
import { AppRootStateType } from '../../redux/store'
import { tasksReducer } from '../../redux/tasks-reducer'
import { todoListsReducer } from '../../redux/todolists-reducer'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer,
})
const todoList1 = v1()
const todoList2 = v1()
const initialGlobalState = {
    todolists: [
        { id: todoList1, title: 'What to destroy', filter: 'all' },
        { id: todoList2, title: 'Who to kill', filter: 'all' },
    ],
    tasks: {
        [todoList1]: [
            { id: v1(), title: 'Moscow', isDone: false },
            { id: v1(), title: 'Pyongyang', isDone: true },
        ],
        [todoList2]: [
            { id: v1(), title: 'Kim Jong-un', isDone: false },
            { id: v1(), title: 'Lukashenko', isDone: true },
        ],
    },
}

export const storyBookStore = createStore(
    rootReducer,
    initialGlobalState as AppRootStateType
)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>{storyFn()}</Provider>
)
