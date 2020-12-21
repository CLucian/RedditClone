import React from 'react'

import postComment from '../../queries/commentReplyInput'
import { GlobalContext } from '../GlobalState'

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

    handleSubmit = (e) => {
        e.preventDefault()

        if (this.state.value.length > 0) {
            console.log(
                'submitting',
                this.props,
                this.state.value,
                this.props.commentId
            )
            this.setState({ value: this.state.value }, () => {
                postComment(
                    this.props.commentData[this.props.commentId].name,
                    this.state.value
                )
                    .then((response) => {
                        if (response.data.json.errors[0] !== undefined) {
                            response.data.json.errors[0].map((err) => {
                                return alert(err)
                            })
                        } else {
                            this.props.getCommentReply(
                                response.data.json.data.things[0].data,
                                this.props.commentId
                            )
                            this.context.getAndDisplayComment(
                                this.props.parent_Id,
                                this.state.value
                            )
                        }
                        this.props.handleCommentPost()
                    })
                    .catch((err) => console.log(err))
            })
        } else {
            alert('Please type something')
        }
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
