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

import test from './components/test'

import { GlobalContext } from './components/GlobalState'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    // Do this in /authorize, set state for islogged in and the auth token and then conditionally redirect IF islogged in back to home page

    render() {
        if (this.context.isLoading) {
            return 'loading...'
        }

        return (
            <div className="app">
                <div className="TODO-left-nav">
                    <Navbar />
                </div>
                <div className="TODO-main-routes">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/authorize" component={Authorize} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/" component={ErrorPage} />
                    </Switch>
                    <Route path="/" component={PostContainer} />
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
