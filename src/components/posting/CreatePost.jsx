import React from 'react'

import PostSVG from '../svg-components/PostSVG'

import { Link } from 'react-router-dom'

class CreatePost extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: null,
            test: null,
            subreddit: null,
            kind: null,
        }
    }

    render() {
        return (
            <Link to="/create_post" className="create-post-link">
                <div className="create-post-div">
                    {/* <div className="create-post-master">
                    <div className="create-post-container">
                        <div className="media-post-container"> */}
                    <div className="create-post">Create Post</div>
                    <PostSVG />
                    {/* </div>
                    </div>
                </div> */}
                </div>
            </Link>
        )
    }
}

export default CreatePost
