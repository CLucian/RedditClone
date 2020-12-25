import React from 'react'

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
            postNum: null,
        }
    }

    componentDidMount() {
        getProfile(
            undefined,
            this.context.userData.name,
            this.state.after,
            this.state.before
        )
            .then((response) => {
                this.handleResponse(response)
                console.log('user comments response', response)
            })
            .catch((err) => console.log(err))
    }

    handleResponse = (response) => {
        this.setState({
            postChildren: response.data.data.children,
            before: response.data.data.before,
            after: response.data.data.after,
            postNum: response.data.data.dist,
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
            )
                .then((response) => {
                    console.log('getProfile response after deleting', response)
                    this.handleResponse(response)
                })
                .catch((err) => console.log(err))
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
                    )
                        .then((response) => {
                            this.handleResponse(response)
                        })
                        .catch((err) => console.log(err))
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
                    )
                        .then((response) => {
                            this.handleResponse(response)
                        })
                        .catch((err) => console.log(err))
                }
            )
        }
    }

    render() {
        console.log('profile component state', this.state.postChildren)
        return (
            <div>
                <div>
                    <div className="myComments-wrapper">
                        <div className="myComments-container">
                            <h1 className="myComments-container-title">
                                My Comments
                            </h1>
                        </div>
                    </div>
                    {this.state.postChildren &&
                        this.state.postChildren.map((child) => {
                            return (
                                <ProfileComments
                                    confirmDelete={this.confirmDelete}
                                    childData={child}
                                    id={child.id}
                                    postNum={this.state.postNum}
                                    accessToken={this.context.accessToken}
                                    after={this.state.after}
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
