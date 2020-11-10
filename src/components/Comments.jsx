import React from 'react'
import axios from 'axios'

import Loader from './svg-components/Loader'
import { GlobalContext } from './GlobalState'
import Comment from './Comment'
import { flattenCommentTree } from '../utils/comments'

export const CommentContext = React.createContext()

class Comments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: 'loading...',
            isLoading: true,
            parentCommentsArr: '',
            replyComment: false,
        }
    }

    componentDidMount() {
        if (this.props.data) {
            this.getComments()
        }
    }

    getCommentReply = (newCommentData, commentId) => {
        //search to see if the id is already logged in the commentMap
        const id = newCommentData.id
        // check to see if this id already exists from a previous comment made
        if (!this.state.comments.id) {
            // if it does not exist then add the id to the parent childIds array
            this.state.comments[commentId].childIds = [
                ...this.state.comments[commentId].childIds,
                id,
            ]
        }
        // add the new comment to the commentMap state OR if edit, replace old comment with new edited comment
        this.setState({
            comments: {
                ...this.state.comments,
                [newCommentData.id]: newCommentData,
            },
        })
    }

    getComments = () => {
        console.log('in get comments', this.props.subreddit)
        // console.log('in get comments', this.props.postCom)
        if (this.props.accessToken && this.props.data) {
            return axios({
                method: 'GET',
                url: `https://oauth.reddit.com/${this.props.subreddit}/comments/${this.props.postCommentsId}`,
                headers: {
                    Authorization: 'bearer ' + this.props.accessToken,
                },
            })
                .then((response) => {
                    const responseData = response.data[1].data.children
                    const parentCommentIdsArr = []
                    responseData.forEach((parentComment) => {
                        parentCommentIdsArr.push(parentComment.data.id)
                    })

                    // console.clear()
                    const data = responseData
                    console.log('direct data', data)
                    const commentMap = flattenCommentTree(responseData)
                    console.log('DATA AND COMMENT MAP', data, commentMap)

                    this.setState({
                        comments: commentMap,
                        parentCommentsArr: parentCommentIdsArr,
                        isLoading: false,
                    })
                })
                .catch((err) => {
                    console.log('Home Component Error: ', err)
                })
        }
    }

    render() {
        console.log(
            'this.props.data from the postModal in Comments now',
            this.props.data
        )
        console.log('author in comments', this.props.data.author)
        console.log('subreddit', this.props.subreddit)
        console.log('postCommentsId', this.props.postCommentsId)

        if (this.state.isLoading) {
            return <Loader />
        }

        return (
            <div>
                {this.state.parentCommentsArr.map((parentId) => {
                    return (
                        <Comment
                            // currentData={this.state.comments[parentId]}
                            commentData={this.state.comments}
                            commentId={parentId}
                            // parent_Id={this.state.comments[parentId].parent_id}
                            getCommentReply={this.getCommentReply}
                        />
                    )
                })}
            </div>
        )
    }
}

export default Comments

Comments.contextType = GlobalContext
