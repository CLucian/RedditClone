import React from 'react'

import { GlobalContext } from './GlobalState'

export default class About extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello from the About page</h1>
            </div>
        )
    }
}

About.contextType = GlobalContext
