import React from 'react'
import { Link, Redirect } from 'react-router-dom'

// import Modal from './modal/Modal'
// import PostModal from './modal/PostModal'
import Login from './Login'
import ErrorPage from './errorPage.component'
import { GlobalContext } from './GlobalState'
import { postVote, getAuthorAvatar } from '../queries/postPage'

import Axios from 'axios'
import qs from 'qs'
import moment from 'moment'
import marked from 'marked'
import DOMPurify from 'dompurify'

import HeartSVG from './svg-components/Heart'
import BubbleSVG from './svg-components/Bubble'
import UpArrowSVG from './svg-components/UpArrow'
import DownArrowSVG from './svg-components/DownArrow'
import AuthorSVG from './svg-components/Author'

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            moreInfo: false,
            showModal: false,
            voteVal: 0,
            updatedScore: '',
            isLoading: true,
            authorImg: '',
            err: null,
        }
    }

    componentDidMount() {
        getAuthorAvatar(this.props.postData.data.author)
            .then((response) => {
                const dataImg = response.data.data.icon_img
                const modifiedImg = dataImg.split('?width')[0]
                this.setState({
                    authorImg: modifiedImg,
                    isLoading: false,
                })
            })
            .catch((err) => {
                this.setState({
                    err,
                })
            })
    }

    openModal = () => {
        this.setState({
            showModal: true,
        })
    }

    closeModal = () => {
        this.setState({
            showModal: false,
        })
    }

    getLength = (description) => {
        const maxLength = 150
        if (description.length > maxLength) {
            return description.substring(0, maxLength)
        } else {
            return description
        }
    }

    getLengthTitle = (description) => {
        const maxLength = 100
        if (description.length > maxLength) {
            return description.substring(0, maxLength)
        } else {
            return description
        }
    }

    getMarkDown = (markDown) => {
        if (markDown) {
            const rawMarkup = marked(markDown)
            const clean = DOMPurify.sanitize(rawMarkup)
            return { __html: clean }
        } else {
            return {
                __html: '',
            }
        }
    }

    getDate = (unixValue) => {
        const date = moment.unix(unixValue).format('MMM Do YYYY')
        return date
    }

    handleArrowClick = (vote) => {
        let voteValue

        if (vote === 1 && this.state.voteVal === 1) {
            voteValue = 0
        } else if (vote === -1 && this.state.voteVal === -1) {
            voteValue = 0
        } else if (vote === 1) {
            voteValue = 1
        } else if (vote === -1) {
            voteValue = -1
        } else {
            console.log('something went wrong', vote)
        }

        this.setState(
            {
                voteVal: voteValue,
                updatedScore: this.props.postData.data.score + voteValue,
            },

            () => postVote(voteValue)
        )
    }

    render() {
        if (this.state.err) {
            return <Redirect to="/ErrorPage" />
        }

        return (
            <div className="master-container">
                <div
                    className="profile-post-container"
                    onClick={this.openModal}
                >
                    <div className="post-listing-subreddit">
                        {this.props.postData.data.subreddit}
                    </div>
                    <div className="post-main-info">
                        <div className="post-score">
                            <div
                                className="UpArrowSVG-container"
                                onClick={() => this.handleArrowClick(1)}
                            >
                                <UpArrowSVG isActive={this.state.voteVal} />
                            </div>
                            <div className="score-text">
                                {this.state.updatedScore
                                    ? this.state.updatedScore
                                    : this.props.postData.data.score}
                            </div>
                            <div
                                className="DownArrowSVG-container"
                                onClick={() => this.handleArrowClick(-1)}
                            >
                                <DownArrowSVG isActive={this.state.voteVal} />
                            </div>
                        </div>
                        <div className="main-text-container">
                            {/* <div className="post-listing-subreddit">
                                {this.props.postData.data.subreddit}
                            </div> */}
                            <div className="post-title">
                                <Link
                                    id="modal-open"
                                    className="postLinks"
                                    to={{
                                        search: `?post_id=${this.props.postData.data.name}`,
                                    }}
                                >
                                    <div className="post-title-text">
                                        {this.getLengthTitle(
                                            this.props.postData.data.title
                                        )}
                                    </div>
                                </Link>
                                {this.props.postData.data?.thumbnail && (
                                    <div className="subreddit-image-container">
                                        {/* <div className="post-subreddit">
                                        {this.props.postData.data.subreddit}
                                    </div> */}
                                        {this.props.postData.data.thumbnail !==
                                            'self' &&
                                        this.props.postData.data.thumbnail !==
                                            'thumbnail' &&
                                        this.props.postData.data.thumbnail !==
                                            'image' &&
                                        this.props.postData.data.thumbnail !==
                                            'nsfw' &&
                                        this.props.postData.data.thumbnail !==
                                            'default' ? (
                                            <a
                                                href={
                                                    this.props.postData.data.url
                                                }
                                            >
                                                <div className="post-listing-thumbnail-container">
                                                    <img
                                                        className="post-thumbnail"
                                                        src={
                                                            this.props.postData
                                                                .data.thumbnail
                                                        }
                                                        // src={this.state.data.thumbnail}
                                                        alt={
                                                            this.props.postData
                                                                .data.thumbnail
                                                        }
                                                    />
                                                </div>
                                            </a>
                                        ) : null}
                                    </div>
                                )}
                            </div>

                            <div className="post-description">
                                <div
                                    className="post-description-text"
                                    dangerouslySetInnerHTML={this.getMarkDown(
                                        this.getLength(
                                            this.props.postData.data.selftext
                                        )
                                    )}
                                ></div>
                            </div>
                            <div className="hr-container">
                                <hr className="post-hr" />
                            </div>
                        </div>
                    </div>
                    <div className="post-sub-info">
                        <div className="post-author">
                            <div className="author-img-container">
                                {this.state.authorImg && (
                                    <img
                                        className="author-img"
                                        src={this.state.authorImg}
                                    />
                                )}
                            </div>
                            Posted by:
                            <div className="author-text">
                                &nbsp; {this.props.postData.data.author}
                            </div>
                        </div>
                        <div className="post-date">
                            <div>
                                {this.getDate(this.props.postData.data.created)}
                            </div>
                        </div>
                        <div className="post-comment-number">
                            <BubbleSVG />
                            &nbsp;
                            <div>{this.props.postData.data.num_comments}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Post.contextType = GlobalContext

export default Post
