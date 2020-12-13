import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story } from '@storybook/react/types-6-0'

import { EditableSpan, EditableSpanPropsType } from '../EditableSpan'

export default {
    title: 'Example/EditableSpan',
    component: EditableSpan,
}

export const Template: Story<EditableSpanPropsType> = (
    props: EditableSpanPropsType
) => <EditableSpan onChange={(x) => x} title={'Type here'} />

export const EditableSpanDefault = () => (
    <EditableSpan title={'Type something'} onChange={(x) => x} />
)
export const EditableSpanExample1 = () => (
    <EditableSpan title={'Type something'} onChange={(x) => x} />
)
export const EditableSpanExample2 = () => (
    <EditableSpan title={'Type something'} onChange={(x) => x} />
)
