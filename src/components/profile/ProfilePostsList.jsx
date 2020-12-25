import React from 'react'

import ProfilePost from './ProfilePost'
import getPosts from '../../queries/profilePosts'
import { GlobalContext } from '../GlobalState'

import getAuthorAvatar, { deleteComment } from '../../queries/profileComments'

class ProfilePostsList extends React.Component {
    constructor() {
        super()
        this.state = {
            postChildren: '',
            page: 1,
            before: null,
            after: null,
            authorImg: null,
        }
    }

    componentDidMount() {
        getPosts(
            undefined,
            this.context.userData.name,
            this.state.after,
            this.state.before
        )
            .then((response) => {
                this.handleResponse(response)
                console.log('user posts response', response)
            })
            .catch((err) => console.log(err))

        getAuthorAvatar(this.context.userData.name)
            .then((response) => {
                const dataImg = response.data.data.icon_img
                // console.log('dataImg', dataImg)
                const modifiedImg = dataImg.split('?width')[0]
                this.setState({
                    authorImg: modifiedImg,
                })
            })
            .catch((err) => {
                console.log('error in profilePostsList', err)
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
            getPosts(
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
                    getPosts(
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
                    getPosts(
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
        return (
            <div>
                <div>
                    <div className="myComments-wrapper">
                        <div className="myComments-container">
                            <h1 className="myComments-container-title">
                                My Posts
                            </h1>
                        </div>
                    </div>
                    {this.state.postChildren &&
                        this.state.postChildren.map((child) => {
                            return (
                                <ProfilePost
                                    confirmDelete={this.confirmDelete}
                                    childData={child}
                                    id={child.id}
                                    accessToken={this.context.accessToken}
                                    authorImg={this.state.authorImg}
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

ProfilePostsList.contextType = GlobalContext

export default ProfilePostsList
