import React from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'

import Home from './components/home.component'
import About from './components/about.component'
import Authorize from './components/authorize.component'
import ErrorPage from './components/errorPage.component'
import Navbar from './components/navbar.component'
import Profile from './components/profile.component'
import Posts from './components/post.component'
import PostContainer from './components/PostContainer'
import SideBar from './components/Sidebar'
import Subreddit from './components/Subreddit'
import SubscribedSubreddits from './components/SubscribedSubreddits'
import Login from './components/Login'

import test from './components/test'

import { GlobalContext } from './components/GlobalState'
import TopNavbar from './components/TopNavbar'

class App extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {}
    // }

    // Do this in /authorize, set state for islogged in and the auth token and then conditionally redirect IF islogged in back to home page

    render() {
        if (!this.context.hasFetched && !this.context.authenticated) {
            return <Login />
        }
        // } else if (!this.context.hasFetched) {
        //     return <Login />
        // } else if (this.context.hasFetched && this.context.authenticated)
        return (
            <div className="app">
                <TopNavbar />
                <div className="master-app-container">
                    <div className="left-side-app">
                        <Navbar />
                    </div>
                    <div className="main-routes">
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/about" component={About} />
                            <Route path="/authorize" component={Authorize} />
                            <Route path="/profile" component={Profile} />
                            {/* <Route path="/r/:id" exact component={Subreddit} /> */}
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
                            <Route path="/" exact component={ErrorPage} />
                        </Switch>
                        <Route
                            path="/me/subreddits"
                            component={SubscribedSubreddits}
                        />
                        <Route path="/" component={PostContainer} />
                    </div>
                    <div className="right-side-app">
                        <div className="sidebar-nav">
                            <SideBar />
                            <div></div>
                        </div>
                    </div>
                </div>
                {/* add a route here with path /, the component used in the route will check
          for a query param, eg: post_id=some_id
          - if it has an id
         */}
            </div>
        )
    }
}

App.contextType = GlobalContext

export default App
