import React from 'react'
// import { useLocation } from 'react-router-dom'

import Close from '../svg-components/Close'
import Comments from '../comments/Comments'
import { GlobalContext } from '../GlobalState'
import Video from '../Video/Video'
import Twitch from '../Video/Twitch'

import marked from 'marked'
import DOMPurify from 'dompurify'
import moment from 'moment'

import getPostById from '../../queries/postModal'

class PostModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            commentsLoaded: false,
            data: '',
        }
    }

    componentDidMount() {
        if (this.props.postId) {
            getPostById(this.props.postId).then((response) => {
                this.setState({
                    data: response.data.data.children[0].data,
                })
            })
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
        const date = moment.unix(unixValue).format('dddd, MMMM Do YYYY')
        return date
    }

    /// Incorporate an image thumbnail --> also links if clicked

    render() {
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
                {this.state.data.preview?.enabled &&
                this.state.data?.preview?.images ? (
                    <div className="full-post-image">
                        <a href={this.state.data.url}>
                            <img
                                className="full-post-img"
                                src={this.state.data.url}
                                style={
                                    {
                                        // width: `${this.state.data.preview.images[0].resolutions[2].width}px`,
                                        // height: `${this.state.data.preview.images[0].resolutions[2].height}px`,
                                    }
                                }
                            />
                        </a>
                    </div>
                ) : null}
                {this.state.data?.media?.type !== 'twitter.com' &&
                    this.state.data?.media?.oembed?.author_url && (
                        <Video
                            video={this.state.data?.media?.oembed?.author_url}
                        />
                    )}
                {this.state.data?.secure_media_embed?.media_domain_url && (
                    <Twitch
                        url={
                            this.state.data?.secure_media_embed
                                ?.media_domain_url
                        }
                    />
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
