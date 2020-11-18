import React from 'react'
import { Link } from 'react-router-dom'

import marked from 'marked'
import DOMPurify from 'dompurify'
import moment from 'moment'
import Axios from 'axios'
import qs from 'qs'

import HeartSVG from '../svg-components/Heart'
import BubbleSVG from '../svg-components/Bubble'
import UpArrowSVG from '../svg-components/UpArrow'
import DownArrowSVG from '../svg-components/DownArrow'
import AuthorSVG from '../svg-components/Author'

class ProfileComments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            authorImg: '',
            isLoading: true,
        }
    }

    componentDidMount() {
        const getAuthorAvatar = () => {
            if (this.props.childData.data.link_author === '[deleted]') {
                this.setState({
                    isLoading: false,
                })
            } else {
                const data = {
                    id: this.props.childData.data.link_author,
                }
                return Axios({
                    method: 'GET',
                    url: `https://oauth.reddit.com/user/${this.props.childData.data.link_author}/about`,
                    headers: {
                        Authorization: 'bearer ' + this.props.accessToken,
                    },
                    data: qs.stringify(data),
                })
                    .then((response) => {
                        console.log('this is the author response', response)
                        const dataImg = response.data.data.icon_img
                        const modifiedImg = dataImg.split('?width')[0]
                        this.setState({
                            authorImg: modifiedImg,
                            isLoading: false,
                        })
                    })
                    .catch((err) => {
                        console.log('Avatar fetch error ', err)
                    })
            }
        }
        getAuthorAvatar()
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

        console.log('author state', this.state.authorImg)
        console.log(
            'this is the props for profile comments',
            this.props.childData
        )

        // if (this.state.isLoading) {
        //     return '...Loading'
        // }

        return (
            // <div className="master-container">
            //     <div className="profile-post-container">
            //         <div className="post-title">{link_title}</div>
            //         <div className="author">{link_author}</div>
            //         <div className="subreddit">{subreddit}</div>

            //         <div
            //             className="modal-description"
            //             dangerouslySetInnerHTML={this.getMarkDown(body)}
            //         ></div>
            //     </div>
            // </div>

            //

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
                            {/* <HeartSVG /> */}
                            <div className="UpArrowSVG-container">
                                <UpArrowSVG />
                            </div>
                            <div className="score-text">{score}</div>
                            {/* <div className="DownArrowSVG-container">
                                <DownArrowSVG />
                            </div> */}
                        </div>
                        <div className="main-text-container">
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
                                {/* <Link>
                                    <div className="post-title-text">
                                        {link_title}
                                    </div>
                                </Link> */}
                                <div className="post-subreddit">
                                    {subreddit}
                                </div>
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
                                <img
                                    className="author-img"
                                    src={this.state.authorImg}
                                />
                            </div>
                            Posted by:
                            <div className="author-text">
                                &nbsp; {link_author}
                            </div>
                        </div>
                        <div className="post-date">
                            <div>
                                {`Commented on ${this.getDate(created_utc)}`}
                            </div>
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

export default ProfileComments
