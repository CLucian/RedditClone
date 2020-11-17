import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import { GlobalContext } from './GlobalState'

const paramString = window.location.search
const paramSearch = new URLSearchParams(paramString)

// will get the code for the bearer token
let code = paramSearch.get('code')

export default class Authorize extends React.Component {
    getAccessToken = () => {
        axios
            .post('/login', {
                code,
            })
            .then((response) => {
                // pass access token to GlobalState method
                this.context.setAuthState({
                    accessToken: response.data.access_token,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.getAccessToken()
    }

    render() {
        if (this.context.accessToken) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <h1>This is the authorization component</h1>
                {this.context.accessToken ? (
                    <h1 className="authorized">Reddit has authorized you!!</h1>
                ) : null}
            </div>
        )
    }
}

Authorize.contextType = GlobalContext

//gives access to methods or whatever as this.context
