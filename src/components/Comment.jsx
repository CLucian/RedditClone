import React from 'react'
import marked from 'marked'
import DOMPurify from 'dompurify'

import CommentReply from './CommentReply'
import MoreReplies from './MoreReplies'
import { GlobalContext } from './GlobalState'

const Comment = (props) => {
    const replyContext = React.useContext(GlobalContext)
    const nestedComments = props.commentData[props.commentId]?.childIds?.map(
        (commentId) => {
            return (
                <Comment
                    commentData={props.commentData}
                    commentId={commentId}
                    getCommentReply={props.getCommentReply}
                    parent_Id={props.commentData[props.commentId].parent_id}
                />
            )
        }
    )

    const getMarkDown = (markDown) => {
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

    return (
        <div className="post-comments-container">
            <div className="comment-author">
                {props.commentData[props.commentId]?.author}
            </div>
            <div
                className="comment"
                dangerouslySetInnerHTML={getMarkDown(
                    props.commentData[props.commentId]?.body
                )}
            ></div>
            <CommentReply
                getCommentReply={props.getCommentReply}
                commentId={props.commentId}
                parent_Id={props.commentData[props.commentId].parent_id}
                commentData={props.commentData}
            />
            {nestedComments}
        </div>
    )
}

export default Comment

Comment.contextType = GlobalContext
