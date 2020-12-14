import React from 'react'
import axios from 'axios'

import Loader from '../svg-components/Loader'
import { GlobalContext } from '../GlobalState'
import Comment from './Comment'
import { flattenCommentTree } from '../../utils/comments'
import getComments from '../../queries/comments'

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
            getComments(this.props.subreddit, this.props.postCommentsId).then(
                (response) => {
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
                }
            )
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

    getCommentEdit = (newCommentData, oldChildArr) => {
        newCommentData.childIds = [...oldChildArr]
        this.setState({
            comments: {
                ...this.state.comments,
                [newCommentData.id]: newCommentData,
            },
        })
    }

    render() {
        if (this.state.isLoading) {
            return <Loader />
        }

        return (
            <div>
                {this.state.parentCommentsArr.map((parentId) => {
                    return (
                        <Comment
                            commentData={this.state.comments}
                            commentId={parentId}
                            getCommentReply={this.getCommentReply}
                            getCommentEdit={this.getCommentEdit}
                        />
                    )
                })}
            </div>
        )
    }
}

export default Comments

Comments.contextType = GlobalContext
