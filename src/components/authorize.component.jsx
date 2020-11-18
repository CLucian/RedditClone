import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import { GlobalContext } from './GlobalState'
import { generateToken } from '../queries/auth'

export default class Authorize extends React.Component {
    state = {
        isComplete: false,
    }

    getAccessToken = () => {
        const paramString = window.location.search
        const paramSearch = new URLSearchParams(paramString)
        const code = paramSearch.get('code')

        generateToken(code)
            .then((token) => {
                this.setState({ isComplete: true })
                this.context.setup(token)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.getAccessToken()
    }

    render() {
        if (this.state.isComplete) {
            return <Redirect to="/" />
        }
        return <div>authorizing...</div>
    }
}

Authorize.contextType = GlobalContext
