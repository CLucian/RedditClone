import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GlobalContext } from './GlobalState'

import Login from './Login'

const CLIENT_ID = 'MMej7E1hI1x82A'
const REDIRECT_URI = 'http://localhost:3000/authorize'
const DURATION = 'permanent'
const SCOPE =
    'identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread'

const getAuthorizationURL = () =>
    `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${Math.random()}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE}`

export default class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        console.log('username=====', this.context.userData)
        return (
            <React.Fragment>
                <div className="navbar">
                    <ul className="navbar-links">
                        <div className="menu">Menu</div>
                        <li className="list-item">
                            <NavLink to="/">Home</NavLink>
                        </li>
                        {this.context.accessToken ? null : (
                            <li className="list-item">
                                {/* <a href={getAuthorizationURL()}>Log In</a> */}
                                <Login />
                            </li>
                        )}
                        <li className="list-item">
                            <NavLink to="/about">About</NavLink>
                        </li>
                        <li className="list-item">
                            <NavLink to="/Explore">Explore Topics</NavLink>
                        </li>
                        <li className="list-item">
                            <NavLink to="/Comments">My Comments</NavLink>
                        </li>
                        <li className="list-item">
                            <NavLink to="/Topics">My Topics</NavLink>
                        </li>
                        <li className="list-item">
                            <NavLink to="/profile">Profile</NavLink>
                        </li>
                        {/* {this.context.accessToken ? (
              <li className="list-item">
                <button onClick={this.context.setLoginStatusOut}>
                  Log out
                </button>
              </li>
            ) : null} */}
                        {/* {this.context.username ? (
              <li>User: {this.context.username}</li>
            ) : null} */}
                        <div className="userInfo">
                            {this.context.userData ? (
                                <li className="user">
                                    {this.context.userData.name}
                                </li>
                            ) : null}
                            {this.context.accessToken ? (
                                <li className="list-item login-btn">
                                    <button
                                        onClick={this.context.setLoginStatusOut}
                                    >
                                        Log out
                                    </button>
                                </li>
                            ) : null}
                        </div>
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

Navbar.contextType = GlobalContext
