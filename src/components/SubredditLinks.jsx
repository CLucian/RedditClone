import React from 'react'
import { Link } from 'react-router-dom'
import RedditDefault from './svg-components/RedditDefault'

class SubredditLinks extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { icon_img, display_name } = this.props.data
        // console.log('what is this.props.data',)

        return (
            <div className="subreddit-container">
                <Link className="subreddit-LinkTo" to={`/r/${display_name}`}>
                    <div className="subreddit-display-name">{display_name}</div>
                    {icon_img && (
                        <div className="subreddit-img-container">
                            {icon_img ? (
                                <img className="subreddit-img" src={icon_img} />
                            ) : (
                                <RedditDefault />
                            )}
                        </div>
                    )}
                </Link>
            </div>
        )
    }
}

export default SubredditLinks
