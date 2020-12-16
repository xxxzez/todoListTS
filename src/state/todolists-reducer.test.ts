import { FilterValuesType } from './../App'
import { TodoListsType } from '../App'
import { v1 } from 'uuid'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todoListsReducer,
} from './todolists-reducer'

let todolist1: string
let todolist2: string
let startState: Array<TodoListsType> = []

beforeEach(() => {
    todolist1 = v1()
    todolist2 = v1()
    startState = [
        { id: todolist1, title: 'What to learn', filter: 'all' },
        { id: todolist2, title: 'What to buy', filter: 'all' },
    ]
})

test('correct todolist should be removed', () => {
    const endState = todoListsReducer(startState, removeTodolistAC(todolist1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolist2)
})

test('correct todolist should be added', () => {
    let newTodoListTitle = 'New TodoList'

    const endState = todoListsReducer(
        startState,
        addTodolistAC(newTodoListTitle)
    )

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodoListTitle)
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    let newTodoListTitle = 'New TodoList'

    const action = changeTodolistTitleAC(todolist2, newTodoListTitle)
    const endState = todoListsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodoListTitle)
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed'

    const action = changeTodolistFilterAC(todolist2, newFilter)
    const endState = todoListsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
