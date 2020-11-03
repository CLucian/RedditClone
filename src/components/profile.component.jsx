import React from 'react'

import Axios from 'axios'
import qs from 'qs'
import { Redirect } from 'react-router-dom'

import Login from './Login'
import ProfileComments from './ProfileComments'
import { GlobalContext } from './GlobalState'

export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            postChildren: '',
        }
    }

    componentDidMount() {
        if (this.context.accessToken) {
            const data = {
                t: 'all',
                type: 'comments',
                sort: 'new',
                limit: '100',
            }
            Axios({
                method: 'get',
                url: `https://oauth.reddit.com/user/${this.context.userData.name}/comments`,
                headers: {
                    Authorization: 'bearer ' + this.context.accessToken,
                    'content-type': 'application/x-www-form-urlencoded',
                    // "Content-Type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify(data),
            })
                .then((response) => {
                    console.log('user comments response', response)
                    this.setState({
                        postChildren: response.data.data.children,
                    })
                })
                .catch((err) => {
                    console.log(err)
                    console.log('what is the error', err.data)
                    alert('There was an error' + err)
                })
        } else {
            return <div>{this.context.loginFnc}}</div>
        }
    }

    render() {
        return (
            <div>
                {this.context.accessToken ? (
                    <div>
                        {this.context.accessToken}
                        <h1>This is the profile Page</h1>
                        <h1>Hello there {this.context.userData.name}</h1>
                        {this.state.postChildren &&
                            this.state.postChildren.map((child) => {
                                return (
                                    <ProfileComments
                                        childData={child}
                                        id={child.id}
                                    />
                                )
                            })}
                    </div>
                ) : (
                    <div>
                        <Login />
                    </div>
                )}
            </div>
        )
    }
}

Profile.contextType = GlobalContext
