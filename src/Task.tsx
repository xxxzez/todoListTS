import { Checkbox, IconButton } from '@material-ui/core'
import React, { ChangeEvent, useCallback } from 'react'
import { EditableSpan } from './EditableSpan'
import DeleteIcon from '@material-ui/icons/Delete'
import { TaskStatuses, TaskType } from './api/todolists-api'

export type TaskPropsType = {
    removeTask: (taskID: string, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () =>
        props.removeTask(props.task.id, props.todolistId)
    const changeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(
            props.task.id,
            e.currentTarget.checked,
            props.todolistId
        )
    }

    const onChangeTitleHandler = useCallback(
        (newValue: string) => {
            props.changeTaskTitle(props.task.id, newValue, props.todolistId)
        },
        [props.task.id, props.changeTaskTitle, props.todolistId]
    )
    return (
        <div key={props.task.id}>
            <div className="taskItem">
                <Checkbox
                    checked={props.task.status === TaskStatuses.Completed}
                    onChange={changeCheckbox}
                />
                <EditableSpan
                    title={props.task.title}
                    onChange={onChangeTitleHandler}
                />

                <IconButton onClick={onClickHandler}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    )
})
