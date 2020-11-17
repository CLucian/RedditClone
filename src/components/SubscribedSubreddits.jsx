import React from 'react'

import axios from 'axios'
import { GlobalContext } from './GlobalState'

class SubscribedSubreddits extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const getSubreddits = () => {
            return axios({
                method: 'GET',
                url: `https://oauth.reddit.com/subreddits/mine/subscriber?limit=10`,
                headers: {
                    Authorization: 'bearer ' + this.context.accessToken,
                },
            })
                .then((response) => {
                    console.log('subreddit response - sidebar', response)
                    this.setState({
                        subredditDataArr: response.data.data.children,
                        isLoading: false,
                    })
                })
                .catch((err) => {
                    console.log('Home Component Error: ', err)
                })
        }
        getSubreddits()
    }

    render() {
        return (
            <div className="master-container">
                {/* <div
                    className="profile-post-container"
                    onClick={this.openModal}
                >
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
                    <div className="hr-container">
                        <hr className="post-hr" />
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
                </div> */}
            </div>
        )
    }
}

export default SubscribedSubreddits

SubscribedSubreddits.contextType = GlobalContext
