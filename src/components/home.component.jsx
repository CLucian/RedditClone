import React from 'react'

import axios from 'axios'
import { BrowserRouter as Link } from 'react-router-dom'

import Post from './post.component'
import Login from './Login'
import Modal from './Modal'

import BestSVG from './svg-components/BestSVG'
import HotSVG from './svg-components/HotSVG'
import NewSVG from './svg-components/NewSVG'
import RisingSVG from './svg-components/RisingSVG'
import TopSVG from './svg-components/TopSVG'

import { GlobalContext } from './GlobalState'
import SortByMenu from './SortByMenu'

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
        }
    }

    getHomePage = (sortBy = 'best') => {
        return axios({
            method: 'GET',
            url: `https://oauth.reddit.com/${sortBy}`,
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
                console.log(
                    'this is the response for the feed',
                    typeof response.data.data.children
                )
                this.setState({
                    feedData: response.data.data.children,
                    isLoading: false,
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

    toggleSortBy = () => {
        this.setState({
            listOpen: !this.state.listOpen,
        })
    }

    handleClick = (category) => {
        this.setState(
            {
                sortBy: category,
            },
            () => this.getHomePage(category)
        )
    }

    setActiveSort = (e) => {}

    render() {
        console.log('this.state.clicked', this.state.sortBy)
        // console.log('home context', this.context.accessToken)
        // console.log('type of', typeof 'hello')
        // console.log('this is the feedData state', this.state.feedData)
        // console.log('this is the feedData state', typeof this.state.feedData)
        // console.log("feedData state", typeof(this.state.feedData.children));
        // console.log('feedData children', this.state.feedData);
        // if (!this.context.accessToken) {
        //     return <Login />
        // }
        if (this.state.isLoading) {
            return 'Loading...'
        }

        return (
            <div>
                {!this.context.accessToken ? (
                    <div className="error-modal-container">
                        <div className="error-modal">
                            <p className="error-modal-header">
                                There seems to be an error with your
                                credentials, please login again
                            </p>
                            <Login />
                        </div>
                    </div>
                ) : null}
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
                {this.state.feedData.map((postData) => {
                    return (
                        // <Link to={`/r/${postData.data.name}`}>
                        <Post
                            onClick={this.openModal}
                            postData={postData}
                            accessToken={this.context.accessToken}
                            key={postData.data.id}
                        />
                        // </Link>
                    )
                })}
            </div>
        )
    }
}

Home.contextType = GlobalContext
