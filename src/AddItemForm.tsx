import Button from '@material-ui/core/Button/Button'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import './App.css'

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
        setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addItem()
        }
    }
    return (
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            {error && <div className="error-message">{error}</div>}
            <Button variant={"contained"} color={"primary"} className="waves-effect waves-light btn" onClick={addItem}>
                Add task
            </Button>
        </div>
    )
}
