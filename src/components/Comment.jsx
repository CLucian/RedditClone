import React from 'react'
import marked from 'marked'
import DOMPurify from 'dompurify'

import CommentReply from './CommentReply'
import MoreReplies from './MoreReplies'
import { GlobalContext } from './GlobalState'
import { render } from '@testing-library/react'

// const replyContext = React.useContext(GlobalContext)

class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isCollapsed: '',
        }
    }

    getMarkDown = (markDown) => {
        if (markDown) {
            const rawMarkup = marked(markDown)
            const clean = DOMPurify.sanitize(rawMarkup)
            return { __html: clean }
        } else {
            return {
                __html: '<p className="deleted-comment">Deleted Comment<p>',
            }
        }
    }

    nestedComments = this.props.commentData[
        this.props.commentId
    ]?.childIds?.map((commentId) => {
        return (
            <Comment
                commentData={this.props.commentData}
                commentId={commentId}
                getCommentReply={this.props.getCommentReply}
                // parent_Id={props.commentData[commentId].parent_id}
            />
        )
    })

    collapseComments = () => {
        this.setState({
            isCollapsed: !this.state.isCollapsed,
        })
    }

    //in render display null if you shouldn't display it
    render() {
        // if (this.state.isCollapsed) {
        //     return null
        // }
        console.log('isCollapsed?', this.props.isCollapsed)

        return (
            <div className="post-comments-container">
                <div className="comment-author">
                    {this.props.commentData[this.props.commentId]?.author}
                </div>
                <div className="comment-text-body">
                    <div>
                        <button
                            onClick={this.collapseComments}
                            className="collapse-thread"
                        >
                            -
                        </button>
                    </div>
                    <div
                        className="comment"
                        dangerouslySetInnerHTML={this.getMarkDown(
                            this.props.commentData[this.props.commentId]?.body
                        )}
                    ></div>
                </div>
                {this.state.isCollapsed ? null : (
                    <CommentReply
                        getCommentReply={this.props.getCommentReply}
                        commentId={this.props.commentId}
                        // parent_Id={props.parent_Id}
                        commentData={this.props.commentData}
                    />
                )}
                {this.state.isCollapsed ? null : this.nestedComments}
            </div>
        )
    }
}

export default Comment

Comment.contextType = GlobalContext
