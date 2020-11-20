import React from 'react'
import { Link } from 'react-router-dom'

class SubredditLinks extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { icon_img, display_name } = this.props.data
        console.log('icon_img', icon_img)

        return (
            <div className="subreddit-container">
                <Link className="subreddit-LinkTo" to={`/r/${display_name}`}>
                    <div className="subreddit-display-name">{display_name}</div>
                    <div className="subreddit-img-container">
                        {icon_img ? (
                            <img className="subreddit-img" src={icon_img} />
                        ) : (
                            <img
                                className="subreddit-img"
                                src={
                                    'https://styles.redditmedia.com/t5_vm1db/styles/communityIcon_5nthugyr0ef21.png?width=256&s=3a163f7135b93df0dab0921dba35f760baea5945'
                                }
                            />
                        )}
                    </div>
                </Link>
            </div>
        )
    }
}

export default SubredditLinks
