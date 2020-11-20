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
            community_icon,
            icon_img,
        } = this.props.data.data
        console.log('subredditList', this.props.data)

        return (
            <div className="subreddit-master-container">
                <div
                    className="subreddit-item-container"
                    // onClick={this.openModal}
                >
                    <div className="subreddit-header">
                        <div className="subreddit-img-header-container">
                            <img
                                className="subreddit-img-header"
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
                                {public_description}
                            </div>
                        </div>
                    </div>
                    {/* <div className="main-text-container">
                        <div className="subreddit-banner">
                            {/* <img
                                className="banner-img"
                                src={banner_background_image.split('?width')[0]}
                            /> */}
                </div>
            </div>
        )
    }
}

export default SubredditList

//  </div>
//                         <div className="subreddit-header">
//                             <div className="subreddit-img-header-container">
//                                 <img
//                                     className="subreddit-img-header"
//                                     src={header_img}
//                                 />
//                             </div>
//                             <div className="subreddit-header-titles">
//                                 <div className="subreddit-title">
//                                     {display_name}
//                                 </div>
//                                 <div className="subreddit-header-line">
//                                     "{header_title}"
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="subreddit-description">
//                             {public_description}
//                         </div>
//                     </div>
