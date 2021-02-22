import axios from 'axios'

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
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
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings,
})
export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodoListType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<
            ResponseType<{
                item: TodoListType
            }>
        >('todo-lists', { title: title })
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {
            title: title,
        })
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}`
        )
    },
}
