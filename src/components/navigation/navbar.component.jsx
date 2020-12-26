import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { GlobalContext } from '../GlobalState'

import Login from '../Login'

import CommentsSVG from '../svg-components/navbar-svgs/CommentsSVG'
import SearchSubs from '../svg-components/navbar-svgs/SearchSubs'
import PostsSVG from '../svg-components/navbar-svgs/PostsSVG'
import ProfileSVG from '../svg-components/navbar-svgs/ProfileSVG'
import HomeSVG from '../svg-components/navbar-svgs/HomeSVG'

const CLIENT_ID = 'MMej7E1hI1x82A'
const REDIRECT_URI = 'http://localhost:3000/authorize'
const DURATION = 'permanent'
const SCOPE =
    'identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread'

const getAuthorizationURL = () =>
    `https://www.reddit.com /api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${Math.random()}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE}`

const menuLinks = [
    { name: 'Home', route: '', component: <HomeSVG /> },
    { name: 'Find Subreddit', route: 'subreddits', component: <SearchSubs /> },
    { name: 'My Posts', route: 'posts', component: <PostsSVG /> },
    { name: 'My Comments', route: 'comments', component: <CommentsSVG /> },
    { name: 'Profile', route: 'user', component: <ProfileSVG /> },
]

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeRoute: this.props.location.pathname.substring(1),
        }
    }

    handleClick = (val) => {
        this.setState({
            activeRoute: val,
        })
    }

    render() {
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
                                    <div className="link-text">{link.name}</div>
                                    {link.component}
                                </li>

                                {/* <li className="list-item">
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
                                        <div className="link-text">
                                            {link.name}
                                        </div>
                                        <CommentsSVG />
                                    </div>
                                </li> */}
                            </NavLink>
                        ))}

                        {this.context.accessToken ? null : (
                            <li className="list-item">
                                <Login />
                            </li>
                        )}
                        <div className="userInfo">
                            {/* {this.context.userData ? (
                                <li className="user">
                                    {this.context.userData.name}
                                </li>
                            ) : null} */}
                            {this.context.accessToken ? (
                                <div>
                                    <button
                                        className="logout-btn-nav"
                                        onClick={this.context.invalidate}
                                    >
                                        Log out
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Navbar)

Navbar.contextType = GlobalContext
