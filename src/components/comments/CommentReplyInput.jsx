import React from 'react'

import postComment from '../../queries/commentReplyInput'
import { GlobalContext } from '../GlobalState'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
class CommentReplyInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            responseObject: null,
        }
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        })
    }

    toastFail = (resp) => {
        toast.error(resp, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        })
    }

    toastSuccess = (resp) => {
        toast.success(resp, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        if (this.state.value.length > 0) {
            this.setState({ value: this.state.value }, () => {
                postComment(
                    this.props.commentData[this.props.commentId].name,
                    this.state.value
                )
                    .then((response) => {
                        if (response.data.json.errors[0] !== undefined) {
                            this.toastFail(response.data.json.errors[0][1])
                        } else {
                            this.toastSuccess('Your comment has gone through!')
                            this.props.getCommentReply(
                                response.data.json.data.things[0].data,
                                this.props.commentId
                            )
                        }
                    })
                    .catch((err) => console.log(err))
            })
        } else {
            this.toastFail('Please type something')
        }
        this.props.handleCommentPost()
    }

    render() {
        return (
            <div className="reply-input-container">
                {this.props.showTextBox ? (
                    <form className="comment-form" onSubmit={this.handleSubmit}>
                        <textarea
                            className="post-text-area"
                            placeholder="What's on your mind?"
                            type="textarea"
                            wrap="physical"
                            value={this.state.textInput}
                            onChange={this.handleChange}
                        ></textarea>
                        <div className="comment-buttons">
                            <button
                                className="cancel-comment"
                                onClick={this.props.handleCommentPost}
                                type="button"
                            >
                                Cancel
                            </button>
                            <button className="comment-submit" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                ) : null}
            </div>
        )
    }
}

export default CommentReplyInput

CommentReplyInput.contextType = GlobalContext
