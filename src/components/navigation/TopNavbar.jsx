import React from 'react'
import { Link } from 'react-router-dom'

import HamburgerNav from './HamburgerNav'
import HamburgerSVG from '../svg-components/HamburgerSVG'

import Login from '../Login'
import MasterSearch from '../search/MasterSearch'
import { GlobalContext } from '../GlobalState'

class TopNavbar extends React.Component {
    constructor() {
        super()
        this.state = {
            hideNav: '',
            openMenu: false,
        }
    }

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

    handleClick = () => {
        this.setState({
            openMenu: !this.state.openMenu,
        })
    }

    render() {
        return (
            <div className="top-navbar">
                <div className="profile-picture-container">
                    <Link to="/user">
                        <div className="profile-avatar">
                            <img
                                className="profile-img"
                                src={this.context.userData.icon_img}
                                alt="profile-avatar"
                            />
                            <span className="profile-name-span">
                                {this.context.userData.name}
                            </span>
                        </div>
                    </Link>
                    {this.state.hideNav && (
                        <div onClick={this.handleClick}>
                            <HamburgerSVG />
                            {this.state.openMenu && (
                                <HamburgerNav mobile={this.state.hideNav} />
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
export default TopNavbar

TopNavbar.contextType = GlobalContext
