import React from 'react'
// import { useLocation } from 'react-router-dom'

import Comments from './Comments'
import { GlobalContext } from './GlobalState'

import marked from 'marked'
import DOMPurify from 'dompurify'
import moment from 'moment'
import Axios from 'axios'

// const { search } = useLocation()
// const params = new URLSearchParams(this.props.location.search)
// const post_id = params.get('post_id')

class PostModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            commentsLoaded: false,
        }
    }

    getPostById = () => {
        // const data = {
        //     api_type: 'json',
        //     names: this.props.commentData[this.props.commentId].name,
        //     text: this.state.value,
        // }
        Axios({
            method: 'get',
            url: `https://oauth.reddit.com/by_id/t3_josjux`,
            headers: {
                Authorization: 'bearer ' + this.context.accessToken,
                'content-type': 'application/x-www-form-urlencoded',
            },
            data: null,
            // ,
            // data: qs.stringify(data),
        })
            .then((response) => {
                console.log('getPostById modal get req response', response)
            })
            .catch((err) => {
                console.log(err)
                console.log('what is the error', err.data)
            })
    }

    getMarkDown = () => {
        const rawMarkup = marked(this.props.postData.selftext, {
            sanitize: true,
        })
        const clean = DOMPurify.sanitize(rawMarkup)
        return { __html: clean }
    }

    getDate = (unixValue) => {
        const date = moment.unix(unixValue).format('DD-MM-YYYY h:mm:ss')
        return date
    }

    /// Incorporate an image thumbnail --> also links if clicked

    render() {
        // console.log('post_id  in the modal Component', post_id)
        // console.log('search in post modal', search)
        // console.log('this is the location of query string', this.props.location)
        console.log('this.props.postData', this.props.postData)
        return (
            <div className="modal-post-content">
                <div className="post-details">
                    <div className="modal-post-subreddit">
                        {/* {this.props.postData.subreddit_name_prefixed} */}
                        asdfasdf
                    </div>
                    <button onClick={this.props.clearHistory}>
                        Clear History
                    </button>
                    <div className="modal-post-author">
                        {/* {this.props.postData.author} */}
                        asdfasdf
                    </div>
                </div>
                <div className="modal-post-header">
                    <div className="modal-post-title">
                        {/* {this.props.postData.title} */}
                        asdf
                    </div>
                    <div className="modal-post-date">
                        {/* {this.getDate(this.props.postData.created)} */}
                        asdf
                    </div>
                    <div className="modal-thumbnail-container">
                        <img
                            className="post-thumbnail"
                            // src={this.props.thumbnail()}
                            alt="thumbnail"
                        />
                    </div>
                </div>
                <div
                    className="modal-description"
                    // dangerouslySetInnerHTML={this.getMarkDown()}
                ></div>
                {/* <div className="modal-description">{this.props.postData.selftext}</div> */}

                <Comments
                // subreddit={this.props.postData.subreddit_name_prefixed}
                // accessToken={this.props.accessToken}
                // postCommentsId={this.props.postData.id}
                // commentsLoaded={this.commentsLoaded}
                />
                {/* <button onClick={this.props.closeModal}>Close</button> */}
            </div>
        )
    }
}

export default PostModal

PostModal.contextType = GlobalContext
