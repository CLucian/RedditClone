import React from 'react'
import qs from 'qs'
import Axios from 'axios'

import editComment from '../../queries/commentEditInput'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
class CommentEditInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            editBox: false,
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
            autoClose: 5000,
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
                editComment(
                    this.props.commentData[this.props.commentId].name,
                    this.state.value
                )
                    .then((response) => {
                        if (response.data.json.errors[0] !== undefined) {
                            response.data.json.errors[0].map((err) => {
                                return alert(err)
                            })
                        } else {
                            this.props.getCommentEdit(
                                response.data.json.data.things[0].data,
                                this.props.oldChildArr
                            )
                        }
                    })
                    .catch((err) => console.log(err))
            })
        } else {
            this.toastFail('Please type something')
        }
        this.props.closeEditPost()
    }
    render() {
        return (
            <div className="edit-input-container">
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
