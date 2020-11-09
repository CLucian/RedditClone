import React from 'react'
import { Link } from 'react-router-dom'

import Modal from './Modal'
import PostModal from './PostModal'
import Login from './Login'
import { GlobalContext } from './GlobalState'

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
        }
    }

    postVote = (voteVal) => {
        const data = {
            dir: voteVal.toString(),
            id: this.props.postData.data.name,
        }
        Axios({
            method: 'post',
            url: 'https://oauth.reddit.com/api/vote',
            headers: {
                Authorization: 'bearer ' + this.context.accessToken,
                'content-type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify(data),
        })
            .then((response) => {
                console.log('response data', response)
            })
            .catch((err) => {
                console.log(err)
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
        const maxLength = 250
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + '...'
        } else {
            return description
        }
    }

    getLengthTitle = (description) => {
        const maxLength = 150
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + '...'
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
            () => this.postVote(voteValue)
        )
    }

    render() {
        {
            if (!this.props.postData) {
                return <Login />
            }
        }

        return (
            <div className="master-container">
                <div
                    className="profile-post-container"
                    onClick={this.openModal}
                >
                    {/* <div className="post-thumbnail-container">
                        <img
                            className="post-thumbnail"
                            src={this.defaultThumbnail()}
                            alt="thumbnail"
                        />
                    </div> */}

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
                                <div className="post-subreddit">
                                    {this.props.postData.data.subreddit}
                                </div>
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
                    {/* <div className="hr-container">
                        <hr className="post-hr" />
                    </div> */}
                    <div className="post-sub-info">
                        <div className="post-author">
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
