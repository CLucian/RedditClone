import React from 'react'
// import { useLocation } from 'react-router-dom'

import Close from './svg-components/Close'
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
            data: '',
        }
    }

    componentDidMount() {
        const getPostById = () => {
            // const data = {
            //     api_type: 'json',
            //     names: this.props.commentData[this.props.commentId].name,
            //     text: this.state.value,
            // }
            Axios({
                method: 'get',
                url: `https://oauth.reddit.com/by_id/${this.props.postId}`,
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
                    this.setState({
                        data: response.data.data.children[0].data,
                    })
                })
                .catch((err) => {
                    console.log(err)
                    console.log('what is the error', err.data)
                })
        }
        getPostById()
    }

    defaultThumbnail = () => {
        const default1 = 'default'
        const default2 = 'self'
        const defaultURLImg =
            'https://momentummartialarts.ca/wp-content/uploads/2017/04/default-image-720x530.jpg'

        if (this.props.postData.data.thumbnail === default1) {
            return defaultURLImg
        } else if (this.props.postData.data.thumbnail === default2) {
            return defaultURLImg
        } else if (this.props.postData.data.thumbnail.length < 6) {
            return defaultURLImg
        } else {
            return this.props.postData.data.thumbnail
        }
    }

    getMarkDown = () => {
        if (this.state.data) {
            const rawMarkup = marked(this.state.data.selftext, {
                sanitize: true,
            })
            const clean = DOMPurify.sanitize(rawMarkup)
            return { __html: clean }
        }
    }

    getDate = (unixValue) => {
        const date = moment.unix(unixValue).format('DD-MM-YYYY')
        return date
    }

    /// Incorporate an image thumbnail --> also links if clicked

    render() {
        // this.getPostById(this.props.postId)
        // console.log('post_id  in the modal Component', post_id)
        // console.log('search in post modal', search)
        // console.log('this is the location of query string', this.props.location)
        console.log('this.state.data', this.state.data)
        // console.log()
        if (!this.state.data) {
            return null
        }

        return (
            <div className="modal-post-content">
                <Close
                    className="close-modal-btn"
                    onClick={this.props.closeModal}
                />

                <div className="post-details">
                    <div className="author-subreddit-container">
                        <div className="modal-post-subreddit">
                            {this.state.data.subreddit}
                        </div>
                        <div className="modal-post-author">
                            {this.state.data.author}
                        </div>
                    </div>
                    {/* <button onClick={this.props.clearHistory}>
                        Clear History
                    </button> */}

                    <div className="modal-post-date">
                        {this.getDate(this.state.data.created)}
                    </div>
                </div>
                <div className="modal-post-header">
                    <div className="modal-post-title">
                        {this.state.data.title}
                    </div>
                    {/* <div className="modal-post-date">
                        {this.getDate(this.state.data.created)}
                    </div> */}
                    {this.state.data.thumbnail !== 'self' ? (
                        <div className="modal-thumbnail-container">
                            <img
                                className="post-thumbnail"
                                // src={this.thumbnail()}
                                src={this.state.data.thumbnail}
                                alt="thumbnail"
                            />
                        </div>
                    ) : null}
                </div>
                <div
                    className="modal-description"
                    dangerouslySetInnerHTML={this.getMarkDown()}
                ></div>
                {/* <div className="modal-description">{this.props.postData.selftext}</div> */}

                <Comments
                    subreddit={this.state.data.subreddit_name_prefixed}
                    accessToken={this.context.accessToken}
                    postCommentsId={this.state.data.id}
                    commentsLoaded={this.commentsLoaded}
                    data={this.state.data}
                />
            </div>
        )
    }
}

export default PostModal

PostModal.contextType = GlobalContext
