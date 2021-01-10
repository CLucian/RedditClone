import React from 'react'

import getUser from '../../queries/user'
import moment from 'moment'

import './user.scss'

class User extends React.Component {
    constructor() {
        super()
        this.state = {
            userData: null,
            isLoading: true,
        }
    }

    componentDidMount() {
        getUser().then((response) => {
            this.setState({
                userData: response.data,
                isLoading: false,
            })
        })
    }

    getTime = (unixValue) => {
        const dateMoment = moment.unix(unixValue).fromNow()
        return dateMoment
    }

    render() {
        if (this.state.isLoading) {
            return null
        }

        const { name, icon_img, total_karma, created_utc } = this.state.userData

        return (
            <div className="profile__container">
                <div className="profile__header-container">
                    <div className="profile__img-container">
                        <img className="profile__img" src={icon_img} />
                    </div>
                    <div className="profile__name-container">
                        <div className="profile__name">{name}</div>
                    </div>
                </div>
                <div className="profile__karma-container">
                    Total Karma:{' '}
                    <span className="profile__karma-span">{total_karma}</span>
                </div>
                <div className="profile__created-container">
                    Account created:&nbsp;
                    <span className="profile__karma-span">
                        {this.getTime(created_utc)}
                    </span>
                </div>
            </div>
        )
    }
}

export default User
