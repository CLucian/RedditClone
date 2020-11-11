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
                <div className="dd-wrapper">
                    <div className="dd-header">
                        <div
                            className="dd-header-title"
                            onClick={this.toggleSortBy}
                        >
                            Sort By:
                        </div>
                    </div>
                    <select
                        id="selectBox"
                        className="sort-by-dd"
                        onChange={this.selectSortBy}
                    >
                        <option className="sort-by-item" value="best">
                            Best
                        </option>
                        <option className="sort-by-item" value="hot">
                            Hot
                        </option>
                        <option className="sort-by-item" value="new">
                            New
                        </option>
                        <option className="sort-by-item" value="top">
                            Top
                        </option>
                        <option className="sort-by-item" value="rising">
                            Rising
                        </option>
                    </select>
                </div>
                <div className="sort-container">
                    <div className="sortByMenuContainer">
                        <div className="sort-by-text">Sort By:</div>
                        <div
                            // onClick={() => this.getHomePage('best')}
                            onClick={() => this.handleClick('best')}
                            className="menu-svg-container"
                            id={this.state.sortBy === 'best' && 'best'}
                        >
                            <BestSVG />
                            <div className="sort-by-text">Best</div>
                        </div>
                        <div
                            // onClick={() => this.getHomePage('hot')}
                            onClick={() => this.handleClick('hot')}
                            className="menu-svg-container"
                            id={this.state.sortBy === 'hot' && 'hot'}
                        >
                            <HotSVG />
                            <div className="sort-by-text">Hot</div>
                        </div>
                        <div
                            // onClick={() => this.getHomePage('new')}
                            onClick={() => this.handleClick('new')}
                            className="menu-svg-container"
                            id={this.state.sortBy === 'new' && 'new'}
                        >
                            <NewSVG />
                            <div className="sort-by-text">New</div>
                        </div>
                        <div
                            // onClick={() => this.getHomePage('top')}
                            onClick={() => this.handleClick('top')}
                            className="menu-svg-container"
                            id={this.state.sortBy === 'top' && 'top'}
                        >
                            <TopSVG />
                            <div className="sort-by-text">Top</div>
                        </div>
                        <div
                            // onClick={() => this.getHomePage('rising')}
                            onClick={() => this.handleClick('rising')}
                            className="menu-svg-container"
                            id={this.state.sortBy === 'rising' && 'rising'}
                        >
                            <RisingSVG />
                            <div className="sort-by-text">Rising</div>
                        </div>
                    </div>
                </div>

                {/* <SortByMenu /> */}
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
