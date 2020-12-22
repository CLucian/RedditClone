import React from 'react'
import postComment from '../../queries/postComment'

import './postComment.scss'

class PostComment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: '',
        }
    }

    handleSubmit = (e) => {
        if (this.state.comment?.length > 1) {
            e.preventDefault()
            postComment(this.props.data.name, this.state.comment)
                .then((response) => {
                    console.log('response in postComment', response)
                    if (response.data.json.errors.length > 0) {
                        alert(response.data.json.errors[0][1])
                    } else {
                        alert(
                            `Your comment '${this.state.comment}' has been submitted`
                        )
                        this.props.getParentComment(response)
                    }
                    this.setState({
                        comment: '',
                    })
                })
                .catch((err) =>
                    alert(`There was an error submitting your comment ${err}`)
                )
        }
    }

    handleResponse = () => {}

    handleChange = (e) => {
        this.setState({
            comment: e.target.value,
        })
    }

    render() {
        return (
            <div className="postComments__container">
                <form
                    className="postComments__form"
                    onSubmit={this.handleSubmit}
                >
                    <textarea
                        className="postComments__text"
                        placeholder="What's on your mind?"
                        onChange={this.handleChange}
                        value={this.state.comment}
                    ></textarea>
                    <div className="postComments__submit__container">
                        <button
                            className="postComments__submit__btn"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default PostComment
