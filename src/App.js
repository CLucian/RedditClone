import React from 'react'

import './App.css'

// import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Route, Switch } from 'react-router-dom'

import ToastProvider from './components/toasts/ToastProvider'
import MasterSearchProvider from './components/search/MasterSearchProvider'
import Home from './components/home.component'
import About from './components/about.component'
import Authorize from './components/authorize.component'
import ErrorPage from './components/errorPage.component'
import Navbar from './components/navigation/navbar.component'
import Profile from './components/profile/profile.component'
import PostContainer from './components/modal/PostContainer'
import SideBar from './components/navigation/Sidebar'
import Subreddit from './components/profile/Subreddit'
import SubscribedSubreddits from './components/profile/SubscribedSubreddits'
import TopNavbar from './components/navigation/TopNavbar'
import Login from './components/Login'
import CreatePostPageWrapper from './components/posting/CreatePostPageWrapper'
import CreatePostPage from './components/posting/CreatePostPage'
import SearchForSubreddit from './components/navigation/SearchForSubreddit'
import User from './components/profile/User'
import ProfilePostsList from './components/profile/ProfilePostsList'

import test from './components/test'

import { GlobalContext, STATUS } from './components/GlobalState'
import MasterSearch from './components/search/MasterSearch'
import HomeWrapper from './components/search/HomeWrapper'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            hideNav: '',
        }
    }

    // Do this in /authorize, set state for islogged in and the auth token and then conditionally redirect IF islogged in back to home page

    componentDidMount() {
        window.addEventListener('resize', this.resize)
        this.resize()
    }

    resize = () => {
        let currentHideNav = window.innerWidth <= 740
        if (currentHideNav !== this.state.hideNav) {
            this.setState({
                hideNav: currentHideNav,
            })
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    render() {
        console.log('hideNav', this.state.hideNav)

        const { status } = this.context

        if (status === STATUS.INAUTHENTICATED) {
            return <Login />
        }

        if (status === STATUS.AUTHENTICATING) {
            return 'loading...'
        }

        if (status === STATUS.AUTHENTICATED) {
            return (
                <div className="app">
                    <MasterSearchProvider>
                        <ToastProvider>
                            {/* <ToastContainer
                                autoClose={2000}
                                position="top-center"
                                className="toast-container"
                                closeOnClick
                            /> */}
                            <TopNavbar />
                            <div className="master-app-container">
                                {!this.state.hideNav && (
                                    <div className="left-side-app">
                                        <Navbar />
                                    </div>
                                )}
                                <div className="main-routes">
                                    <Switch>
                                        {/* <HomeWrapper> */}
                                        {/* <Route path="/" exact component={Home} /> */}
                                        <Route path="/" exact>
                                            <HomeWrapper>
                                                <Home />
                                            </HomeWrapper>
                                        </Route>

                                        {/* </HomeWrapper> */}

                                        <Route
                                            path="/about"
                                            component={About}
                                        />
                                        <Route
                                            path="/subreddits"
                                            component={SearchForSubreddit}
                                        />
                                        {/* <Route path="/authorize" component={Authorize} /> */}
                                        <Route path="/user" component={User} />
                                        <Route
                                            path="/comments"
                                            component={Profile}
                                        />
                                        <Route
                                            path="/posts"
                                            component={ProfilePostsList}
                                        />
                                        {/* <Route path="/r/:id" exact component={Subreddit} /> */}
                                        <Route
                                            path="/create_post"
                                            component={CreatePostPage}
                                        />
                                        {/* <Route path="/create_post" exact>
                                            <CreatePostPageWrapper>
                                                <CreatePostPage />
                                            </CreatePostPageWrapper>
                                        </Route> */}
                                        <Route
                                            path="/r/:id"
                                            exact
                                            // This will alternative componentDidUpdate to ensure that each time
                                            // a new key is passed to the Subreddit component
                                            // then it will update the component with the new data
                                            render={({ match }) => {
                                                const subreddit =
                                                    match.params.id
                                                if (!subreddit) {
                                                    return null
                                                }
                                                // return null
                                                return (
                                                    <Subreddit
                                                        key={subreddit}
                                                    />
                                                )
                                            }}
                                        />
                                        <Route
                                            path="/ErrorPage"
                                            exact
                                            component={ErrorPage}
                                        />
                                        <Route
                                            path="/"
                                            exact
                                            component={ErrorPage}
                                        />
                                    </Switch>
                                    <Route
                                        path="/me/subreddits"
                                        component={SubscribedSubreddits}
                                    />
                                    <Route path="/" component={PostContainer} />
                                </div>
                                {!this.state.hideNav && (
                                    <div className="right-side-app">
                                        <div className="sidebar-nav">
                                            <SideBar />
                                            {/* <div></div> */}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ToastProvider>
                    </MasterSearchProvider>
                </div>
            )
        }

        return null
    }

    // if (status)
    // if (!this.context.hasFetched && !this.context.authenticated) {
    //     return <Login />
    // }
    // } else if (!this.context.hasFetched) {
    //     return <Login />
    // } else if (this.context.hasFetched && this.context.authenticated)
}

App.contextType = GlobalContext

export default App
