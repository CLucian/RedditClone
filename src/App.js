import React from 'react'

import './App.css'

import 'react-toastify/dist/ReactToastify.css'

import { Route, Switch } from 'react-router-dom'

import MasterSearchProvider from './components/search/MasterSearchProvider'
import Home from './components/home.component'
import About from './components/about.component'
import ErrorPage from './components/errorPage.component'
import Navbar from './components/navigation/navbar.component'
import Profile from './components/profile/profile.component'
import PostContainer from './components/modal/PostContainer'
import SideBar from './components/navigation/Sidebar'
import Subreddit from './components/profile/Subreddit'
import SubscribedSubreddits from './components/profile/SubscribedSubreddits'
import TopNavbar from './components/navigation/TopNavbar'
import Login from './components/Login'
import CreatePostPage from './components/posting/CreatePostPage'
import SearchForSubreddit from './components/navigation/SearchForSubreddit'
import User from './components/profile/User'
import ProfilePostsList from './components/profile/ProfilePostsList'

import { GlobalContext, STATUS } from './components/GlobalState'
import HomeWrapper from './components/search/HomeWrapper'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            hideNav: '',
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize)
        this.resize()
    }

    resize = () => {
        let currentHideNav = window.innerWidth < 700
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
                        {/* <ToastProvider> */}
                        <TopNavbar />
                        <div className="master-app-container">
                            {!this.state.hideNav && (
                                <div className="left-side-app">
                                    <Navbar />
                                </div>
                            )}
                            <div className="main-routes">
                                <Switch>
                                    <Route path="/" exact>
                                        <HomeWrapper
                                            hideNav={this.state.hideNav}
                                        >
                                            <Home />
                                        </HomeWrapper>
                                    </Route>
                                    <Route path="/about" component={About} />
                                    <Route
                                        path="/subreddits"
                                        component={SearchForSubreddit}
                                    />
                                    <Route path="/user" component={User} />
                                    <Route
                                        path="/comments"
                                        component={Profile}
                                    />
                                    <Route
                                        path="/posts"
                                        component={ProfilePostsList}
                                    />
                                    <Route
                                        path="/create_post"
                                        component={CreatePostPage}
                                    />
                                    <Route
                                        path="/r/:id"
                                        exact
                                        // This will alternative componentDidUpdate to ensure that each time
                                        // a new key is passed to the Subreddit component
                                        // then it will update the component with the new data
                                        render={({ match }) => {
                                            const subreddit = match.params.id
                                            if (!subreddit) {
                                                return null
                                            }
                                            // return null
                                            return <Subreddit key={subreddit} />
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
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* </ToastProvider> */}
                    </MasterSearchProvider>
                </div>
            )
        }

        return null
    }
}

App.contextType = GlobalContext

export default App
