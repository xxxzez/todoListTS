import axios from 'axios'

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D> = {
    resultCode: number
    messages: string[]
    data: D
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}
type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '06e5810a-0410-4b5f-98c9-d18a1ae87df4',
    },
}

export const todolistsAPI = {
    getTodolists() {
        return axios.get<Array<TodoListType>>(
            'https://social-network.samuraijs.com/api/1.1/todo-lists',
            settings
        )
    },
    createTodolist(title: string) {
        return axios.post<
            ResponseType<{
                item: TodoListType
            }>
        >(
            'https://social-network.samuraijs.com/api/1.1/todo-lists',
            { title: title },
            settings
        )
    },
    deleteTodolist(id: string) {
        return axios.delete<ResponseType<{}>>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            settings
        )
    },
    updateTodolist(id: string, title: string) {
        return axios.put<ResponseType<{}>>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            { title: title },
            settings
        )
    },
    getTasks(todolistId: string) {
        return axios.get(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
            settings
        )
    },
}
