import React from 'react';
import axios from 'axios';


import Comment from './Comment';
import {flattenCommentTree} from '../utils/comments';

/* 

	commentMap: {
		65555: {
			...comment,
			// REMOVE `.replies`
			children: [g9c4lr4, id, id]
		},
		65: { 
			id: g9c4lr4,
			...comment,
			children: [id]
		},

	},



	{topLevelComments.map(id => {
		return <Comment 
			commentMap={commentMap}
			id={id}
		/>
	})} 
*/

// recursionFnc = () => {
// 	commentMap = this.state.comments.forEach(commentObj => {
// 		{ id: commentObj.data}
// 	})
// 	return recursionFnc
// }


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
					flattenCommentTree(response.data[1].data.children);
					console.log('Recursion Function', flattenCommentTree(response.data[1].data.children))
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
		// console.log('This is the comment Map', commentMap);
		if (this.state.isLoading) {
			return null
		}

		return(
			<div>
				{
					this.state.comments.map((comment) => {
						return (
							<div>
							<Comment key={comment.data.id} comment={comment} commentId={comment.data.parent_id} />
							{/* <Recursion commentData={this.state.comments} /> */}
							</div>
						)
					})
				}
			</div>
		)
	}
}

export default Comments;