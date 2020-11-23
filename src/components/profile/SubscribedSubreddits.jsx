import React from 'react'

import axios from 'axios'
import { GlobalContext } from '../GlobalState'
import SubredditList from './SubredditList'

class SubscribedSubreddits extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subredditDataArr: null,
        }
    }

    componentDidMount() {
        const getSubreddits = () => {
            return axios({
                method: 'GET',
                url: `https://oauth.reddit.com/subreddits/mine/subscriber?limit=100`,
                headers: {
                    Authorization: 'bearer ' + this.context.accessToken,
                },
            })
                .then((response) => {
                    console.log('subreddit response - sidebar', response)
                    this.setState({
                        subredditDataArr: response.data.data.children,
                    })
                })
                .catch((err) => {
                    console.log('Home Component Error: ', err)
                })
        }
        getSubreddits()
    }

    render() {
        console.log('subscribedsubreddits', this.state.subredditDataArr)
        return (
            <div className="subreddit-page-container">
                <div className="subreddit-page-title">
                    Subscribed Subreddits
                </div>
                {this.state.subredditDataArr &&
                    this.state.subredditDataArr.map((subredditData) => {
                        return <SubredditList data={subredditData} />
                    })}
            </div>
        )
    }
}

export default SubscribedSubreddits

SubscribedSubreddits.contextType = GlobalContext
