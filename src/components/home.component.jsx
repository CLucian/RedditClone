import React from 'react'

import axios from 'axios'
import { BrowserRouter as Link } from 'react-router-dom'

import Post from './post.component'
import Login from './Login'
import Modal from './modal/Modal'

import BestSVG from './svg-components/BestSVG'
import HotSVG from './svg-components/HotSVG'
import NewSVG from './svg-components/NewSVG'
import RisingSVG from './svg-components/RisingSVG'
import TopSVG from './svg-components/TopSVG'

import { GlobalContext } from './GlobalState'

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

export default class Home extends React.Component {
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
        }
    }

    getHomePage = (sortBy = 'best', pageDir) => {
        let url = `https://oauth.reddit.com/${sortBy}?limit=10`
        if (pageDir === 'next') {
            url = `https://oauth.reddit.com/${sortBy}?count=555&after=${this.state.after}&limit=10`
            // url = `https://oauth.reddit.com/count=555?after=${this.state.after}`
        } else if (pageDir === 'prev') {
            url = `https://oauth.reddit.com/${sortBy}?count=555&before=${this.state.before}&limit=10`
        }
        return axios({
            method: 'GET',
            url: url,
            headers: {
                Authorization: 'bearer ' + this.context.accessToken,
            },
        })
            .then((response) => {
                console.log('this is the raw response for the feed:', response)
                console.log(
                    'this is the response for the feed',
                    response.data.data.children
                )
                // console.log(
                //     'this is the response for the feed',
                //     typeof response.data.data.children
                // )
                this.setState({
                    feedData: response.data.data.children,
                    isLoading: false,
                    after: response.data.data.after,
                    before: response.data.data.before,
                })
            })
            .catch((err) => {
                console.log('Home Component Error: ', err)
            })
    }

    componentDidMount() {
        if (this.context.accessToken) {
            console.log(
                'accessToken in home component',
                this.context.accessToken
            )
            this.getHomePage()
        } else {
            return <Login />
        }
    }

    // toggleSortBy = () => {
    //     this.setState({
    //         listOpen: !this.state.listOpen,
    //     })
    // }

    handleClick = (category) => {
        this.setState(
            {
                sortBy: category,
            },
            () => this.getHomePage(category, undefined)
        )
    }

    getPage = (pageDir) => {
        if (pageDir === 'next') {
            this.setState(
                {
                    page: this.state.page + 1,
                },
                () => this.getHomePage(this.state.sortBy, pageDir)
            )
        } else if (pageDir === 'prev') {
            this.setState(
                {
                    page: this.state.page - 1,
                },
                () => this.getHomePage(this.state.sortBy, pageDir)
            )
        }
    }

    render() {
        console.log('this.state.clicked', this.state.sortBy)
        if (this.state.isLoading) {
            return 'Loading...'
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
                {this.state.feedData.map((postData) => {
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

Home.contextType = GlobalContext
