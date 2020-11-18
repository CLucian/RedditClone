import React from 'react'
import qs from 'qs'
import Axios from 'axios'

class CommentEditInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            editBox: false,
        }
    }

    editComment = () => {
        const data = {
            api_type: 'json',
            thing_id: this.props.commentData[this.props.commentId].name,
            text: this.state.value,
        }
        Axios({
            method: 'post',
            url: 'https://oauth.reddit.com/api/editusertext',
            headers: {
                Authorization: 'bearer ' + this.props.accessToken,
                'content-type': 'application/x-www-form-urlencoded',
                // "Content-Type": "application/x-www-form-urlencoded"
            },
            data: qs.stringify(data),
        })
            .then((response) => {
                alert(
                    '=========Your commentEdit has gone through=========, ' +
                        response
                )
                console.log('your edited comment', response)
                console.log(
                    'modified object passed in getCommentReply',
                    response.data.json.data.things[0].data
                )
                console.log('object id', this.props.commentId)
                // console.log('this.state.value', this.state.value)
                // console.log('this is the response', response)
                // console.log('response data', response.data)
                if (response.data.json.errors[0] !== undefined) {
                    response.data.json.errors[0].map((err) => {
                        return alert(err)
                    })
                } else {
                    this.props.getCommentEdit(
                        response.data.json.data.things[0].data,
                        this.props.oldChildArr
                        // this.props.commentId
                    )
                }
                // this.props.closeEditPost()
            })
            .catch((err) => {
                console.log(err)
                console.log('what is the error', err.data)
                alert('There was an error' + err)
                // this.props.closeEditPost()
                // console.log("accessToken" + this.context.accessToken);
                // console.log("textvalue", this.state.value);
                // console.log("thing_id", this.props.commentId);
            })
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        if (this.state.value) {
            console.log(
                'submitting',
                this.props,
                this.state.value,
                this.props.commentId
            )
            this.setState({ value: this.state.value }, () => {
                this.editComment()
            })
        } else {
            alert('Please type something')
        }
        this.props.closeEditPost()
    }

    // toggleEdit = () => {
    //     this.setState({
    //         editBox: !this.state.editBox,
    //     })
    // }

    render() {
        console
            .log
            // 'this.props.commentData',
            ()
        return (
            <div className="edit-input-container">
                {/* {this.props.author === this.props.user && (
                    <button
                        className="comment-submit"
                        onClick={this.toggleEdit}
                    >
                        Edit
                    </button>
                )} */}
                {this.props.showEditBox ? (
                    <form className="comment-form" onSubmit={this.handleSubmit}>
                        <textarea
                            placeholder={
                                this.props.commentData[this.props.commentId]
                                    .body
                            }
                            type="textarea"
                            wrap="physical"
                            value={this.state.textInput}
                            onChange={this.handleChange}
                        ></textarea>
                        <div className="comment-buttons">
                            {this.state.value}
                            <button
                                className="cancel-comment"
                                onClick={this.props.handleEditPost}
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

export default CommentEditInput
