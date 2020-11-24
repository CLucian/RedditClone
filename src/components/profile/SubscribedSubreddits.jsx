import React from 'react'

import axios from 'axios'
import { GlobalContext } from '../GlobalState'
import SubredditList from './SubredditList'

class SubscribedSubreddits extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subredditDataArr: null,
            before: null,
            after: null,
            page: 1,
        }
    }

    getSubreddits = (pageDir) => {
        let url = `https://oauth.reddit.com/subreddits/mine/subscriber?limit=10`
        if (pageDir === 'next') {
            url = `https://oauth.reddit.com/subreddits/mine/subscriber?count=555&after=${this.state.after}&limit=10`
            // url = `https://oauth.reddit.com/count=555?after=${this.state.after}`
        } else if (pageDir === 'prev') {
            url = `https://oauth.reddit.com/subreddits/mine/subscriber?count=555&before=${this.state.before}&limit=10`
        }
        return axios({
            method: 'GET',
            url: url,
            headers: {
                Authorization: 'bearer ' + this.context.accessToken,
            },
        })
            .then((response) => {
                console.log('subreddit response - sidebar', response)
                this.setState({
                    subredditDataArr: response.data.data.children,
                    before: response.data.data.before,
                    after: response.data.data.after,
                })
            })
            .catch((err) => {
                console.log('Home Component Error: ', err)
            })
    }

    componentDidMount() {
        this.getSubreddits()
    }

    getPage = (pageDir) => {
        if (pageDir === 'next') {
            this.setState(
                {
                    page: this.state.page + 1,
                },
                () => this.getSubreddits(pageDir)
            )
        } else if (pageDir === 'prev') {
            this.setState(
                {
                    page: this.state.page - 1,
                },
                () => this.getSubreddits(pageDir)
            )
        }
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
                <div className="pagination-container">
                    {this.state.before && this.state.page > 1 && (
                        <div
                            onClick={() => {
                                this.getPage('prev')
                            }}
                            className="pagination"
                        >
                            Prev Page
                        </div>
                    )}
                    {this.state.after && (
                        <div
                            onClick={() => {
                                this.getPage('next')
                            }}
                            className="pagination"
                        >
                            Next Page
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default SubscribedSubreddits

SubscribedSubreddits.contextType = GlobalContext
