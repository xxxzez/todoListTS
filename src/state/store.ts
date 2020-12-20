import { tasksReducer } from './tasks-reducer'
import { todoListsReducer } from './todolists-reducer'
import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer,
})
export const store = createStore(rootReducer, composeWithDevTools())
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
