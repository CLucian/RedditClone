import React from 'react'
import axios from 'axios'

import Loader from '../svg-components/Loader'
import { GlobalContext } from '../GlobalState'
import Comment from './Comment'
import { flattenCommentTree } from '../../utils/comments'
import getComments from '../../queries/comments'
import { deleteComment } from '../../queries/profileComments'

export const CommentContext = React.createContext()

class Comments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: 'loading...',
            isLoading: true,
            parentCommentsArr: [],
            replyComment: false,
        }

        this.commentDelete = this.commentDelete.bind(this)
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

    // this works except for if it's a parent comment
    commentDelete = (name, id, parentId) => {
        // const id = id
        deleteComment(name)
            .then((response) => {
                console.log(
                    'you hit the deleteComment response',
                    response,
                    this
                )

                let newObj

                // create new array of child ids without the deleted id
                if (!parentId) {
                    delete this.state.comments[id]
                    newObj = { ...this.state.comments }
                    this.setState({
                        comments: newObj,
                    })
                } else {
                    const newChildIdsArr = this.state.comments[
                        parentId
                    ].childIds.filter((el) => {
                        return el !== id
                    })
                    const newParentArr = this.state.parentCommentsArr.filter(
                        (el) => {
                            return el !== id
                        }
                    )
                    // set new child id array to parent (getting rid of deleted id)
                    this.state.comments[parentId].childIds = newChildIdsArr
                    // delete the entire id object
                    delete this.state.comments[id]
                    newObj = { ...this.state.comments }
                    // const newArr = this.state.comments.id.filter(
                    //     (el) => {
                    //         return el !== id
                    //     }
                    // )
                    console.log('newObj', newObj)

                    this.setState(
                        {
                            comments: newObj,
                            parentCommentsArr: newParentArr,
                        },
                        console.log(
                            'you have set the new state',
                            this.state.comments
                        )
                    )
                }
            })
            .catch((err) => console.log(err))
    }

    getCommentReply(newCommentData, commentId) {
        //search to see if the id is already logged in the commentMap
        const id = newCommentData.id
        console.log('whaat is this.state.comments', this.state)
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
        console.log('this.state.comments', this.state.comments)
        console.log(
            'this.state.parentCommentsArr',
            this.state.parentCommentsArr
        )

        if (this.state.isLoading) {
            return <Loader />
        }

        console.log('parentCommentsArr', this.state.parentCommentsArr)
        return (
            <div>
                {this.state.parentCommentsArr.map((parentId) => {
                    return (
                        <Comment
                            commentDelete={this.commentDelete}
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
