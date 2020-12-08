import React from 'react'

import SearchSVG from '../svg-components/SearchSVG'
// import subredditSearch from '../../queries/subredditSearch'

class SearchInSubreddit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            queryString: '',
        }
    }

    handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => {
                this.props.handleSearchQuery(this.state.queryString)
            }
        )
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleSearchQuery(this.state.queryString)
    }

    render() {
        console.log(
            'this.state.queryString in SearchSubreddit',
            this.state.queryString
        )
        return (
            <div className="search-subreddit-div">
                {/* <div className="create-post">Search Subreddit</div> */}
                <SearchSVG />
                <div className="query-search-div">
                    <form
                        type="submit"
                        className="subreddit-search-form"
                        onSubmit={this.handleSubmit}
                    >
                        <input
                            className="subreddit-search-input"
                            type="text"
                            name="queryString"
                            onChange={this.handleChange}
                            placeholder="search subreddit"
                            value={this.state.queryString}
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default SearchInSubreddit
