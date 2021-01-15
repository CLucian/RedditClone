import React from 'react'

import { GlobalContext } from '../GlobalState'
import SubredditSearch from '../search/SubredditSearch'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import submitPost from '../../queries/createPostPage'

toast.configure()
export default class CreatePostPage extends React.Component {
    constructor() {
        super()
        this.state = {
            title: null,
            subreddit: null,
            type: 'self',
            text: null,
            showSuggestions: false,
        }
    }

    postToast = (response) => {
        if (response) {
            toast.error(response, {
                position: toast.POSITION.TOP_CENTER,
            })
        } else {
            toast.success('Your post has gone through successfully!', {
                position: toast.POSITION.TOP_CENTER,
            })
        }
    }

    handleChange = (e) => {
        if (e.target.name === 'subreddit') {
            this.setState({
                [e.target.name]: e.target.value,
                showSuggestions: true,
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value,
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (
            this.state.subreddit !== null &&
            this.state.title !== null &&
            this.state.title.length > 0 &&
            this.state.subreddit.length > 0
        ) {
            submitPost(
                this.state.title,
                this.state.subreddit,
                this.state.type,
                this.state.text
            )
                .then((response) => {
                    this.postToast()
                    this.setState({
                        title: '',
                        subreddit: '',
                        text: '',
                        showSuggestions: false,
                    })
                    if (response.data.success === false) {
                        this.postToast(response.data.jquery[14][3])
                    }
                })
                .catch((err) => console.log(err))
        }
    }

    setSubreddit = (subreddit) => {
        this.setState({
            subreddit,
            showSuggestions: false,
        })
    }

    clickedOutside = () => {
        this.setState({
            showSuggestions: false,
        })
    }

    render() {
        return (
            <div>
                <div className="create-post-header">Create Post</div>
                <div className="create-post-page-container">
                    <form
                        className="create-post-form"
                        type="submit"
                        onSubmit={this.handleSubmit}
                    >
                        <div className="additional-post-info">
                            <div className="create-post-page-subreddit">
                                <input
                                    type="text"
                                    name="subreddit"
                                    placeholder="Choose a Subreddit"
                                    value={this.state.subreddit}
                                    onChange={this.handleChange}
                                    autoComplete="off"
                                    required="required"
                                />
                                <SubredditSearch
                                    query={this.state.subreddit}
                                    token={this.context.accessToken}
                                    getSubreddit={this.getSubreddit}
                                    setSubreddit={this.setSubreddit}
                                    showSuggestions={this.state.showSuggestions}
                                    clickedOutside={this.clickedOutside}
                                />
                            </div>
                        </div>

                        <div className="create-post-page-title-container">
                            <div className="create-post-page-title">
                                <input
                                    className="title-input"
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                    maxLength="300"
                                    required="required"
                                    autoComplete="off"
                                />
                                <span className="post-input-char-limit">{`${
                                    this.state.title
                                        ? this.state.title.length
                                        : 0
                                }/300`}</span>
                            </div>
                        </div>

                        <div className="create-post-page-body">
                            <div className="text-container">
                                <textarea
                                    className="reply-text-area"
                                    placeholder="Text (optional)"
                                    name="text"
                                    type="textarea"
                                    wrap="physical"
                                    value={this.state.text}
                                    onChange={this.handleChange}
                                ></textarea>
                            </div>
                        </div>
                        <button className="post-submit" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

CreatePostPage.contextType = GlobalContext
