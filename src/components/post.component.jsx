import React from 'react'

import Modal from './Modal'
import PostModal from './PostModal'

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
        }
    }

    openMoreInfo = () => {}

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

    render() {
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
                            <div className="UpArrowSVG-container">
                                <UpArrowSVG />
                            </div>
                            <div className="score-text">
                                {this.props.postData.data.score}
                            </div>
                            <div className="DownArrowSVG-container">
                                <DownArrowSVG />
                            </div>
                        </div>
                        <div className="main-text-container">
                            <div className="post-title">
                                <div className="post-title-text">
                                    {this.props.postData.data.title}
                                </div>
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
                        {/* <div className="post-subreddit">
                            <div>{this.props.postData.data.subreddit}</div>
                        </div> */}
                    </div>
                    {/* </div> */}
                </div>
                <div>
                    <Modal
                        closeModal={this.closeModal}
                        isVisible={this.state.showModal}
                    >
                        <PostModal
                            closeModal={this.closeModal}
                            thumbnail={this.defaultThumbnail}
                            postData={this.props.postData.data}
                            accessToken={this.props.accessToken}
                        />
                    </Modal>
                </div>
            </div>
        )
    }
}

// Post.contextType = GlobalContext;

export default Post
