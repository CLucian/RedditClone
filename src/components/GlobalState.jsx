import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

export const GlobalContext = React.createContext()

class GlobalState extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accessToken: null,
            isLoggedIn: false,
            authenticated: false,
            hasFetched: true,
            userData: null,
        }
    }

    // MAKE USER DATA ACCESSIBLE TO BOTH FLOWS --> MAKE IT A REUSABLE FUNCTION
    // Take in auth token as param
    // dont set state in getUserData
    // return a promise at the end of getUserData and set ALL state after it resolves

    // this.getUserDate()//.then//.then().catch()

    setGlobalState = (accessToken) => {
        this.getUserData(accessToken)
            .then((userData) => {
                this.setState(
                    {
                        userData,
                        hasFetched: true,
                        accessToken,
                    },
                    () => {
                        this.setState({
                            authenticated: true,
                        })
                    }
                )
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

    getUserData = (accessToken) => {
        return axios
            .request({
                url: 'https://oauth.reddit.com/api/v1/me',
                headers: {
                    // authorization: "bearer " + localStorage.getItem("access_token"),
                    authorization: 'bearer ' + accessToken,
                },
            })

            .then((response) => {
                console.log(
                    '=====PROFILE DATA=====',
                    response,
                    response.data.name
                )
                return response.data
            })
    }

    componentDidMount() {
        // If there is an access token aka already logged in --> call getUserData.
        if (localStorage.getItem('access_token')) {
            console.log(
                'has token, setting as',
                localStorage.getItem('access_token')
            )
            this.setGlobalState(localStorage.getItem('access_token'))

            // We will handle setState in getUserData above, so we can combine all setState in 1 function
            // this.setState({
            // 	accessToken: localStorage.getItem('access_token'),
            // })
        } else {
            this.setState({
                authenticated: false,
                hasFetched: false,
            })
            // this.getAccessToken();
            // this.setAuthState()
        }
    }

    fncInitiator = (tokenRetriever) => {}

    // Retrieves the access token from the authorize component

    setAuthState = (authState) => {
        if (authState.accessToken) {
            console.log('token is', authState.accessToken)
            localStorage.setItem('access_token', authState.accessToken)
            // this.setState({
            // 	accessToken: authState.accessToken,
            // 	isLoggedIn: true,
            // });
            this.setGlobalState(authState.accessToken)
        }
    }

    setLoginStatusOut = () => {
        if (localStorage.getItem('access_token')) {
            localStorage.clear()
            this.setState({
                accessToken: null,
                isLoggedIn: false,
                username: null,
            })
        }
    }

    render() {
        console.log(
            'this is the new global state',
            localStorage.getItem('access_token')
        )
        console.log('this is the new global state', this.state.accessToken)
        return (
            <GlobalContext.Provider
                value={{
                    ...this.state,
                    setAuthState: this.setAuthState,
                    fncInitiator: this.fncInitiator,
                    setLoginStatusOut: this.setLoginStatusOut,
                    setProfileState: this.setProfileState,
                    getAndDisplayComment: this.getAndDisplayComment,
                }}
            >
                {this.props.children}
            </GlobalContext.Provider>
        )
    }
}

const GlobalStateWithRouter = withRouter(GlobalState)
export default GlobalStateWithRouter
