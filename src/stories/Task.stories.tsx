import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { Task, TaskPropsType } from '../Task'

export default {
    title: 'Todolist/Task',
    component: Task,
} as Meta

const removeCallback = action('Remove button inside Task clicked')
const changeStatusCallback = action('Status changed inside Task')
const changeTitleCallback = action('Title changed inside Task')

const Template: Story<TaskPropsType> = (args: TaskPropsType) => (
    <Task {...args} />
)

const baseArg = {
    removeTask: removeCallback,
    changeTaskStatus: changeStatusCallback,
    changeTaskTitle: changeTitleCallback,
}

export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {
    ...baseArg,
    task: { id: '1', title: 'React', isDone: true },
    todolistId: 'todolist1',
}
export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {
    ...baseArg,
    task: { id: '2', title: 'CSS', isDone: false },
    todolistId: 'todolist2',
}
