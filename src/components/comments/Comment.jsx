import React from 'react'
import marked from 'marked'
import DOMPurify from 'dompurify'
import Axios from 'axios'
import qs from 'qs'

import CommentReply from './CommentReply'
import { GlobalContext } from '../GlobalState'
import moment from 'moment'

import DownArrow from '../svg-components/DownArrow'
import UpArrow from '../svg-components/UpArrow'
import Collapse from '../svg-components/Collapse'
import UnCollapse from '../svg-components/UnCollapse'

// const replyContext = React.useContext(GlobalContext)

class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isCollapsed: false,
            voteVal: 0,
            updatedScore: '',
            authorImg: '',
            isLoading: true,
        }
    }

    componentDidMount() {
        const getAuthorAvatar = () => {
            if (
                this.props.commentData[this.props.commentId]?.author ===
                '[deleted]'
            ) {
                this.setState({
                    isLoading: false,
                })
            } else {
                const data = {
                    id: this.props.commentData[this.props.commentId]?.author,
                }
                return Axios({
                    method: 'GET',
                    url: `https://oauth.reddit.com/user/${
                        this.props.commentData[this.props.commentId]?.author
                    }/about`,
                    headers: {
                        Authorization: 'bearer ' + this.context.accessToken,
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

    postVote = (voteVal) => {
        const data = {
            dir: voteVal.toString(),
            id: this.props.commentData[this.props.commentId].name,
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
                updatedScore:
                    this.props.commentData[this.props.commentId].score +
                    voteValue,
            },
            () => this.postVote(voteValue)
        )
    }

    getTime = (unixValue) => {
        const dateMoment = moment.unix(unixValue).fromNow()
        return dateMoment
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

    // nestedcomments = () => []
    getComments = () => {
        return this.props.commentData[this.props.commentId]?.childIds?.map(
            (commentId) => {
                return (
                    <Comment
                        commentData={this.props.commentData}
                        commentId={commentId}
                        getCommentReply={this.props.getCommentReply}
                        getCommentEdit={this.props.getCommentEdit}
                        // parent_Id={props.commentData[commentId].parent_id}
                    />
                )
            }
        )
    }

    collapseComments = () => {
        this.setState({
            isCollapsed: !this.state.isCollapsed,
        })
    }

    //in render display null if you shouldn't display it
    render() {
        // console.log('get comment edit', this.props.getCommentEdit)
        if (this.state.isLoading) {
            return 'loading... from comment.js'
        }

        return (
            <div className="post-comments-container">
                <div className="comment-author-time-container">
                    <div className="modal-author-info">
                        <div className="modal-author-img-container">
                            <img
                                className="modal-author-img"
                                src={this.state.authorImg}
                            />
                        </div>
                        <div className="comment-author">
                            {
                                this.props.commentData[this.props.commentId]
                                    ?.author
                            }
                        </div>
                    </div>
                    {this.props.commentData[this.props.commentId]?.body !==
                        undefined && (
                        <div className="comment-date">
                            {this.getTime(
                                this.props.commentData[this.props.commentId]
                                    ?.created_utc
                            )}
                        </div>
                    )}
                </div>
                <div className="comment-text-body">
                    <div className="collapse-master-container">
                        {this.props.commentData[this.props.commentId]?.childIds
                            ?.length > 0 ? (
                            <div
                                className="collapse-container"
                                onClick={this.collapseComments}
                            >
                                <Collapse
                                    isCollapsed={this.state.isCollapsed}
                                />

                                <UnCollapse
                                    isCollapsed={this.state.isCollapsed}
                                />
                            </div>
                        ) : null}
                    </div>
                    {this.props.commentData[this.props.commentId]?.body !==
                        undefined && (
                        <div className="upvotes">
                            <div
                                className="upvote-arrows"
                                onClick={() => this.handleArrowClick(1)}
                            >
                                <UpArrow isActive={this.state.voteVal} />
                            </div>
                            <div className="comment-score">
                                {this.state.updatedScore
                                    ? this.state.updatedScore
                                    : this.props.commentData[
                                          this.props.commentId
                                      ].score}
                            </div>
                            <div
                                className="upvote-arrows"
                                onClick={() => this.handleArrowClick(-1)}
                            >
                                <DownArrow isActive={this.state.voteVal} />
                            </div>
                        </div>
                    )}
                    <div
                        className="comment"
                        dangerouslySetInnerHTML={this.getMarkDown(
                            this.props.commentData[this.props.commentId]?.body
                        )}
                    ></div>
                </div>
                {this.props.commentData[this.props.commentId]?.body !==
                    undefined && (
                    <CommentReply
                        getCommentReply={this.props.getCommentReply}
                        commentId={this.props.commentId}
                        // parent_Id={props.parent_Id}
                        commentData={this.props.commentData}
                        getCommentEdit={this.props.getCommentEdit}
                    />
                )}
                {!this.state.isCollapsed && this.getComments()}
            </div>
        )
    }
}

export default Comment

Comment.contextType = GlobalContext
