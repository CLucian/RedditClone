import React from 'react'
import axios from 'axios'

// import SubscribedSubreddits from '../profile/SubscribedSubreddits'
import { GlobalContext } from '../GlobalState'
import SubredditLinks from '../profile/SubredditLinks'
import { Link } from 'react-router-dom'

class SideBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subredditDataArr: null,
            isLoading: true,
        }
    }

    getSubreddits = () => {
        return axios({
            method: 'GET',
            url: `https://oauth.reddit.com/subreddits/mine/subscriber?limit=10`,
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

    componentDidMount() {
        if (this.context.accessToken) {
            console.log('accessToken in sidebar', this.context.accessToken)
            this.getSubreddits()
        }
    }

    render() {
        // if (this.context.accessToken) {
        //     // this.getSubreddits()
        //     for (let i = 0; i < 1; i++) {
        //         this.getSubreddits()
        //     }
        // }

        console.log('access token in sidebar', this.context.accessToken)
        if (this.state.isLoading) {
            return 'Loading...'
        }

        return (
            // <div className="sidebar-nav">
            <div className="subbed-reddit-links">
                <div className="menu">Subscribed subreddits</div>
                <ul className="subreddit-links">
                    {this.state.subredditDataArr.map((subreddit) => {
                        return (
                            <li className="list-item-subreddit">
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
