import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GlobalContext } from './GlobalState'

import Login from './Login'
import Home from './home.component'

const CLIENT_ID = 'MMej7E1hI1x82A'
const REDIRECT_URI = 'http://localhost:3000/authorize'
const DURATION = 'permanent'
const SCOPE =
    'identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread'

const getAuthorizationURL = () =>
    `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${Math.random()}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE}`

const menuLinks = [
    { name: 'Home', route: '' },
    { name: 'About', route: 'about' },
    { name: 'Explore Topics', route: 'explore' },
    { name: 'My Comments', route: 'comments' },
    { name: 'Profile', route: 'profile' },
]

export default class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeRoute: '',
        }
    }

    handleClick = (val) => {
        this.setState({
            activeRoute: val,
        })
    }

    render() {
        console.log('active Route', this.state.activeRoute)
        console.log('username=====', this.context.userData)
        return (
            <React.Fragment>
                <div className="navbar">
                    <ul className="navbar-links">
                        <div className="menu">Menu</div>
                        {menuLinks.map((link) => (
                            <NavLink
                                onClick={() => this.handleClick(link.route)}
                                to={`/${link.route}`}
                            >
                                <li className="list-item">
                                    <div
                                        className={`menu-margin
                                            ${
                                                this.state.activeRoute ===
                                                link.route
                                                    ? 'activeMargin'
                                                    : null
                                            }`}
                                    >
                                        &nbsp;
                                    </div>
                                    <div
                                        className={`menu-text
                                            ${
                                                this.state.activeRoute ===
                                                link.route
                                                    ? 'activeText'
                                                    : null
                                            }`}
                                    >
                                        {link.name}
                                    </div>
                                </li>
                            </NavLink>
                        ))}

                        {/* <NavLink onClick={() => this.handleClick('home')} to="/" exact>
                            <li className="list-item">
                                <div className={this.state.activeRoute === "home" ? activeMargin : null}>&nbsp;</div>
                                <div className={this.state.activeRoute === "home" ? activeText : null}>Home</div>
                            </li>
                        </NavLink> */}
                        {this.context.accessToken ? null : (
                            <li className="list-item">
                                {/* <a href={getAuthorizationURL()}>Log In</a> */}
                                <Login />
                            </li>
                        )}
                        {/* <li className="list-item">
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
                        </li> */}
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
