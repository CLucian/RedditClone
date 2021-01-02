import React from 'react'

class SubredditInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            subInfo: null,
        }
    }

    render() {
        console.log(
            'this.props.subreddit in SubredditInfo',
            this.props.subreddit
        )

        // if (this.props.subreddit && this.props.subreddit !== undefined) {
        return (
            <div className="subreddit-subscribers-container">
                <div className="subreddit-img-container">
                    {this.props.subreddit.icon_img ? (
                        <img
                            className="subreddit-img"
                            src={this.props.subreddit.icon_img}
                        />
                    ) : (
                        <img
                            className="subreddit-img"
                            src={
                                'https://styles.redditmedia.com/t5_vm1db/styles/communityIcon_5nthugyr0ef21.png?width=256&s=3a163f7135b93df0dab0921dba35f760baea5945'
                            }
                        />
                    )}
                </div>
                <div className="subreddit-suggestion-info-container">
                    <div className="subreddit-suggestion-name-container">
                        {this.props.subreddit.display_name}
                    </div>
                    <div className="subreddit-suggestion-members-container">
                        {this.props.subreddit.subscribers} members
                    </div>
                </div>
            </div>
        )
        // }

        // return null
    }
}

export default SubredditInfo
