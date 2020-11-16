import React from 'react'
import axios from 'axios'

import { GlobalContext } from './GlobalState'
import SubredditLinks from './SubredditLinks'

class SideBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subredditDataArr: null,
            isLoading: true,
        }
    }

    componentDidMount() {
        const getSubreddits = () => {
            return axios({
                method: 'GET',
                url: `https://oauth.reddit.com/subreddits/mine/subscriber`,
                headers: {
                    Authorization: 'bearer ' + this.context.accessToken,
                },
            })
                .then((response) => {
                    console.log('subreddit response - sidebar', response)
                    this.setState({
                        subredditDataArr: response.data.data.children,
                        isLoading: false,
                    })
                })
                .catch((err) => {
                    console.log('Home Component Error: ', err)
                })
        }
        getSubreddits()
    }

    render() {
        if (this.state.isLoading) {
            return 'Loading...'
        }

        return (
            <div className="sidebar-nav">
                <div className="menu">Subreddits</div>
                <ul className="subreddit-links">
                    {this.state.subredditDataArr.map((subreddit) => {
                        return (
                            <li className="list-item-subreddit">
                                <SubredditLinks data={subreddit.data} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default SideBar

SideBar.contextType = GlobalContext
