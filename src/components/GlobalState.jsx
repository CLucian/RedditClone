import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import {
    getAccessToken,
    setAccessToken,
    clearAccessToken,
} from '../utils/login'
import { fetchProfile } from '../queries/auth'
import { setupAxios } from '../queries/axios'

export const GlobalContext = React.createContext()

export const STATUS = {
    INAUTHENTICATED: 'INAUTHENTICATED',
    // is fetching the profile - they have a token, just validating that it works
    // this is to prevent showing login OR app while we're validating the token
    AUTHENTICATING: 'AUTHENTICATING',
    // profile has been fetched, user is good to go
    AUTHENTICATED: 'AUTHENTICATED',
}

class GlobalState extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accessToken: null,
            userData: null,
            status: null,
        }
    }

    componentDidMount() {
        const token = getAccessToken()
        if (token) {
            this.setup(token)
        } else {
            this.setState({ status: STATUS.INAUTHENTICATED })
        }
    }

    setup = (token) => {
        this.setState({ status: STATUS.AUTHENTICATING })

        fetchProfile(token)
            .then((profile) => {
                // store in local storage
                setAccessToken(token)

                // create axios instance with token
                setupAxios(token)

                // update state
                this.setState({
                    accessToken: token,
                    userData: profile,
                    status: STATUS.AUTHENTICATED,
                })
            })
            .catch((err) => {
                // token has expired, invalidate
                this.invalidate()
            })
    }

    invalidate = () => {
        clearAccessToken()
        this.setState({
            accessToken: null,
            userData: null,
            status: STATUS.INAUTHENTICATED,
        })
    }

    setGlobalState = (accessToken) => {
        this.getUserData(accessToken)
            .then((userData) => {
                console.log('getUserData this gets hit')
                this.setState({
                    userData,
                    hasFetched: true,
                    accessToken,
                    authenticated: true,
                })
            })
            .catch((err) => {
                console.log('setGlobalState Error: ', err)
                localStorage.clear()
                this.setState({
                    accessToken: null,
                })
                this.props.history.push('/home')
            })
    }

    getAndDisplayComment = (id, reply) => {
        const yourReply = {
            id,
            reply,
        }
        return yourReply
    }

    render() {
        return (
            <GlobalContext.Provider
                value={{
                    ...this.state,
                    getAndDisplayComment: this.getAndDisplayComment,
                    // new items
                    setup: this.setup,
                    invalidate: this.invalidate,
                }}
            >
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
}

const GlobalStateWithRouter = withRouter(GlobalState)
export default GlobalStateWithRouter
