import React from 'react'
import CommentReplyInput from './CommentReplyInput'
import CommentEditInput from './CommentEditInput'
import { GlobalContext } from '../GlobalState'

// import InputField from './InputField';

class CommentReply extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showTextBox: false,
            showEditBox: false,
            confirm: false,
        }
    }

    handleCommentPost = () => {
        this.setState({
            showTextBox: !this.state.showTextBox,
        })
    }

    handleEditPost = () => {
        this.setState({
            showEditBox: !this.state.showEditBox,
        })
    }

    closeEditPost = () => {
        this.setState({
            showEditBox: false,
        })
    }

    deleteBtn = () => {
        this.setState({
            confirm: !this.state.confirm,
        })
    }

    deleted = () => {
        this.props.commentDelete(
            this.props.commentData[this.props.commentId].name,
            this.props.commentData[this.props.commentId].id,
            this.props.commentData[this.props.commentId].parent_id.substring(3)
        )
        this.setState({
            confirm: false,
        })
    }

    render() {
        console.log(
            'this.props.commentData in CommentReply',
            this.props.commentData
        )
        console.log(
            'this.props.commentId in CommentReply',
            this.props.commentId
        )
        return (
            <div className="commentReplyEdit-container">
                <div className="replyEdit-btn-container">
                    <div className="replyEdit-duo-btn">
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
                    {this.props.commentData[this.props.commentId].author ===
                        this.context.userData.name &&
                        !this.state.confirm && (
                            <button
                                className="delete-btn"
                                onClick={this.deleteBtn}
                            >
                                Delete
                            </button>
                        )}
                    {/* {this.props.commentData[this.props.commentId].author ===
                        this.context.userData.name &&
                        this.state.confirm && (
                            <div className="confirm-div">
                                <div className="confirm-text">
                                    <p>
                                        Are you sure you want to delete this
                                        comment?
                                    </p>
                                </div>
                                <div className="confirm-btns">
                                    <button
                                        className="yes-btn"
                                        // onClick={this.deleted}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        className="no-btn"
                                        // onClick={this.deleteBtn}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        )} */}
                </div>
                {this.props.commentData[this.props.commentId].author ===
                    this.context.userData.name &&
                    this.state.confirm && (
                        <div className="confirm-div">
                            <div className="confirm-text">
                                <p>
                                    Are you sure you want to delete this
                                    comment?
                                </p>
                            </div>
                            <div className="confirm-btns">
                                <button
                                    className="yes-btn"
                                    onClick={this.deleted}
                                >
                                    Yes
                                </button>
                                <button
                                    className="no-btn"
                                    onClick={this.deleteBtn}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    )}
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

// {
//     !this.state.confirm ? (
//         <div className="delete-div">
//             <button className="delete-btn" onClick={this.deleteBtn}>
//                 Delete Comment
//             </button>
//         </div>
//     ) : (
//         <div className="confirm-div">
//             <div className="confirm-text">
//                 <p>Are you sure you want to delete this comment?</p>
//             </div>
//             <div className="confirm-btns">
//                 <button className="yes-btn" onClick={this.deleted}>
//                     Yes
//                 </button>
//                 <button className="no-btn" onClick={this.deleteBtn}>
//                     No
//                 </button>
//             </div>
//         </div>
//     )
// }
