import React from 'react'
import { Link } from 'react-router-dom'

import marked from 'marked'
import DOMPurify from 'dompurify'
import moment from 'moment'

import HeartSVG from '../svg-components/Heart'
import BubbleSVG from '../svg-components/Bubble'
import UpArrowSVG from '../svg-components/UpArrow'
import DownArrowSVG from '../svg-components/DownArrow'
import AuthorSVG from '../svg-components/Author'

import Axios from 'axios'
import qs from 'qs'

import getAuthorAvatar, { deleteComment } from '../../queries/profileComments'

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
                const dataImg = response.data.data.icon_img
                console.log('dataImg', dataImg)
                const modifiedImg = dataImg.split('?width')[0]
                this.setState({
                    authorImg: modifiedImg,
                })
            })
            .catch((err) => {
                console.log('error in profilecomments', err)
            })
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

    deleted = () => {
        this.props.confirmDelete(this.props.childData.data.name)
        this.setState({
            confirm: false,
        })
    }

    // confirmDelete = (e) => {
    //     e.preventDefault()
    //     deleteComment(this.props.childData.data.name).then((response) => {
    //         console.log('response from delete', response)
    //     })
    // }

    getDate = (unixValue) => {
        const date = moment.unix(unixValue).format('MMM Do YYYY')
        return date
    }

    render() {
        console.log('this.props.childData.data', this.props.childData.data)

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
                                        {/* <div className="post-subreddit">
                                        {this.props.postData.data.subreddit}
                                    </div> */}
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
                                                        // src={this.state.data.thumbnail}
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
                                <p>
                                    Are you sure you want to delete this
                                    comment?
                                </p>
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
            // <div className="master-container">
            //     <div
            //         className="profile-post-container"
            //         onClick={this.openModal}
            //     >
            //         {/* <div className="post-thumbnail-container">
            //             <img
            //                 className="post-thumbnail"
            //                 src={this.defaultThumbnail()}
            //                 alt="thumbnail"
            //             />
            //         </div> */}

            //         <div className="post-main-info">
            //             <div className="post-score">
            //                 {/* <HeartSVG /> */}
            //                 <div className="UpArrowSVG-container">
            //                     <UpArrowSVG />
            //                 </div>
            //                 <div className="score-text">{score}</div>
            //                 {/* <div className="DownArrowSVG-container">
            //                     <DownArrowSVG />
            //                 </div> */}
            //             </div>
            //             <div className="main-text-container">
            //                 <div className="post-title">
            //                     <Link
            //                         id="modal-open"
            //                         className="postLinks"
            //                         to={{
            //                             search: `?post_id=${link_id}`,
            //                         }}
            //                     >
            //                         <div className="post-title-text">
            //                             {this.getLengthTitle(link_title)}
            //                         </div>
            //                     </Link>
            //                     {/* <Link>
            //                         <div className="post-title-text">
            //                             {link_title}
            //                         </div>
            //                     </Link> */}
            //                     <div className="post-subreddit">
            //                         {subreddit}
            //                     </div>
            //                 </div>
            //                 <div className="post-description">
            //                     <div
            //                         className="post-description-text"
            //                         dangerouslySetInnerHTML={this.getMarkDown(
            //                             this.getLength(body)
            //                         )}
            //                     ></div>
            //                 </div>
            //                 <div className="hr-container">
            //                     <hr className="post-hr" />
            //                 </div>
            //             </div>
            //         </div>
            //         <div className="post-sub-info">
            //             <div className="post-author">
            //                 <div className="author-img-container">
            //                     {this.state.authorImg && (
            //                         <img
            //                             className="author-img"
            //                             src={this.state.authorImg}
            //                         />
            //                     )}
            //                 </div>
            //                 Posted by:
            //                 <div className="author-text">
            //                     &nbsp; {link_author}
            //                 </div>
            //             </div>
            //             <div className="post-date">
            //                 <div>
            //                     {`Commented on ${this.getDate(created_utc)}`}
            //                 </div>
            //             </div>
            //             <div className="post-comment-number">
            //                 <BubbleSVG />
            //                 &nbsp;
            //                 <div>{num_comments}</div>
            //             </div>
            //         </div>
            //         {/* <div className="delete-div">
            //             <button className="delete-btn" onClick={this.deleteBtn}>
            //                 Delete Comment
            //             </button>
            //         </div>
            //         {this.state.confirm && (
            //             <div className="confirm-div">
            //                 <div className="confirm-text">
            //                     <p>
            //                         Are you sure you want to delete this
            //                         comment?
            //                     </p>
            //                 </div>
            //                 <div className="confirm-btns">
            //                     <button className="yes-btn">Yes</button>
            //                     <button className="no-btn">No</button>
            //                 </div>
            //             </div>
            //         )} */}
            //     </div>
            // </div>
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
