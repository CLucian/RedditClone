import React from 'react'

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
            <Link to="/create_post">
                <div className="create-post-master">
                    <div className="create-post-container">
                        <div className="media-post-container">
                            <div className="create-post">Create Post</div>
                            <div className="create-media-post">
                                Create Media Post
                            </div>
                            <div className="create-link-post">
                                Create Link Post
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}

export default CreatePost
