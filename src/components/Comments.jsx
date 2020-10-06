import React from 'react';
import axios from 'axios';

class Comments extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			firstComment: 'blah blah'
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
					console.log('Comments', response.data[1].data.children[1].data.body)
					// console.log('this is the response for the feed', typeof(response.data.data.children))
					this.setState({
						// firstComment: response[1].data.children.data.replies.data.children[0].body
						firstComment: response.data[1].data.children[1].data.body,
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
		return(
			<div>
				{this.state.firstComment}
			</div>
		)
	}
}

export default Comments;