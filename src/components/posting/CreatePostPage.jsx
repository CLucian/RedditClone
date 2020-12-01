import React from 'react'

import { GlobalContext } from '../GlobalState'

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
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.title.length > 0 && this.state.subreddit.length > 0) {
            this.submitPost()
        }
    }

    render() {
        return (
            <div className="create-post-page-container">
                <form
                    className="create-post-form"
                    type="submit"
                    onSubmit={this.handleSubmit}
                >
                    <div className="create-post-page-title-container">
                        <div className="create-post-page-title">
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Your post title"
                                value={this.state.title}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="create-post-page-subreddit">
                            <label>Subreddit</label>
                            <input
                                type="text"
                                name="subreddit"
                                placeholder="What subreddit would you like to post to?"
                                value={this.state.subreddit}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="post-type">
                            <label>Post Type</label>
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
                    <div className="create-post-page-body">
                        <label>Post body:</label>
                        <input
                            type="text"
                            name="text"
                            placeholder="Your post body"
                            value={this.state.text}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>Title state{this.state.title}</div>
                    <div>subreddit state {this.state.subreddit}</div>
                    <div>type state {this.state.type}</div>
                    <div>body state{this.state.text}</div>
                    <button className="comment-submit" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

CreatePostPage.contextType = GlobalContext
