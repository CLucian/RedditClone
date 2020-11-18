import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

import Post from '../post.component'

import BestSVG from '../svg-components/BestSVG'
import HotSVG from '../svg-components/HotSVG'
import NewSVG from '../svg-components/NewSVG'
import TopSVG from '../svg-components/TopSVG'
import RisingSVG from '../svg-components/RisingSVG'

import { GlobalContext } from '../GlobalState'

const sortOptions = [
    { name: 'Best', value: 'best', icon: <BestSVG /> },
    { name: 'Hot', value: 'hot', icon: <HotSVG /> },
    { name: 'New', value: 'new', icon: <NewSVG /> },
    { name: 'Top', value: 'top', icon: <TopSVG /> },
    { name: 'Rising', value: 'rising', icon: <RisingSVG /> },
]

class Subreddit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subredditData: null,
            isLoading: true,
            category: 'best',
        }
    }

    getSubredditPosts = () => {
        return axios({
            method: 'GET',
            url: `https://oauth.reddit.com/r/${this.props.match.params.id}/${this.state.category}`,
            headers: {
                Authorization: 'bearer ' + this.context.accessToken,
            },
        })
            .then((response) => {
                console.log(
                    'subreddit response - subreddit component!',
                    response
                )
                this.setState({
                    subredditData: response.data.data.children,
                    isLoading: false,
                })
            })
            .catch((err) => {
                console.log('Home Component Error: ', err)
            })
    }

    componentDidMount() {
        this.getSubredditPosts()
    }

    handleClick = (val) => {
        this.setState(
            {
                category: val,
            },
            () => this.getSubredditPosts()
        )
        // this.getSubredditPosts(val)
    }

    render() {
        if (this.state.isLoading) {
            return '...loading'
        }
        return (
            <div>
                <div className="sort-container">
                    <div className="sortByMenuContainer">
                        <div className="sort-by-text">Sort By:</div>
                        {sortOptions.map((option) => (
                            <div
                                // onClick={() => this.getHomePage('best')}
                                onClick={() => this.handleClick(option.value)}
                                // className={`menu-svg-container ${
                                //     this.state.sortBy === option.value
                                //         ? 'active'
                                //         : ''
                                // }`}
                                className="menu-svg-container"
                                // id={this.state.sortBy === 'best' && 'best'}
                            >
                                {option.icon}
                                <div className="sort-by-text">
                                    {option.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {this.state.subredditData.map((postData) => {
                    return (
                        <Post
                            onClick={this.openModal}
                            postData={postData}
                            accessToken={this.context.accessToken}
                            key={postData.data.id}
                        />
                    )
                })}
            </div>
        )
    }
}

export default withRouter(Subreddit)

Subreddit.contextType = GlobalContext
