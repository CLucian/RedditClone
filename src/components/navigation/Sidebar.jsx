import React from 'react'
// import axios from 'axios'

import { GlobalContext } from '../GlobalState'
import SubredditLinks from '../profile/SubredditLinks'
import { Link } from 'react-router-dom'

import getSubreddits from '../../queries/sideBar'

class SideBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subredditDataArr: null,
            isLoading: true,
        }
    }

    componentDidMount() {
        if (this.context.accessToken) {
            // console.log('accessToken in sidebar', this.context.accessToken)
            getSubreddits()
                .then((response) => {
                    this.setState({
                        subredditDataArr: response.data.data.children,
                        isLoading: false,
                    })
                })
                .catch((err) => {
                    console.log('caught sidebar', err)
                })
        }
    }

    render() {
        if (this.state.isLoading) {
            return 'Loading...'
        }

        return (
            <div className="subbed-reddit-links">
                <div className="menu">Subscribed subreddits</div>
                <ul className="subreddit-links">
                    {this.state.subredditDataArr.map((subreddit) => {
                        return (
                            <li
                                className="list-item-subreddit"
                                key={subreddit.data.id}
                            >
                                <SubredditLinks data={subreddit.data} />
                            </li>
                        )
                    })}
                </ul>
                <div className="more-subreddits">
                    <Link id="more-subreddits-link" to="/me/subreddits">
                        See all your subreddits
                    </Link>
                </div>
            </div>
            /* </div> */
        )
    }
}

export default SideBar

SideBar.contextType = GlobalContext
