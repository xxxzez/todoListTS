import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { App } from '../App'

export default {
    title: 'Todolist/App',
    component: App,
    argTypes: {
        onChange: {
            description: 'Changed value editable span',
        },
        title: {
            defaultValue: 'HTML',
            description: 'Start value to editable span',
        },
    },
} as Meta

const Template: Story = () => <App />

export const AppExample = Template.bind({})
