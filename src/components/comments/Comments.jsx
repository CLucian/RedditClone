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
            userPostsArr: [],
            userParentComment: null,
            dataChange: 0,
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

                    const commentMap = flattenCommentTree(responseData)
                    console.log('commentMap', commentMap)

                    this.setState({
                        comments: commentMap,
                        parentCommentsArr: parentCommentIdsArr,
                        isLoading: false,
                    })
                    // }
                }
            )
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.userParentCommentData !== this.props.userParentCommentData
        ) {
            this.checkUserParent()
        }
    }

    checkUserParent = () => {
        if (this.props.userParentCommentData) {
            let parentData = this.props?.userParentCommentData?.data?.json?.data
                ?.things[0]?.data
            parentData.childIds = []

            let parentId = parentData?.id

            let newParentArr
            const found = this.state.parentCommentsArr.find((comment) => {
                return comment === parentId
            })
            if (found) {
                return
            } else if (parentData) {
                newParentArr = [parentId, ...this.state.parentCommentsArr]
                this.setState({
                    parentCommentsArr: newParentArr,
                    userPostsArr: [...this.state.userPostsArr, parentData],
                    dataChange: this.state.dataChange + 1,
                    comments: {
                        [parentId]: parentData,
                        ...this.state.comments,
                    },
                })
            }
        }
    }

    commentDelete = (name, id) => {
        deleteComment(name)
            .then((response) => {
                this.state.comments[id].body = '[deleted]'
                this.state.comments[id].author = '[deleted]'
                const newObj = { ...this.state.comments }
                this.setState({
                    comments: newObj,
                })
            })
            .catch((err) => console.log(err))
    }

    getCommentReply = (newCommentData, commentId) => {
        //search to see if the id is already logged in the commentMap
        const id = newCommentData.id
        // check to see if this id already exists from a previous comment made

        this.state.comments[commentId].childIds = [
            ...this.state.comments[commentId].childIds,
            id,
        ]

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
                            commentDelete={this.commentDelete}
                            commentData={this.state.comments}
                            commentId={parentId}
                            getCommentReply={this.getCommentReply}
                            getCommentEdit={this.getCommentEdit}
                            dataChange={this.state.dataChange}
                            key={parentId}
                        />
                    )
                })}
            </div>
        )
    }
}

export default Comments

Comments.contextType = GlobalContext
