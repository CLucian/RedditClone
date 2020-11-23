import React from 'react'

import Axios from 'axios'
import qs from 'qs'

import Login from '../Login'
import ProfileComments from './ProfileComments'
import { GlobalContext } from '../GlobalState'

export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            postChildren: '',
            page: 1,
            before: null,
            after: null,
        }
    }

    getProfile = (pageDir) => {
        let url = `https://oauth.reddit.com/user/${this.context.userData.name}/comments?count=555`
        if (pageDir === 'next') {
            url = `https://oauth.reddit.com/user/${this.context.userData.name}/comments?count=555&after=${this.state.after}`
        } else if (pageDir === 'prev') {
            url = `https://oauth.reddit.com/user/${this.context.userData.name}/comments?count=555&before=${this.state.before}`
        }
        // const url = `https://oauth.reddit.com/user/${this.context.userData.name}/comments`
        // const urlAfter = `https://oauth.reddit.com/user/${this.context.userData.name}/comments/after=${this.state.after}`
        // const urlBefore = `https://oauth.reddit.com/user/${this.context.userData.name}/comments/before=${this.state.before}`
        const data = {
            t: 'all',
            type: 'comments',
            sort: 'new',
            limit: '100',
        }
        Axios({
            method: 'get',
            // url: `https://oauth.reddit.com/user/${this.context.userData.name}/comments`,
            url: url,
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
                    // pageId: response.data.data.after,
                    // firstAfter:
                    before: response.data.data.before,
                    after: response.data.data.after,
                })
            })
            .catch((err) => {
                console.log(err)
                console.log('what is the error', err.data)
                alert('There was an error' + err)
            })
    }

    componentDidMount() {
        this.getProfile()
    }

    getPage = (pageDir) => {
        // this.getProfile(this.state.after, null)
        if (pageDir === 'next') {
            this.setState(
                {
                    page: this.state.page + 1,
                },
                this.getProfile(pageDir)
            )
        } else if (pageDir === 'prev') {
            this.setState(
                {
                    page: this.state.page - 1,
                },
                this.getProfile(pageDir)
            )
        }
    }

    prevPage = () => {
        this.getProfile(null, this.state.before)
    }

    render() {
        console.log('profile component state', this.state.postChildren)
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
                                        accessToken={this.context.accessToken}
                                    />
                                )
                            })}
                    </div>
                ) : (
                    <div>
                        <Login />
                    </div>
                )}
                {this.state.before && this.state.page > 1 && (
                    <div
                        onClick={() => {
                            this.getPage('prev')
                        }}
                        className="pagination"
                    >
                        Previous Page
                    </div>
                )}
                {this.state.after && (
                    <div
                        onClick={() => {
                            this.getPage('next')
                        }}
                        className="pagination"
                    >
                        Next Page
                    </div>
                )}
            </div>
        )
    }
}

Profile.contextType = GlobalContext
