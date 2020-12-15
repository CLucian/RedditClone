import React from 'react'

import Axios from 'axios'
import qs from 'qs'

import Login from '../Login'
import ProfileComments from './ProfileComments'
import { GlobalContext } from '../GlobalState'

import { deleteComment } from '../../queries/profileComments'

import getProfile from '../../queries/profile'

/* 
    wrap withrouter for whichever component is responsible for fetching posts or whatever
        - whatever needs to subscribe to route state
    - link just sets any url/route state like "after"
    - whatever component is responsible for fetching posts (See above), add a componentdidupdate
    method and compare previous to current props - if `after` changed, then do whatever

    create a util that passes an object into the Link to --> with pathname and search
    search gets changed depending on what data you need

*/

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

    // getProfile = (pageDir) => {
    //     let url = `https://oauth.reddit.com/user/${this.context.userData.name}/comments?count=555&limit=10`
    //     if (pageDir === 'next') {
    //         url = `https://oauth.reddit.com/user/${this.context.userData.name}/comments?count=555&after=${this.state.after}&limit=10`
    //     } else if (pageDir === 'prev') {
    //         url = `https://oauth.reddit.com/user/${this.context.userData.name}/comments?count=555&before=${this.state.before}&limit=10`
    //     }
    //     // const url = `https://oauth.reddit.com/user/${this.context.userData.name}/comments`
    //     // const urlAfter = `https://oauth.reddit.com/user/${this.context.userData.name}/comments/after=${this.state.after}`
    //     // const urlBefore = `https://oauth.reddit.com/user/${this.context.userData.name}/comments/before=${this.state.before}`
    //     const data = {
    //         t: 'all',
    //         type: 'comments',
    //         sort: 'new',
    //         limit: '100',
    //     }
    //     Axios({
    //         method: 'get',
    //         // url: `https://oauth.reddit.com/user/${this.context.userData.name}/comments`,
    //         url: url,
    //         headers: {
    //             Authorization: 'bearer ' + this.context.accessToken,
    //             'content-type': 'application/x-www-form-urlencoded',
    //             // "Content-Type": "application/x-www-form-urlencoded"
    //         },
    //         data: qs.stringify(data),
    //     })
    //         .then((response) => {
    //             console.log('user comments response', response)
    //             this.setState({
    //                 postChildren: response.data.data.children,
    //                 // pageId: response.data.data.after,
    //                 // firstAfter:
    //                 before: response.data.data.before,
    //                 after: response.data.data.after,
    //             })
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //             console.log('what is the error', err.data)
    //             alert('There was an error' + err)
    //         })
    // }

    componentDidMount() {
        getProfile(
            undefined,
            this.context.userData.name,
            this.state.after,
            this.state.before
        ).then((response) => {
            this.handleResponse(response)
            console.log('user comments response', response)
        })
    }

    handleResponse = (response) => {
        this.setState({
            postChildren: response.data.data.children,
            before: response.data.data.before,
            after: response.data.data.after,
        })
    }

    confirmDelete = (id) => {
        deleteComment(id).then((response) => {
            console.log(response)
            getProfile(
                undefined,
                this.context.userData.name,
                this.state.after,
                this.state.before
            ).then((response) => {
                console.log('getProfile response after deleting', response)
                this.handleResponse(response)
            })
        })
    }

    getPage = (pageDir) => {
        // this.getProfile(this.state.after, null)
        if (pageDir === 'next') {
            this.setState(
                {
                    page: this.state.page + 1,
                },
                () =>
                    getProfile(
                        pageDir,
                        this.context.userData.name,
                        this.state.after,
                        this.state.before
                    ).then((response) => {
                        this.handleResponse(response)
                    })
            )
        } else if (pageDir === 'prev') {
            this.setState(
                {
                    page: this.state.page - 1,
                },
                () => {
                    getProfile(
                        pageDir,
                        this.context.userData.name,
                        this.state.after,
                        this.state.before
                    ).then((response) => {
                        this.handleResponse(response)
                    })
                }
            )
        }
    }

    render() {
        console.log('profile component state', this.state.postChildren)
        return (
            <div>
                <div>
                    {this.context.accessToken}
                    <h1>This is the profile Page</h1>
                    <h1>Hello there {this.context.userData.name}</h1>
                    {this.state.postChildren &&
                        this.state.postChildren.map((child) => {
                            return (
                                <ProfileComments
                                    confirmDelete={this.confirmDelete}
                                    childData={child}
                                    id={child.id}
                                    accessToken={this.context.accessToken}
                                />
                            )
                        })}
                </div>
                <div className="pagination-container">
                    {this.state.before && this.state.page > 1 && (
                        <div
                            onClick={() => {
                                this.getPage('prev')
                            }}
                            className="pagination"
                        >
                            Prev Page
                        </div>
                    )}
                    {this.state.after && (
                        // <Link to={`/after=${}`}>
                        <div
                            onClick={() => {
                                this.getPage('next')
                            }}
                            className="pagination"
                        >
                            Next Page
                        </div>
                        // </Link>
                    )}
                </div>
            </div>
        )
    }
}

Profile.contextType = GlobalContext
