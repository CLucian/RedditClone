import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { debounce } from 'lodash'

import marked from 'marked'
import DOMPurify from 'dompurify'

import CreatePost from '../posting/CreatePost'
import Post from '../post.component'
import SearchSubreddit from '../search/SearchSubreddit'

import Users from '../svg-components/Users'
import BestSVG from '../svg-components/BestSVG'
import HotSVG from '../svg-components/HotSVG'
import NewSVG from '../svg-components/NewSVG'
import TopSVG from '../svg-components/TopSVG'
import RisingSVG from '../svg-components/RisingSVG'

import { GlobalContext } from '../GlobalState'
import {
    searchSubreddit,
    getSubredditDetails,
    getSubredditPosts,
    currentSubreddit,
} from '../../queries/subredditSearch'

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
            before: null,
            after: null,
            page: 1,
            subreddit: this.props.match.params.id,
            query: null,
        }

        this.handleSearchQuery = debounce(this.handleSearchQuery, 500)
    }

    componentDidMount() {
        getSubredditPosts(null, this.state.subreddit, null, 'best', null).then(
            (response) => {
                this.handlePostsResponse(response)
            }
        )
        getSubredditDetails(this.state.subreddit).then((response) => {
            this.handleSubredditData(response)
        })
    }

    handleClick = (val) => {
        this.setState(
            {
                category: val,
            },
            () =>
                getSubredditPosts(
                    null,
                    this.state.subreddit,
                    null,
                    this.state.category,
                    null
                ).then((response) => {
                    this.handlePostsResponse(response)
                })
        )
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

    getPage = (pageDir) => {
        const newPage =
            pageDir === 'next' ? this.state.page + 1 : this.state.page - 1
        const pageId = pageDir === 'next' ? this.state.after : this.state.before

        console.log('getpage pressed', pageDir)
        this.setState(
            {
                page: newPage,
            },
            () =>
                getSubredditPosts(
                    pageDir,
                    this.state.subreddit,
                    pageId,
                    this.state.category,
                    this.state.query
                ).then((response) => {
                    this.handlePostsResponse(response)
                })
        )
    }

    handleSearchQuery = (queryString) => {
        if (queryString.length === 0) {
            this.setState(
                {
                    query: null,
                    page: 1,
                },
                () => {
                    getSubredditPosts(
                        null,
                        this.state.subreddit,
                        null,
                        this.state.category,
                        this.state.query
                    ).then((response) => {
                        this.handlePostsResponse(response)
                    })
                }
            )
        } else {
            this.setState(
                {
                    query: queryString,
                    page: 1,
                },
                () => {
                    getSubredditPosts(
                        null,
                        this.state.subreddit,
                        null,
                        this.state.category,
                        this.state.query
                    ).then((response) => {
                        this.handlePostsResponse(response)
                    })
                }
            )
        }
    }

    handleSubredditData = (response) => {
        this.setState({
            currentSubreddit: response.data.data,
        })
    }

    handlePostsResponse = (response) => {
        this.setState({
            subredditData: response.data.data.children,
            isLoading: false,
            before: response.data.data.before,
            after: response.data.data.after,
        })
    }

    render() {
        if (!this.context.accessToken) {
            return null
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
            active_user_count,
        } = this.state.currentSubreddit || {}

        return (
            <div>
                <div className="subreddit-header-banner">
                    <img
                        className="subreddit-header-img"
                        src={
                            banner_background_image
                                ? banner_background_image.split('?width')[0]
                                : banner_img
                        }
                    />
                </div>
                <div className="subreddit-banner-header">
                    <div className="subreddit-display-container">
                        <img
                            className="display-image"
                            src={
                                community_icon
                                    ? community_icon.split('?width')[0]
                                    : icon_img ||
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
                    <div
                        className="active-users-container"
                        title="Active Users"
                    >
                        <Users />
                        <div className="active-users">{active_user_count}</div>
                    </div>
                </div>
                <div className="sort-container">
                    <div className="sortByMenuContainer">
                        <div className="sort-by-text"></div>
                        {sortOptions.map((option) => (
                            <div
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
                <div className="create-post-master">
                    <div className="create-post-container">
                        <div className="media-post-container">
                            <SearchSubreddit
                                subreddit={this.props.subreddit}
                                handleSearchQuery={this.handleSearchQuery}
                            />
                            <CreatePost />
                        </div>
                    </div>
                </div>

                {this.state.subredditData &&
                    this.state.subredditData.map((postData) => {
                        return (
                            <Post
                                onClick={this.openModal}
                                postData={postData}
                                accessToken={this.context.accessToken}
                                key={postData.data.id}
                            />
                        )
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

export default withRouter(Subreddit)

Subreddit.contextType = GlobalContext
