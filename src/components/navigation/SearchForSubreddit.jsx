import React from 'react'
import { debounce } from 'lodash'

import SubredditListing from './SubredditListing'
import SubredditSearch from '../search/SubredditSearch'
import SearchSVG from '../svg-components/SearchSVG'

import { getSubreddits } from '../../queries/querySubreddits'

import './searchForSubreddit.scss'

export default class SearchForSubreddit extends React.Component {
    constructor() {
        super()
        this.state = {
            value: '',
            subInfoArr: [],
        }
    }

    handleChange = (e) => {
        this.setState(
            {
                value: e.target.value,
            },
            debounce(this.searchSubreddits, 500)
        )
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.searchSubreddits()
    }

    searchSubreddits = () => {
        getSubreddits(this.state.value)
            .then((subredditInfoArray) => {
                this.setState({ subInfoArr: subredditInfoArray })
            })
            .catch((err) => console.log(err))
    }

    render() {
        return (
            <div className="subredditSearch__component-container">
                <h1 className="subredditSearch__title">Search for Subreddit</h1>
                <div className="subredditSearch__container">
                    <SearchSVG />
                    <div className="subredditSearch__query-container">
                        <form
                            type="submit"
                            value={this.state.value}
                            className="subredditSearch__form"
                            onSubmit={this.handleSubmit}
                        >
                            <input
                                className="subredditSearch__search-input"
                                type="text"
                                name="query"
                                onChange={this.handleChange}
                                placeholder="Search for a subreddit"
                                value={this.state.value}
                            />
                        </form>
                    </div>
                </div>
                <SubredditListing
                    value={this.state.value}
                    subInfoArr={this.state.subInfoArr}
                />
            </div>
        )
    }
}
