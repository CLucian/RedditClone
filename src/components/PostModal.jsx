import React from 'react'
import Comments from './Comments'
import marked from 'marked'
import DOMPurify from 'dompurify'
import moment from 'moment'

class PostModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            commentsLoaded: false,
        }
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
        console.log('this.props.postData', this.props.postData)
        return (
            <div className="modal-post-content">
                <div className="post-details">
                    <div className="modal-post-subreddit">
                        {this.props.postData.subreddit_name_prefixed}
                    </div>
                    <div className="modal-post-author">
                        {this.props.postData.author}
                    </div>
                </div>
                <div className="modal-post-header">
                    <div className="modal-post-title">
                        {this.props.postData.title}
                    </div>
                    <div className="modal-post-date">
                        {this.getDate(this.props.postData.created)}
                    </div>
                    <div className="modal-thumbnail-container">
                        <img
                            className="post-thumbnail"
                            src={this.props.thumbnail()}
                            alt="thumbnail"
                        />
                    </div>
                </div>
                <div
                    className="modal-description"
                    dangerouslySetInnerHTML={this.getMarkDown()}
                ></div>
                {/* <div className="modal-description">{this.props.postData.selftext}</div> */}

                <Comments
                    subreddit={this.props.postData.subreddit_name_prefixed}
                    accessToken={this.props.accessToken}
                    postCommentsId={this.props.postData.id}
                    commentsLoaded={this.commentsLoaded}
                />
                <button onClick={this.props.closeModal}>Close</button>
            </div>
        )
    }
}

export default PostModal
