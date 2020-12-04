import React from 'react'

import SubredditInfo from './SubredditInfo'

import qs from 'qs'
import Axios from 'axios'
import { debounce } from 'lodash'

export default class SubredditSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: null,
            names: null,
        }
    }

    searchSubreddits = debounce(() => {
        const data = {
            query: this.props.query,
        }
        Axios({
            method: 'post',
            url: 'https://oauth.reddit.com/api/search_reddit_names',
            headers: {
                Authorization: 'bearer ' + this.props.token,
                'content-type': 'application/x-www-form-urlencoded',
                // "Content-Type": "application/x-www-form-urlencoded"
            },
            data: qs.stringify(data),
        })
            .then((response) => {
                this.setState({
                    names: response.data.names,
                })
                console.log(' subreddit query search', response)
            })
            .catch((err) => {
                console.log(err)
                console.log('what is the error', err.data)
                alert('There was an error' + err)
            })
    }, 1000)

    // beingRun = debounce(() => {
    //     console.log('being run')
    // }, 1000)

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.query !== this.props.query) {
            this.searchSubreddits()
        }
    }

    render() {
        if (this.props.query && this.props.query.length > 0) {
            return (
                <div className="subreddit-search-suggestions-container">
                    <ul className="suggestion-list">
                        {this.state.names &&
                            this.state.names.map((subName) => {
                                return (
                                    <li className="suggestion-listing">
                                        {subName}
                                        <SubredditInfo
                                            subreddit={subName}
                                            token={this.props.token}
                                        />
                                    </li>
                                )
                            })}
                    </ul>
                </div>

                // <select
                //     className="post-select"
                //     name="type"
                //     onChange={this.handleChange}
                // >
                //     {this.state.names &&
                //         this.state.names.map((subName) => {
                //             return <option>{subName}</option>
                //         })}
                // </select>
            )
        } else {
            return null
        }
    }
}
