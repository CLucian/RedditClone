import React from 'react'
import axios from 'axios'

import Post from './post.component'
import Login from './Login'

import { GlobalContext } from './GlobalState'

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
        }
    }

    getHomePage = () => {
        return axios({
            method: 'GET',
            url: `https://oauth.reddit.com/${this.state.sortBy}`,
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

    selectSortBy = (e) => {
        this.setState(
            {
                sortBy: e.target.value,
            },
            this.getHomePage
        )
    }

    render() {
        console.log('home context', this.context.accessToken)
        console.log('type of', typeof 'hello')
        console.log('this is the feedData state', this.state.feedData)
        console.log('this is the feedData state', typeof this.state.feedData)
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
                {this.state.feedData.map((postData) => {
                    return (
                        <Post
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

Home.contextType = GlobalContext
