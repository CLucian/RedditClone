import React from 'react'
import { Link } from 'react-router-dom'

import Login from './Login'
import { GlobalContext } from './GlobalState'

const TopNavbar = () => {
    const context = React.useContext(GlobalContext)

    if (!context.accessToken) {
        return <Login />
    } else {
        return (
            <div className="top-navbar">
                <div></div>
                <Link to="/profile">
                    <div className="profile-picture-container">
                        <div className="profile-avatar">
                            <img
                                className="profile-img"
                                src={context.userData.icon_img}
                                alt="profile-avatar"
                            />
                        </div>
                        <div>{context.userData.name}</div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default TopNavbar

// TopNavbar.contextType = GlobalContext
