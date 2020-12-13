import { IconButton, TextField } from '@material-ui/core'
import { ControlPoint } from '@material-ui/icons'
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
            <TextField
                error={!!error}
                helperText={error}
                label={'Type here'}
                variant={'outlined'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <IconButton
                color={'primary'}
                className="waves-effect waves-light btn"
                onClick={addItem}
            >
                <ControlPoint />
            </IconButton>
        </div>
    )
}

export const AddItemFormMemo = React.memo(AddItemForm)