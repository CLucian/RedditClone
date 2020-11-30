import React from 'react'
// import { useLocation } from 'react-router-dom'

import Close from '../svg-components/Close'
import Comments from '../comments/Comments'
import { GlobalContext } from '../GlobalState'
import Video from '../Video/Video'

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
        const date = moment.unix(unixValue).format('dddd, MMMM Do YYYY')
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
                <div className="close-container">
                    <div
                        className="close-svg-container"
                        onClick={this.props.closeModal}
                    >
                        <Close className="close-modal-btn" />
                    </div>
                </div>
                <div className="post-details">
                    <div className="author-subreddit-container">
                        <div className="modal-post-subreddit">
                            {this.state.data.subreddit}
                        </div>
                        <div className="modal-post-author">
                            {this.state.data.author}
                        </div>
                    </div>

                    <div className="modal-post-date">
                        {this.getDate(this.state.data.created_utc)}
                    </div>
                </div>
                <div className="modal-post-header">
                    <div className="modal-post-title">
                        <div>{this.state.data.title}</div>
                        <div className="post-url">
                            <a href={this.state.data.url}>
                                {this.state.data.url}
                            </a>
                        </div>
                    </div>

                    {/* <div className="modal-post-date">
                        {this.getDate(this.state.data.created)}
                    </div> */}
                    {!this.state.data.preview?.enabled &&
                    !this.state.data?.media?.oembed?.author_url &&
                    this.state.data.thumbnail !== 'self' &&
                    this.state.data.thumbnail !== 'image' &&
                    this.state.data.thumbnail !== 'thumbnail' &&
                    this.state.data.thumbnail !== 'nsfw' &&
                    this.state.data.thumbnail !== 'default' ? (
                        <div className="post-thumbnail-container">
                            <a href={this.state.data.url}>
                                <img
                                    className="post-thumbnail"
                                    src={this.state.data.thumbnail}
                                    // src={this.state.data.thumbnail}
                                    alt="thumbnail"
                                />
                            </a>
                        </div>
                    ) : null}
                </div>
                {this.state.data.preview?.enabled ? (
                    <div className="full-post-image">
                        <a href={this.state.data.url}>
                            <img
                                src={this.state.data.url}
                                style={{
                                    width: `${this.state.data.preview.images[0].resolutions[3].width}px`,
                                    height: `${this.state.data.preview.images[0].resolutions[3].height}px`,
                                }}
                            />
                        </a>
                    </div>
                ) : null}
                {this.state.data?.media?.oembed?.author_url && (
                    <Video video={this.state.data?.media?.oembed?.author_url} />
                )}
                {/* {this.state.data?.media?.reddit_video && (
                    <Video
                        video={
                            this.state.data?.media?.reddit_video?.fallback_url
                        }
                        height={
                            this.state.data?.preview?.images[0].resolutions[1]
                                ?.height
                        }
                        width={
                            this.state.data?.preview?.images[0].resolutions[1]
                                ?.width
                        }
                    />
                )} */}
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
