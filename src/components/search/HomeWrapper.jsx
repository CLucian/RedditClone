import React from 'react'
import { MasterSearchContext } from './MasterSearchProvider'
import Home from '../home.component'

class HomeWrapper extends React.Component {
    render() {
        console.log(
            'this is the query in HomeWrapper',
            this.context.HomeWrapper
        )

        return <Home hideNav={this.props.hideNav} query={this.context.query} />
    }
}

export default HomeWrapper

HomeWrapper.contextType = MasterSearchContext
