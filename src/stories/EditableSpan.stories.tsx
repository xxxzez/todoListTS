import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import { EditableSpan, EditableSpanPropsType } from '../EditableSpan'

export default {
    title: 'Example/EditableSpan',
    component: EditableSpan,
}

export const Template: Story<EditableSpanPropsType> = (
    props: EditableSpanPropsType
) => <EditableSpan onChange={(x) => x} title={'Type here'}  />
