import React from 'react'

import axios from 'axios'

class SubredditInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subs: null,
        }
    }

    getSubredditInfo = () => {
        return axios({
            method: 'GET',
            url: `https://oauth.reddit.com/r/${this.props.subreddit}/about/`,
            headers: {
                Authorization: 'bearer ' + this.props.token,
            },
        })
            .then((response) => {
                console.log('subreddit subreddit response', response)
                this.setState({
                    subs: response.data.data.subscribers,
                })
            })
            .catch((err) => {
                console.log('Home Component Error: ', err)
            })
    }

    componentDidMount() {
        this.getSubredditInfo()
    }

    render() {
        return (
            <div className="subreddit-subscribers-container">
                {this.state.subs} members
            </div>
        )
    }
}

export default SubredditInfo
