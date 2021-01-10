import React from 'react'
import { MasterSearchContext } from './MasterSearchProvider'
import Home from '../home.component'

class HomeWrapper extends React.Component {
    render() {
        return <Home hideNav={this.props.hideNav} query={this.context.query} />
    }
}

export default HomeWrapper

HomeWrapper.contextType = MasterSearchContext
