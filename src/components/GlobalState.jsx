import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import {
    getAccessToken,
    setAccessToken,
    clearAccessToken,
} from '../utils/login'
import { fetchProfile } from '../queries/auth'

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
            // status: STATUS.NOT_AUTH,
            // isLoggedIn: false,
            // authenticated: false,
            // hasFetched: true,
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

    // getProfile = (token) => {

    // }

    // MAKE USER DATA ACCESSIBLE TO BOTH FLOWS --> MAKE IT A REUSABLE FUNCTION
    // Take in auth token as param
    // dont set state in getUserData
    // return a promise at the end of getUserData and set ALL state after it resolves

    // this.getUserDate()//.then//.then().catch()

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
            //error out -- learn debugging
            .catch((err) => {
                console.log('setGlobalState Error: ', err)
                localStorage.clear()
                this.setState({
                    accessToken: null,
                })
                this.props.history.push('/home')
                // this.props.history.push('/login')
            })
    }

    getAndDisplayComment = (id, reply) => {
        const yourReply = {
            id,
            reply,
        }
        return yourReply
    }

    // getUserData = (accessToken) => {
    //     return axios
    //         .request({
    //             url: 'https://oauth.reddit.com/api/v1/me',
    //             headers: {
    //                 // authorization: "bearer " + localStorage.getItem("access_token"),
    //                 authorization: 'bearer ' + accessToken,
    //             },
    //         })

    //         .then((response) => {
    //             console.log(
    //                 '=====PROFILE DATA=====',
    //                 response,
    //                 response.data.name
    //             )
    //             return response.data
    //         })
    // }

    // fncInitiator = (tokenRetriever) => {}

    // Retrieves the access token from the authorize component

    // setAuthState = (authState) => {
    //     if (authState.accessToken) {
    //         console.log('token is', authState.accessToken)
    //         localStorage.setItem('access_token', authState.accessToken)
    //         // this.setState({
    //         // 	accessToken: authState.accessToken,
    //         // 	isLoggedIn: true,
    //         // });
    //         this.setGlobalState(authState.accessToken)
    //     }
    // }

    // setLoginStatusOut = () => {
    //     if (localStorage.getItem('access_token')) {
    //         localStorage.clear()
    //         this.setState({
    //             accessToken: null,
    //             isLoggedIn: false,
    //             username: null,
    //         })
    //     }
    // }

    render() {
        // console.log(
        //     'this is the new global state',
        //     localStorage.getItem('access_token')
        // )
        // console.log('this is the new global state', this.state.accessToken)

        return (
            <GlobalContext.Provider
                value={{
                    ...this.state,
                    // setAuthState: this.setAuthState,
                    // fncInitiator: this.fncInitiator,
                    // setLoginStatusOut: this.setLoginStatusOut,
                    // setProfileState: this.setProfileState,
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
