import React from 'react'
import marked from 'marked'
import DOMPurify from 'dompurify'
import Axios from 'axios'
import qs from 'qs'

import CommentReply from './CommentReply'
import MoreReplies from './MoreReplies'
import { GlobalContext } from './GlobalState'

import DownArrow from '../components/svg-components/DownArrow'
import UpArrow from '../components/svg-components/UpArrow'
import Collapse from './svg-components/Collapse'
import UnCollapse from './svg-components/UnCollapse'

// const replyContext = React.useContext(GlobalContext)

class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isCollapsed: false,
            voteVal: 0,
            updatedScore: '',
        }
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

    nestedComments = this.props.commentData[
        this.props.commentId
    ]?.childIds?.map((commentId) => {
        return (
            <Comment
                commentData={this.props.commentData}
                commentId={commentId}
                getCommentReply={this.props.getCommentReply}
                // parent_Id={props.commentData[commentId].parent_id}
            />
        )
    })

    collapseComments = () => {
        this.setState({
            isCollapsed: !this.state.isCollapsed,
        })
    }

    //in render display null if you shouldn't display it
    render() {
        // console.log('comment this.props.commentData', this.props.commentData)

        return (
            <div className="post-comments-container">
                <div className="comment-author">
                    {this.props.commentData[this.props.commentId]?.author}
                </div>
                <div className="comment-text-body">
                    <div className="collapse-master-container">
                        {this.props.commentData[this.props.commentId]?.childIds
                            .length > 0 ? (
                            // <button
                            //     onClick={this.collapseComments}
                            //     className="collapse-thread"
                            // >
                            //     -
                            // </button>

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
                                : this.props.commentData[this.props.commentId]
                                      .score}
                        </div>
                        <div
                            className="upvote-arrows"
                            onClick={() => this.handleArrowClick(-1)}
                        >
                            <DownArrow isActive={this.state.voteVal} />
                        </div>
                    </div>
                    <div
                        className="comment"
                        dangerouslySetInnerHTML={this.getMarkDown(
                            this.props.commentData[this.props.commentId]?.body
                        )}
                    ></div>
                </div>
                <CommentReply
                    getCommentReply={this.props.getCommentReply}
                    commentId={this.props.commentId}
                    // parent_Id={props.parent_Id}
                    commentData={this.props.commentData}
                />
                {this.state.isCollapsed ? null : this.nestedComments}
            </div>
        )
    }
}

export default Comment

Comment.contextType = GlobalContext
