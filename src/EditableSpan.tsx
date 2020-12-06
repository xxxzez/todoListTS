import React, { ChangeEvent, useState } from 'react'

type EditableSpanPropsType = {
    title: string
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const activateViewMode = () => {
        setEditMode(false)
    }
    return editMode ? (
        <input
            value={title}
            autoFocus
            onChange={changeTitle}
            onBlur={activateViewMode} />
    ) : (
            <span onClick={() => setEditMode(true)}>{title}</span>
        )
} 