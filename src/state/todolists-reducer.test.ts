import { FilterValuesType } from './../App';
import { TodoListsType } from '../App';
import { v1 } from 'uuid';
import { todoListsReducer } from './todolists-reducer';

test('correct todolist should be removed', () => {
    let todolist1 = v1()
    let todolist2 = v1()

    const startState: Array<TodoListsType> = [
        {id: todolist1, title: 'What to learn', filter: 'all'},
        {id: todolist2, title: 'What to buy', filter: 'all'}
    ]
    const endState = todoListsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolist1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolist2)
})

test('correct todolist should be added', ()=> {
    let todolist1 = v1()
    let todolist2 = v1()

    let newTodoListTitle = 'New TodoList'

    const startState: Array<TodoListsType> = [
        {id: todolist1, title: 'What to learn', filter: 'all'},
        {id: todolist2, title: 'What to buy', filter: 'all'}
    ]
    const endState = todoListsReducer(startState, {type: 'ADD-TODOLIST', title: newTodoListTitle})

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
    expect(endState[2].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    let todolist1 = v1()
    let todolist2  = v1()
    let newTodoListTitle = 'New TodoList'

    const startState: Array<TodoListsType> = [
        {id: todolist1, title: 'What to learn', filter: 'all'},
        {id: todolist2, title: 'What to buy', filter: 'all'}
    ]
    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: todolist2,
        title: newTodoListTitle
    }
    const endState = todoListsReducer(startState, action)
    
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodoListTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolist1 = v1()
    let todolist2 = v1()
    let newFilter: FilterValuesType = 'completed'

    const startState: Array<TodoListsType> = [
        {id: todolist1, title: 'What to learn', filter: 'all'},
        {id: todolist2, title: 'What to buy', filter: 'all'}
    ]
    const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolist2,
        filter: newFilter
    }
    const endState = todoListsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)

})