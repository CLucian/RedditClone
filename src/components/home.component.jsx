import React from 'react'

import axios from 'axios'
import getAxios from '../queries/axios'
import { withRouter, Link } from 'react-router-dom'
import { debounce } from 'lodash'

import Post from './post.component'
import getHomePage, { getSearchQuery } from '../queries/postQuery'
import Login from './Login'
import Modal from './modal/Modal'
import CreatePost from './posting/CreatePost'
import { MasterSearchContext } from '../components/search/MasterSearchProvider'

import { handlePages } from '../utils/pagination'

import BestSVG from './svg-components/BestSVG'
import HotSVG from './svg-components/HotSVG'
import NewSVG from './svg-components/NewSVG'
import RisingSVG from './svg-components/RisingSVG'
import TopSVG from './svg-components/TopSVG'

import { GlobalContext } from './GlobalState'
import { getFeed } from '../queries/feed'
import MasterSearch from './search/MasterSearch'

const sortOptions = [
    { name: 'Best', value: 'best', icon: <BestSVG /> },
    { name: 'Hot', value: 'hot', icon: <HotSVG /> },
    { name: 'New', value: 'new', icon: <NewSVG /> },
    { name: 'Top', value: 'top', icon: <TopSVG /> },
    { name: 'Rising', value: 'rising', icon: <RisingSVG /> },
]

const CLIENT_ID = 'MMej7E1hI1x82A'
const REDIRECT_URI = 'http://localhost:3000/authorize'
const DURATION = 'permanent'
const SCOPE =
    'identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread'
const getAuthorizationURL = () =>
    `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${Math.random()}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE}`

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            feedData: null,
            isLoading: true,
            showModal: false,
            listOpen: false,
            sortBy: 'best',
            clicked: '',
            after: null,
            before: null,
            page: 1,
            pageDir: null,
            isQuery: false,
        }
    }

    componentDidMount() {
        // if (this.context.accessToken) {
        getHomePage()
            .then((response) => {
                this.handleDataResponse(response)
            })
            .catch((err) => {
                return err
                console.log('err retrieving feed in home component', err)
            })
        // }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.query !== this.props.query) {
            this.handleQuerySearch()
        }
    }

    handleQuerySearch = debounce(() => {
        getSearchQuery(
            this.state.sortBy,
            undefined,
            undefined,
            this.props.query
        ).then((response) => {
            this.setState({
                feedData: response.data.data.children,
                after: response.data.data.after,
                before: response.data.data.before,
                isQuery: true,
            })
        })
    }, 300)

    handleSort = (category) => {
        this.setState(
            {
                sortBy: category,
            },
            () =>
                getHomePage(category, undefined, undefined).then((response) => {
                    this.handleDataResponse(response)
                })
        )
    }

    handleDataResponse = (response, queryState) => {
        this.setState({
            feedData: response.data.data.children,
            isLoading: false,
            after: response.data.data.after,
            before: response.data.data.before,
            isQuery: queryState,
        })
    }

    getPage = (pageDir) => {
        const newPage =
            pageDir === 'next' ? this.state.page + 1 : this.state.page - 1
        const ids = pageDir === 'next' ? this.state.after : this.state.before

        if (this.state.isQuery) {
            this.setState({ page: newPage }, () => {
                getSearchQuery(
                    this.state.sortBy,
                    pageDir,
                    ids,
                    this.props.query
                ).then((response) => {
                    this.handleDataResponse(response, true)
                })
            })
        } else {
            this.setState(
                {
                    page: newPage,
                },
                () =>
                    getHomePage(this.state.sortBy, pageDir, ids).then(
                        (response) => {
                            this.handleDataResponse(response, false)
                        }
                    )
            )
        }
    }

    render() {
        console.log('masterSearchQuery in Home', this.props.query)
        const { location, history, match } = this.props
        console.log('location and stuff props', location)
        const urlParams = new URLSearchParams(location.search || '')
        console.log('urlParams home', urlParams.toString())

        if (urlParams.get('after')) {
            console.log('after result', urlParams.get('after'))
        } else if (urlParams.get('before')) {
            console.log('before result', urlParams.get('before'))
        }

        // const { pageDir } = this.props.location.state
        // console.log('pageDir state home', pageDir)

        console.log('this.state.clicked', this.state.sortBy)
        if (this.state.isLoading) {
            return 'Loading...'
        }

        return (
            <div>
                <div className="sort-container">
                    <div className="sortByMenuContainer">
                        <div className="sort-by-text"></div>
                        {sortOptions.map((option) => (
                            <div
                                // onClick={() => this.getHomePage('best')}
                                onClick={() => this.handleSort(option.value)}
                                className={`menu-svg-container ${
                                    this.state.sortBy === option.value
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
                {/* <div className="create-post-master">
                    <div className="create-post-container">
                        <div className="media-post-container">
                            <CreatePost />
                        </div>
                    </div>
                </div> */}
                <div className="create-post-master">
                    <div className="create-post-container">
                        <div className="media-post-container">
                            <MasterSearch
                            // subreddit={this.props.subreddit}
                            // handleSearchQuery={this.handleSearchQuery}
                            />
                            <CreatePost />
                        </div>
                    </div>
                </div>
                {this.state.feedData.map((postData) => {
                    return (
                        <Post
                            onClick={this.openModal}
                            postData={postData}
                            // accessToken={this.context.accessToken}
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
                {/* <div className="pagination-container">
                    <Link
                        to={{
                            pathname: '/',
                            search: `?before=${this.state.before}`,
                        }}
                    >
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
                    </Link>
                    <Link
                        to={{
                            pathname: '/',
                            search: `?after=${this.state.after}`,
                        }}
                    >
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
                    </Link>
                </div> */}
            </div>
        )
    }
}

export default withRouter(Home)

Home.contextType = MasterSearchContext
