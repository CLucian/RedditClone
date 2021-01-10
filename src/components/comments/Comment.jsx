import React from 'react'
import marked from 'marked'
import DOMPurify from 'dompurify'

import CommentReply from './CommentReply'
import { GlobalContext } from '../GlobalState'
import moment from 'moment'
import getAuthorAvatar from '../../queries/profileComments'
import postVote from '../../queries/comment'

import DownArrow from '../svg-components/DownArrow'
import UpArrow from '../svg-components/UpArrow'
import Collapse from '../svg-components/Collapse'
import UnCollapse from '../svg-components/UnCollapse'

import './comment.scss'

class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isCollapsed: false,
            voteVal: 0,
            updatedScore: '',
            authorImg: '',
            err: '',
        }
    }

    componentDidMount() {
        getAuthorAvatar(this.props.commentData[this.props.commentId]?.author)
            .then((response) => {
                const dataImg = response.data.data.icon_img
                const modifiedImg = dataImg.split('?width')[0]
                this.setState({
                    authorImg: modifiedImg,
                })
            })
            .catch((err) => {
                this.setState({
                    authorImg: null,
                    err: err,
                })
            })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.dataChange !== this.props.dataChange) {
            getAuthorAvatar(
                this.props.commentData[this.props.commentId]?.author
            )
                .then((response) => {
                    const dataImg = response.data.data.icon_img
                    const modifiedImg = dataImg.split('?width')[0]
                    this.setState({
                        authorImg: modifiedImg,
                    })
                })
                .catch((err) => {
                    this.setState({
                        authorImg: null,
                        err: err,
                    })
                })
        }
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
            () =>
                postVote(
                    voteValue,
                    this.props.commentData[this.props.commentId].name
                )
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

    getComments = () => {
        return this.props.commentData[this.props.commentId]?.childIds?.map(
            (commentId) => {
                return (
                    <Comment
                        commentData={this.props.commentData}
                        commentId={commentId}
                        getCommentReply={this.props.getCommentReply}
                        getCommentEdit={this.props.getCommentEdit}
                        commentDelete={this.props.commentDelete}
                        dataChange={this.props.dataChange}
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

    render() {
        const { voteVal, updatedScore, authorImg, isCollapsed } = this.state

        return (
            <>
                <div className="comments__container">
                    <div className="comments__main">
                        {this.props.commentData[this.props.commentId]?.body !==
                            undefined && (
                            <div className="comments__upvotes-container">
                                <div
                                    className="comments__upvote-arrows"
                                    onClick={() => this.handleArrowClick(1)}
                                >
                                    <UpArrow isActive={voteVal} />
                                </div>
                                <div className="comments__comment-score">
                                    {updatedScore
                                        ? updatedScore
                                        : this.props.commentData[
                                              this.props.commentId
                                          ].score}
                                </div>
                                <div
                                    className="comments_upvote-arrows"
                                    onClick={() => this.handleArrowClick(-1)}
                                >
                                    <DownArrow isActive={voteVal} />
                                </div>
                            </div>
                        )}

                        <div className="comments__main-content">
                            <div className="comments__title-container">
                                <div className="comments__author-info-container">
                                    <div className="comments__author-img-container">
                                        {authorImg && (
                                            <img
                                                className="comments__author-img"
                                                src={authorImg}
                                            />
                                        )}
                                    </div>
                                    <div className="comments__author">
                                        {
                                            this.props.commentData[
                                                this.props.commentId
                                            ]?.author
                                        }
                                    </div>
                                </div>
                                {this.props.commentData[this.props.commentId]
                                    ?.body !== undefined && (
                                    <div className="comments__author-date">
                                        {this.getTime(
                                            this.props.commentData[
                                                this.props.commentId
                                            ]?.created_utc
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="comments__text-container">
                                <div
                                    className="comments__comment"
                                    dangerouslySetInnerHTML={this.getMarkDown(
                                        this.props.commentData[
                                            this.props.commentId
                                        ]?.body
                                    )}
                                ></div>
                            </div>
                            <div className="comments__reply-collapse-container">
                                <div className="comments__collapse-container">
                                    {this.props.commentData[
                                        this.props.commentId
                                    ]?.childIds?.length > 0 ? (
                                        <div
                                            className="collapse-container"
                                            onClick={this.collapseComments}
                                        >
                                            <Collapse
                                                isCollapsed={isCollapsed}
                                            />

                                            <UnCollapse
                                                isCollapsed={isCollapsed}
                                            />
                                        </div>
                                    ) : null}
                                </div>
                                <div className="comments__reply-container">
                                    {this.props.commentData[
                                        this.props.commentId
                                    ]?.body !== undefined && (
                                        <CommentReply
                                            getCommentReply={
                                                this.props.getCommentReply
                                            }
                                            commentDelete={
                                                this.props.commentDelete
                                            }
                                            commentId={this.props.commentId}
                                            commentData={this.props.commentData}
                                            getCommentEdit={
                                                this.props.getCommentEdit
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {!isCollapsed && this.getComments()}
                </div>
            </>
        )
    }
}

export default Comment

Comment.contextType = GlobalContext
