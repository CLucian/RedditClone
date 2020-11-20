import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

import marked from 'marked'
import DOMPurify from 'dompurify'

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
            currentSubreddit: null,
        }
    }

    getSubreddit = () => {
        return axios({
            method: 'GET',
            url: `https://oauth.reddit.com/r/${this.props.match.params.id}/about/`,
            headers: {
                Authorization: 'bearer ' + this.context.accessToken,
            },
        })
            .then((response) => {
                console.log('subreddit subreddit response', response)
                this.setState({
                    currentSubreddit: response.data.data,
                })
            })
            .catch((err) => {
                console.log('Home Component Error: ', err)
            })
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
        this.getSubreddit()
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

    getMarkDown = (markDown) => {
        if (markDown) {
            const rawMarkup = marked(markDown)
            const clean = DOMPurify.sanitize(rawMarkup)
            return { __html: clean }
        } else {
            return {
                __html: '',
            }
        }
    }

    render() {
        if (this.state.isLoading) {
            return '...loading'
        }

        const {
            banner_background_image,
            title,
            community_icon,
            banner_background_color,
            banner_img,
            header_img,
            icon_img,
            display_name_prefixed,
            public_description,
        } = this.state.currentSubreddit

        return (
            <div>
                <div className="subreddit-header-banner">
                    <img
                        className="subreddit-header-img"
                        src={
                            banner_background_image.split('?width')[0] ||
                            banner_img
                        }
                    />
                </div>
                <div className="subreddit-banner-header">
                    <div className="subreddit-display-container">
                        <img
                            className="display-image"
                            src={
                                community_icon.split('?width')[0] ||
                                icon_img ||
                                `https://styles.redditmedia.com/t5_vm1db/styles/communityIcon_5nthugyr0ef21.png?width=256&s=3a163f7135b93df0dab0921dba35f760baea5945`
                            }
                        />
                    </div>
                    <div className="subreddit-title-homepage">
                        {display_name_prefixed}
                    </div>
                    <div
                        className="subreddit-page-description"
                        dangerouslySetInnerHTML={this.getMarkDown(
                            public_description
                        )}
                    ></div>
                </div>
                <div className="sort-container">
                    <div className="sortByMenuContainer">
                        <div className="sort-by-text">Sort By:</div>
                        {sortOptions.map((option) => (
                            <div
                                // onClick={() => this.getHomePage('best')}
                                onClick={() => this.handleClick(option.value)}
                                className={`menu-svg-container ${
                                    this.state.category === option.value
                                        ? 'active'
                                        : ''
                                }`}
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
