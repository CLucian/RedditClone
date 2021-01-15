import React from 'react'
import { Link } from 'react-router-dom'

import marked from 'marked'
import DOMPurify from 'dompurify'
import moment from 'moment'

import BubbleSVG from '../svg-components/Bubble'
import UpArrowSVG from '../svg-components/UpArrow'

import getAuthorAvatar from '../../queries/profileComments'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
class ProfileComments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            authorImg: '',
            confirm: false,
        }
    }

    componentDidMount() {
        getAuthorAvatar(this.props.childData.data.link_author)
            .then((response) => {
                this.handleAuthorResponse(response)
            })
            .catch((err) => {
                console.log('error in profilecomments', err)
            })
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.postNum !== this.props.postNum ||
            prevProps.after !== this.props.after
        ) {
            getAuthorAvatar(
                this.props.childData.data.link_author
            ).then((response) => this.handleAuthorResponse(response))
        }
    }

    handleAuthorResponse = (response) => {
        if (response?.data?.data?.icon_img) {
            const dataImg = response.data.data.icon_img
            const modifiedImg = dataImg.split('?width')[0]
            this.setState({
                authorImg: modifiedImg,
            })
        } else {
            this.setState({
                authorImg: null,
            })
        }
    }

    getMarkDown = (markDown) => {
        if (markDown) {
            const rawMarkup = marked(markDown)
            const clean = DOMPurify.sanitize(rawMarkup)
            return { __html: clean }
        } else {
            return {
                __html: '<p className="deleted-comment">Deleted Comment<p>',
            }
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

    getLength = (description) => {
        const maxLength = 250
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

    deleteBtn = () => {
        this.setState({
            confirm: !this.state.confirm,
        })
    }

    deleteToast = () => {
        toast.success('Your comment has been successfuly deleted!', {
            position: toast.POSITION.TOP_CENTER,
        })
    }

    deleted = () => {
        this.deleteToast()
        this.props.confirmDelete(this.props.childData.data.name)
        this.setState({
            confirm: false,
        })
    }

    getDate = (unixValue) => {
        const date = moment.unix(unixValue).format('MMM Do YYYY')
        return date
    }

    render() {
        const {
            link_title,
            link_id,
            link_author,
            subreddit,
            body,
            num_comments,
            created_utc,
            score,
        } = this.props.childData.data

        return (
            <div className="master-container">
                <div
                    className="profile-post-container"
                    onClick={this.openModal}
                >
                    <div className="post-listing-subreddit">{subreddit}</div>
                    <div className="post-main-info">
                        <div className="post-score">
                            <div className="UpArrowSVG-container">
                                <UpArrowSVG isActive={this.state.voteVal} />
                            </div>
                            <div className="score-text">{score}</div>
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
                                        search: `?post_id=${link_id}`,
                                    }}
                                >
                                    <div className="post-title-text">
                                        {this.getLengthTitle(link_title)}
                                    </div>
                                </Link>
                                {this.props.childData.data?.thumbnail && (
                                    <div className="subreddit-image-container">
                                        {this.props.childData.data.thumbnail !==
                                            'self' &&
                                        this.props.childData.data.thumbnail !==
                                            'thumbnail' &&
                                        this.props.childData.data.thumbnail !==
                                            'image' &&
                                        this.props.childData.data.thumbnail !==
                                            'nsfw' &&
                                        this.props.childData.data.thumbnail !==
                                            'default' ? (
                                            <a
                                                href={
                                                    this.props.childData.data
                                                        .url
                                                }
                                            >
                                                <div className="post-listing-thumbnail-container">
                                                    <img
                                                        className="post-thumbnail"
                                                        src={
                                                            this.props.childData
                                                                .data.thumbnail
                                                        }
                                                        alt={
                                                            this.props.childData
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
                                        this.getLength(body)
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
                                &nbsp; {link_author}
                            </div>
                        </div>
                        <div className="post-date">
                            <div>{this.getDate(created_utc)}</div>
                        </div>
                        <div className="post-comment-number">
                            <BubbleSVG />
                            &nbsp;
                            <div>{num_comments}</div>
                        </div>
                    </div>
                    {!this.state.confirm ? (
                        <div className="delete-div">
                            <button
                                className="delete-btn"
                                onClick={this.deleteBtn}
                            >
                                Delete Comment
                            </button>
                        </div>
                    ) : (
                        <div className="confirm-div">
                            <div className="confirm-text">
                                <p>Are you sure?</p>
                            </div>
                            <div className="confirm-btns">
                                <button
                                    className="yes-btn"
                                    onClick={this.deleted}
                                >
                                    Yes
                                </button>
                                <button
                                    className="no-btn"
                                    onClick={this.deleteBtn}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default ProfileComments

{
    /* <div className="delete-div">
                        <button className="delete-btn" onClick={this.deleteBtn}>
                            Delete Comment
                        </button>
                    </div>
                    {this.state.confirm && (
                        <div className="confirm-div">
                            <div className="confirm-text">
                                <p>
                                    Are you sure you want to delete this
                                    comment?
                                </p>
                            </div>
                            <div className="confirm-btns">
                                <button className="yes-btn">Yes</button>
                                <button className="no-btn">No</button>
                            </div>
                        </div>
                    )} */
}
