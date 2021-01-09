import React from 'react'
import { Link } from 'react-router-dom'

import { GlobalContext } from './GlobalState'
import { postVote, getAuthorAvatar } from '../queries/postPage'

import moment from 'moment'
import marked from 'marked'
import DOMPurify from 'dompurify'

import BubbleSVG from './svg-components/Bubble'
import UpArrowSVG from './svg-components/UpArrow'
import DownArrowSVG from './svg-components/DownArrow'

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
        }
    }

    componentDidMount() {
        getAuthorAvatar(this.props.postData.data.author).then((response) => {
            console.log('response in post', response.data.data.icon_img)
            if (response.data.data.icon_img) {
                const dataImg = response.data.data.icon_img
                const modifiedImg = dataImg.split('?width')[0]
                this.setState({
                    authorImg: modifiedImg,
                    isLoading: false,
                })
            } else {
                this.setState({
                    authorImg: null,
                })
            }
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
        const maxLength = 400
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
        console.log('this.props.postData.data', this.props.postData.data)

        const {
            subreddit,
            score,
            name,
            title,
            thumbnail,
            selftext,
            author,
            created,
            num_comments,
        } = this.props.postData.data
        const { voteVal, updatedScore, authorImg } = this.state

        return (
            <div className="master-container">
                <div
                    className="profile-post-container"
                    onClick={this.openModal}
                >
                    <Link to={`/r/${subreddit}`}>
                        <div className="post-listing-subreddit">
                            <span className="post-listing-span">
                                {subreddit}
                            </span>
                        </div>
                    </Link>
                    <div className="post-main-info">
                        <div className="post-score">
                            <div
                                className="UpArrowSVG-container"
                                onClick={() => this.handleArrowClick(1)}
                            >
                                <UpArrowSVG isActive={voteVal} />
                            </div>
                            <div className="score-text">
                                {updatedScore ? updatedScore : score}
                            </div>
                            <div
                                className="DownArrowSVG-container"
                                onClick={() => this.handleArrowClick(-1)}
                            >
                                <DownArrowSVG isActive={voteVal} />
                            </div>
                        </div>
                        <div className="main-text-container">
                            <div className="post-title">
                                <Link
                                    id="modal-open"
                                    className="postLinks"
                                    to={{
                                        search: `?post_id=${name}`,
                                    }}
                                >
                                    <div
                                        className="post-title-text"
                                        dangerouslySetInnerHTML={this.getMarkDown(
                                            this.getLengthTitle(title)
                                        )}
                                    ></div>
                                </Link>
                                {/* {this.props.postData.data?.thumbnail && ( */}
                                {thumbnail && (
                                    <div className="subreddit-image-container">
                                        {thumbnail !== 'self' &&
                                        thumbnail !== 'thumbnail' &&
                                        thumbnail !== 'image' &&
                                        thumbnail !== 'nsfw' &&
                                        thumbnail !== 'default' ? (
                                            <div className="post-listing-thumbnail-container">
                                                <img
                                                    className="post-thumbnail"
                                                    src={thumbnail}
                                                    alt={thumbnail}
                                                />
                                            </div>
                                        ) : // </a>
                                        null}
                                    </div>
                                )}
                            </div>

                            <div className="post-description">
                                <div
                                    className="post-description-text"
                                    dangerouslySetInnerHTML={this.getMarkDown(
                                        this.getLength(selftext)
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
                                {authorImg && (
                                    <img
                                        className="author-img"
                                        src={authorImg}
                                    />
                                )}
                            </div>
                            Posted by:
                            <div className="author-text">&nbsp; {author}</div>
                        </div>
                        <div className="post-date">
                            <div>{this.getDate(created)}</div>
                        </div>
                        <div className="post-comment-number">
                            <BubbleSVG />
                            &nbsp;
                            <div>{num_comments}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Post.contextType = GlobalContext

export default Post
