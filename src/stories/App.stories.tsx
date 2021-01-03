import React from 'react'
import { App } from '../App'
import { ReduxStoreProviderDecorator } from './ReduxStoreProviderDecorator'

export default {
    title: 'App',
    component: App,
    decorators: [ReduxStoreProviderDecorator],
}

// const changeCallback = action('Value changed')

export const AppExample = () => {
    return <App />
}
