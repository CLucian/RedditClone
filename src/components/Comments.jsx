import React from 'react';
import axios from 'axios';


import Comment from './Comment';

class Comments extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			comments: 'loading...',
			isLoading: true
		}
	}



	componentDidMount() {
		
			const getComments = () => {
			if (this.props.accessToken) {
				// console.log('===============SUBREDDIT========', this.props.subreddit)
				// console.log('Comments accessToken', this.props.accessToken)
				// console.log("Comments postsCommentID", this.props.postCommentsId);
				return axios({
					method: "GET",
					url: `https://oauth.reddit.com/${this.props.subreddit}/comments/${this.props.postCommentsId}`,
					headers: {
					Authorization: "bearer " + this.props.accessToken,
					},
				})
					.then((response) => {
					console.log("this is the response for the feed", response);
					console.log('Comments', response.data[1].data.children)
					// console.log('this is the response for the feed', typeof(response.data.data.children))
					this.setState({
						// firstComment: response.data[1].data.children[0].data.body,
						comments: response.data[1].data.children,
						isLoading: false
					});
					})
					.catch((err) => {
					console.log("Home Component Error: ", err);
					});
			}
		}

		 getComments();
	}



	render() {
		console.log('comments state: ', this.state.comments)
		if (this.state.isLoading) {
			return null
		}

		return(
			<div>
				{
					this.state.comments.map((comment) => {
						return (
							<Comment key={comment.id} comment={comment} />
						)
					})
				}
				{/* {
					this.state.comments.map(comment => (
						<div className="comment-container">
							<div className="comment-author">
								{ comment.data.author }
							</div>
							<div className="comment-box">
								{ comment.data.body }
							</div>
							<div>
								{ 
									comment.data.replies.data ? 
										comment.data.replies.data.children.map(childComment => {
											return (<div className="children-comments">
												<div className="children-author">
													{childComment.data.author}
												</div>
												<div>
													{childComment.data.body}
												</div>
											</div>
											)
										})
									: null
								}
							</div>
						</div>
					))
				} */}
			</div>
		)
	}
}

export default Comments;