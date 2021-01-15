import React from 'react'

import ProfileComments from './ProfileComments'
import { GlobalContext } from '../GlobalState'

import NextSVG from '../svg-components/pageNav-svgs/NextSVG'
import PrevSVG from '../svg-components/pageNav-svgs/PrevSVG'

import { deleteComment } from '../../queries/profileComments'

import getProfile from '../../queries/profile'

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
            getProfile(
                undefined,
                this.context.userData.name,
                this.state.after,
                this.state.before
            )
                .then((response) => {
                    this.handleResponse(response)
                })
                .catch((err) => console.log(err))
        })
    }

    getPage = (pageDir) => {
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
                                    key={child.id}
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
                            <PrevSVG />
                        </div>
                    )}
                    {this.state.after && (
                        <div
                            onClick={() => {
                                this.getPage('next')
                            }}
                            className="pagination"
                        >
                            <NextSVG />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

Profile.contextType = GlobalContext
