import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { GlobalContext } from '../GlobalState'

import CommentsSVG from '../svg-components/navbar-svgs/CommentsSVG'
import SearchSubs from '../svg-components/navbar-svgs/SearchSubs'
import PostsSVG from '../svg-components/navbar-svgs/PostsSVG'
import ProfileSVG from '../svg-components/navbar-svgs/ProfileSVG'
import HomeSVG from '../svg-components/navbar-svgs/HomeSVG'

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
        console.log('this.props.location', this.props.location)
        const { pathname } = this.props.location

        return (
            <React.Fragment>
                <div className="navbar">
                    <ul className="navbar-links">
                        <div className="menu">Menu</div>
                        {menuLinks.map((link) => (
                            <NavLink
                                onClick={() => this.handleClick(link.route)}
                                key={link.name}
                                to={`/${link.route}`}
                            >
                                {pathname.substring(1) === link.route ? (
                                    <li className="list-item-active">
                                        <div className="link-text">
                                            {link.name}
                                        </div>
                                        {link.component}
                                    </li>
                                ) : (
                                    <li className="list-item">
                                        <div className="link-text">
                                            {link.name}
                                        </div>
                                        {link.component}
                                    </li>
                                )}
                            </NavLink>
                        ))}
                        <div className="userInfo">
                            <div>
                                <button
                                    className="logout-btn-nav"
                                    onClick={this.context.invalidate}
                                >
                                    Log out
                                </button>
                            </div>
                        </div>
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Navbar)

Navbar.contextType = GlobalContext
