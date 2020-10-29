import React from 'react'
import axios from 'axios'

import Post from './post.component'

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
        }
    }

    componentDidMount() {
        if (this.context.accessToken) {
            console.log(
                'accessToken in home component',
                this.context.accessToken
            )
            // return axios
            // 		.request({
            // 			url: "https://oauth.reddit.com/subreddits/default",
            // 			headers: {
            // 				// authorization: "bearer " + localStorage.getItem("access_token"),
            // 				authorization: "bearer " + this.context.accessToken,
            // 			},
            // 		})
            // 		.then((response) => {
            // 			console.log('home component feed data', response.data)
            // 		})

            return axios({
                method: 'GET',
                url: `https://oauth.reddit.com/`,
                headers: {
                    Authorization: 'bearer ' + this.context.accessToken,
                },
            })
                .then((response) => {
                    console.log(
                        'this is the raw response for the feed:',
                        response
                    )
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
    }

    render() {
        console.log('home context', this.context.accessToken)
        console.log('type of', typeof 'hello')
        console.log('this is the feedData state', this.state.feedData)
        console.log('this is the feedData state', typeof this.state.feedData)
        // console.log("feedData state", typeof(this.state.feedData.children));
        // console.log('feedData children', this.state.feedData);
        if (this.state.isLoading) {
            return '...Loading'
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
                            <a href={getAuthorizationURL()}>Log In</a>
                        </div>
                    </div>
                ) : null}
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
