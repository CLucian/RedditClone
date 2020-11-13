import React from 'react'
import Axios from 'axios'
import qs from 'qs'

import { GlobalContext } from './GlobalState'

class CommentReplyInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            responseObject: null,
            // showTextBox: false,
        }
    }

    postComment = () => {
        const data = {
            api_type: 'json',
            thing_id: this.props.commentData[this.props.commentId].name,
            text: this.state.value,
        }
        Axios({
            method: 'post',
            url: 'https://oauth.reddit.com/api/comment',
            headers: {
                Authorization: 'bearer ' + this.context.accessToken,
                'content-type': 'application/x-www-form-urlencoded',
                // "Content-Type": "application/x-www-form-urlencoded"
            },
            data: qs.stringify(data),
        })
            .then((response) => {
                alert('Your comment has gone through, ' + response)
                // console.log('this.state.value', this.state.value)
                // console.log('this is the response', response)
                // console.log('response data', response.data)
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
            .catch((err) => {
                console.log(err)
                console.log('what is the error', err.data)
                alert('There was an error' + err)
                this.props.closeReply()
                // console.log("accessToken" + this.context.accessToken);
                // console.log("textvalue", this.state.value);
                // console.log("thing_id", this.props.commentId);
            })
    }

    // handleCommentPost = () => {
    //     this.setState({
    //         showTextBox: !this.state.showTextBox,
    //     })
    // }

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        })
    }

    // closeCommentPost = () => {
    //     this.setState({
    //         showTextBox: false,
    //     })
    // }

    handleSubmit = (e) => {
        e.preventDefault()

        if (this.state.value.length > 0) {
            // console.log(this.props.commentData, this.state.value, this.props.commentId)
            console.log(
                'submitting',
                this.props,
                this.state.value,
                this.props.commentId
            )
            this.setState({ value: this.state.value }, () => {
                this.postComment()
            })
        } else {
            alert('Please type something')
        }
    }

    render() {
        // console.log('input', this.props.getCommentReply)
        // console.log(
        //     'this.props.commentData[commentId]',
        //     this.props.commentData[this.props.commentId]
        // )
        // console.log('this.props.commentData', this.props.commentData)
        // console.log('this.props.commentId', this.props.commentId)
        //   console.log('this.props.getCommentReply', this.props.getCommentReply);
        //   console.log("this.context.accessToken - CommentReplyInput", this.context.accessToken);

        return (
            <div className="reply-input-container">
                {/* <div className="comment-reply" onClick={this.handleCommentPost}>
                    Reply
                </div> */}
                {this.props.showTextBox ? (
                    <form className="comment-form" onSubmit={this.handleSubmit}>
                        <textarea
                            className="reply-text-area"
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
                {/* <PostComment
          textValue={this.state.value}
          commentId={this.props.commentId}
        /> */}
            </div>
        )
    }
}

export default CommentReplyInput

CommentReplyInput.contextType = GlobalContext
