import React from 'react'
import { Tweet, Timeline } from 'react-twitter-widgets'

// import { useLocation } from 'react-router-dom'

import Close from '../svg-components/Close'
import Comments from '../comments/Comments'
import { GlobalContext } from '../GlobalState'
import Video from '../Video/Video'
import PostComment from '../comments/PostComment'

import marked from 'marked'
import DOMPurify from 'dompurify'
import moment from 'moment'

import getPostById from '../../queries/postModal'
import { renderIntoDocument } from 'react-dom/test-utils'

class PostModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            commentsLoaded: false,
            data: '',
            userParentCommentData: null,
        }
    }

    componentDidMount() {
        if (this.props.postId) {
            getPostById(this.props.postId)
                .then((response) => {
                    this.setState({
                        data: response.data.data.children[0].data,
                    })
                })
                .catch((err) => console.log(err))
        }
    }

    getMarkDown = (text) => {
        if (this.state.data) {
            const rawMarkup = marked(text, {
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

    getParentComment = (commentData) => {
        this.setState({
            userParentCommentData: commentData,
        })
    }

    getTweetId = () => {
        const endArr = this.state.data.url.split('status/')[1].split('')
        let idArr = []
        for (let i = 0; i < endArr.length; i++) {
            if (isNaN(endArr[i])) {
                break
            } else {
                idArr.push(endArr[i])
            }
        }

        const id = idArr.join('')
        return id
    }

    render() {
        console.log('post modal this.state.data', this.state.data)
        console.log(
            'userCommentParentData in postmodal',
            this.state.userParentCommentData
        )
        if (!this.state.data) {
            return null
        }

        console.log('getTweetId', this.getTweetId())

        // http://localhost:3000/r/LivestreamFail?post_id=t3_ks97io

        return (
            <div className="modal-info-container">
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
                            <div
                                dangerouslySetInnerHTML={this.getMarkDown(
                                    this.state.data.title
                                )}
                            ></div>

                            <div className="post-url">
                                <a
                                    className="modal-url-post"
                                    href={
                                        'https://www.reddit.com' +
                                        this.state.data.permalink
                                    }
                                >
                                    Original post
                                </a>
                            </div>
                        </div>

                        {/* <div className="modal-post-date">
                        {this.getDate(this.state.data.created)}
                    </div> */}
                        {/* {!this.state.data.media && */}
                        {!this.state.data.media &&
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
                    {this.state.data.media.type === 'twitter.com' && (
                        <div className="tweet-container">
                            {this.getTweetId}
                            <Tweet tweetId={this.getTweetId} />
                        </div>
                    )}

                    {this.state.data?.media?.type !== 'twitter.com' &&
                        this.state.data?.media?.oembed?.html && (
                            <Video
                                height={this.state.data.media.oembed.height}
                                width={this.state.data.media.oembed.width}
                                // video={this.state.data?.media_embed?.content}
                                url={this.state.data.url}
                                provider={
                                    this.state.data?.media?.oembed
                                        ?.provider_name
                                }
                            />
                        )}
                    <div
                        className="modal-description"
                        dangerouslySetInnerHTML={this.getMarkDown(
                            this.state.data.selftext
                        )}
                    ></div>
                    {/* <div className="modal-description">{this.props.postData.selftext}</div> */}
                    <PostComment
                        data={this.state.data}
                        getParentComment={this.getParentComment}
                    />
                    <Comments
                        subreddit={this.state.data.subreddit_name_prefixed}
                        accessToken={this.context.accessToken}
                        postCommentsId={this.state.data.id}
                        commentsLoaded={this.commentsLoaded}
                        data={this.state.data}
                        userParentCommentData={this.state.userParentCommentData}
                    />
                </div>
            </div>
        )
    }
}

export default PostModal

PostModal.contextType = GlobalContext

// http://localhost:3000/r/LivestreamFail?post_id=t3_kt4xls
