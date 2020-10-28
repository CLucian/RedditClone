import React from 'react'
import axios from 'axios'

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

            replyId: null,
            parentId: null,
            commentDataObj: null,
            commentReplyStr: null,
            newCommentDataObj: null,
        }
    }

    getCommentReply = (newCommentData, parentId) => {
        const id = newCommentData.id
        this.state.comments[parentId].childIds = [
            ...this.state.comments[parentId].childIds,
            id,
        ]

        this.setState({
            comments: {
                ...this.state.comments,
                [newCommentData.id]: newCommentData,
            },
        })
    }

    componentDidMount() {
        const getComments = () => {
            if (this.props.accessToken) {
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

        getComments()
    }

    render() {
        // console.log("comments", this.state.comments);

        console.log('comments', this.state.parentCommentsArr)
        // console.log('This is the comment Map', commentMap)
        if (this.state.isLoading) {
            return null
        }

        // debugger
        return (
            //   <CommentContext.Provider
            //     value={{
            //       ...this.state,
            //       getCommentReply: this.getCommentReply,
            //       setCommentReplyData: this.setCommentReplyData,
            //     }}
            //   >
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
                    // this.state.comments[parentId].body
                })}
                {/* <Comment commentData={this.state.comments} commentsArr={this.state.parentCommentsArr} /> */}
            </div>
            //   </CommentContext.Provider>
        )
    }
}

export default Comments

Comments.contextType = GlobalContext

//  {
//    this.state.comments.map((comment) => {
//      return (
//        <div>
//          <Comment
//            key={comment.data.id}
//            comment={comment}
//            commentId={comment.data.parent_id}
//          />
//          {/* <Recursion commentData={this.state.comments} /> */}
//        </div>
//      );
//    });
//  }
