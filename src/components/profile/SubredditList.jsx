import React from 'react'

class SubredditList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            display_name,
            header_img,
            public_description,
            header_title,
            banner_background_color,
            banner_background_image,
        } = this.props.data.data
        console.log('subredditList', this.props.data)

        return (
            <div className="master-container">
                <div
                    className="profile-post-container"
                    style={{
                        backgroundImage: `url(${
                            banner_background_image.split('?width')[0]
                        })`,
                    }}
                    // onClick={this.openModal}
                >
                    <div
                        className="main-text-container"
                        style={{
                            backgroundColor: `${banner_background_color}`,
                        }}
                    >
                        <div className="subreddit-banner">
                            {/* <img
                                className="banner-img"
                                src={banner_background_image.split('?width')[0]}
                            /> */}
                        </div>
                        <div className="subreddit-header">
                            <div className="subreddit-header-titles">
                                <div className="subreddit-title">
                                    {display_name}
                                </div>
                                <div className="subreddit-header-line">
                                    "{header_title}"
                                </div>
                            </div>

                            <div className="subreddit-img-header-container">
                                <img
                                    className="subreddit-img-header"
                                    src={header_img}
                                />
                            </div>
                        </div>
                        <div className="subreddit-description">
                            {public_description}
                        </div>

                        <div className="post-description"></div>
                        <div className="hr-container">
                            <hr className="post-hr"></hr>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SubredditList
