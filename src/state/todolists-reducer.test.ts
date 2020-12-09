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