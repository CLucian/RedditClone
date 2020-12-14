import React from 'react'

import axios from 'axios'
import { GlobalContext } from '../GlobalState'
import SubredditList from './SubredditList'

import getSubreddits from '../../queries/subscribedSubreddits'

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

    componentDidMount() {
        getSubreddits().then((response) => {
            this.handleResponse(response)
        })
    }

    handleResponse = (response) => {
        this.setState({
            subredditDataArr: response.data.data.children,
            before: response.data.data.before,
            after: response.data.data.after,
        })
    }

    getPage = (pageDir) => {
        if (pageDir === 'next') {
            this.setState(
                {
                    page: this.state.page + 1,
                },
                () =>
                    getSubreddits(pageDir, this.state.after).then(
                        (response) => {
                            this.handleResponse(response)
                        }
                    )
            )
        } else if (pageDir === 'prev') {
            this.setState(
                {
                    page: this.state.page - 1,
                },
                () =>
                    this.getSubreddits(pageDir, this.state.before).then(
                        (response) => {
                            this.handleResponse(response)
                        }
                    )
            )
        }
    }

    render() {
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
