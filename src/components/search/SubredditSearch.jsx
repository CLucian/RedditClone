import React from 'react'

import SubredditInfo from './SubredditInfo'
import { getSubreddits } from '../../queries/querySubreddits'

import { debounce } from 'lodash'

export default class SubredditSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: null,
            subreddits: null,
            subInfoArr: null,
        }
        this.wrapperRef = React.createRef()
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside)
    }

    handleClickOutside = (e) => {
        console.log('wrapperRef', this.wrapperRef)
        if (
            this.wrapperRef.current &&
            !this.wrapperRef.current.contains(e.target)
        ) {
            this.props.clickedOutside()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.query !== this.props.query) {
            this.searchSubreddits()
        }
    }

    searchSubreddits = debounce(() => {
        getSubreddits(this.props.query, this.props.token)
            .then((subredditInfoArray) => {
                console.log('subredditInfoArray', subredditInfoArray)
                this.setState({ subInfoArr: subredditInfoArray })
            })
            .catch((err) => console.log(err))
    }, 500)

    handleClick = (subName) => {
        this.props.setSubreddit(subName)
    }

    render() {
        if (this.state.subInfoArr) {
            return (
                <div
                    className="subreddit-search-suggestions-container"
                    ref={this.wrapperRef}
                >
                    <ul className="suggestion-list">
                        {this.props.showSuggestions &&
                            this.state.subInfoArr &&
                            this.state.subInfoArr.map((subObj) => {
                                return (
                                    <li
                                        className="suggestion-listing"
                                        onClick={() => {
                                            this.handleClick(
                                                subObj.display_name
                                            )
                                        }}
                                    >
                                        <SubredditInfo subreddit={subObj} />
                                    </li>
                                )
                            })}
                    </ul>
                </div>
            )
        } else {
            return null
        }
    }
}
