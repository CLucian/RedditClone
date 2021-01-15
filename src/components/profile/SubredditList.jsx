import React from 'react'
import { Link } from 'react-router-dom'

class SubredditList extends React.Component {
    constructor(props) {
        super(props)
    }

    getLength = (description) => {
        const maxLength = 150
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + '...'
        } else {
            return description
        }
    }

    render() {
        const {
            display_name,
            header_img,
            public_description,
            header_title,
            banner_background_color,
            banner_background_image,
            community_icon,
            icon_img,
        } = this.props.data

        return (
            <Link to={`/r/${display_name}`}>
                <div className="subreddit-master-container">
                    <div className="subreddit-item-container">
                        <div className="subreddit-header">
                            <div className="subreddit-img-header-container">
                                <img
                                    className="subreddit-img-header"
                                    alt="header-img"
                                    src={
                                        community_icon.split('?width')[0] ||
                                        icon_img ||
                                        header_img ||
                                        `https://styles.redditmedia.com/t5_vm1db/styles/communityIcon_5nthugyr0ef21.png?width=256&s=3a163f7135b93df0dab0921dba35f760baea5945`
                                    }
                                />
                            </div>
                            <div className="subreddit-text-container">
                                <div className="subreddit-list-title">
                                    {display_name}
                                </div>
                                <div className="subreddit-description">
                                    {public_description &&
                                        this.getLength(public_description)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}

export default SubredditList
