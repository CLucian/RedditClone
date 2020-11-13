import React from 'react'
import CommentReplyInput from './CommentReplyInput'
import CommentEditInput from './CommentEditInput'
import { GlobalContext } from './GlobalState'

// import InputField from './InputField';

class CommentReply extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showTextBox: false,
            showEditBox: false,
        }
    }

    handleCommentPost = () => {
        this.setState({
            showTextBox: !this.state.showTextBox,
        })
    }

    handleEditPost = () => {
        console.log(
            'commentData for this id',
            this.props.commentData[this.props.commentId]
        )
        // console.log('getCommentEdit', this.props.getCommentEdit)
        // console.log('getCommentReply', this.props.getCommentReply)
        this.setState({
            showEditBox: !this.state.showEditBox,
        })
    }

    closeEditPost = () => {
        this.setState({
            showEditBox: false,
        })
    }

    render() {
        return (
            <div className="commentReplyEdit-container">
                <div className="replyEdit-btn-container">
                    {this.state.showEditBox ? null : (
                        <div
                            className="comment-reply"
                            onClick={this.handleCommentPost}
                        >
                            Reply
                        </div>
                    )}
                    {this.props.commentData[this.props.commentId].author ===
                        this.context.userData.name &&
                        !this.state.showTextBox && (
                            <button
                                className="comment-submit"
                                onClick={this.handleEditPost}
                            >
                                Edit
                            </button>
                        )}
                </div>
                {this.state.showEditBox ? null : (
                    <CommentReplyInput
                        getCommentReply={this.props.getCommentReply}
                        showTextBox={this.state.showTextBox}
                        commentId={this.props.commentId}
                        parent_Id={this.props.parent_Id}
                        commentData={this.props.commentData}
                        handleCommentPost={this.handleCommentPost}
                        showTextBox={this.state.showTextBox}
                    />
                )}
                {this.state.showTextBox ? null : (
                    <CommentEditInput
                        getCommentReply={this.props.getCommentReply}
                        commentData={this.props.commentData}
                        commentId={this.props.commentId}
                        accessToken={this.context.accessToken}
                        user={this.context.userData.name}
                        handleEditPost={this.handleEditPost}
                        showEditBox={this.state.showEditBox}
                        closeEditPost={this.closeEditPost}
                        getCommentEdit={this.props.getCommentEdit}
                        oldChildArr={
                            this.props.commentData[this.props.commentId]
                                .childIds
                        }
                        author={
                            this.props.commentData[this.props.commentId].author
                        }
                    />
                )}
            </div>
        )
    }
}

export default CommentReply

CommentReply.contextType = GlobalContext
