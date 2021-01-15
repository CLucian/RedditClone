import React from 'react'
import { MasterSearchContext } from './MasterSearchProvider'
import Home from '../home.component'

// Home Wrapper's purpose is to pass query as a prop to Home
// The reason we do this is because componentDidUpdate in Home only works from props/state
// Therefore we need to pass query down to the child (home) to use componentDidUpdate

class HomeWrapper extends React.Component {
    render() {
        return <Home query={this.context.query} />
    }
}

export default HomeWrapper

HomeWrapper.contextType = MasterSearchContext
