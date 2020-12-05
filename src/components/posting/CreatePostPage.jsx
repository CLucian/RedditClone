import React from 'react'

import { GlobalContext } from '../GlobalState'
import SubredditSearch from '../search/SubredditSearch'

import Axios from 'axios'
import qs from 'qs'

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

    submitPost = () => {
        const data = {
            title: this.state.title,
            sr: this.state.subreddit,
            kind: this.state.type,
            text: this.state.text,
        }
        Axios({
            method: 'post',
            url: 'https://oauth.reddit.com/api/submit',
            headers: {
                Authorization: 'bearer ' + this.context.accessToken,
                'content-type': 'application/x-www-form-urlencoded',
                // "Content-Type": "application/x-www-form-urlencoded"
            },
            data: qs.stringify(data),
        })
            .then((response) => {
                alert('your post has gone through, ' + response)
                if (response.data.success === false) {
                    alert(response.data.jquery[14][3])
                }
                console.log(
                    ' this is the response from the create post page',
                    response
                )
            })
            .catch((err) => {
                console.log(err)
                console.log('what is the error', err.data)
                alert('There was an error' + err)
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            showSuggestions: true,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.title.length > 0 && this.state.subreddit.length > 0) {
            this.submitPost()
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
                        <div className="post-type">
                            <select
                                className="post-select"
                                name="type"
                                onChange={this.handleChange}
                            >
                                <option
                                    selected="link"
                                    name="type"
                                    value="self"
                                >
                                    Text
                                </option>
                                <option name="type" value="link">
                                    Link
                                </option>
                            </select>
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
                            {/* <label className="post-input-title">Title</label> */}
                            <span className="post-input-char-limit">{`${
                                this.state.title ? this.state.title.length : 0
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
                    <div>Title state{this.state.title}</div>
                    <div>subreddit state {this.state.subreddit}</div>
                    <div>type state {this.state.type}</div>
                    <div>body state{this.state.text}</div>
                    <button className="comment-submit" type="submit">
                        Post
                    </button>
                </form>
            </div>
        )
    }
}

CreatePostPage.contextType = GlobalContext
