import { TextField } from '@material-ui/core'
import React, { ChangeEvent, useState } from 'react'

export type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    return editMode ? (
        <TextField
            value={title}
            autoFocus
            onChange={changeTitle}
            onBlur={activateViewMode}
        />
    ) : (
        <span onClick={activateEditMode}>{props.title}</span>
    )
}

 export const EditableSpanMemo = React.memo(EditableSpan)