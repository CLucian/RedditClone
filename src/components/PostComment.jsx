import React from 'react';
import Axios from 'axios';

import { GlobalContext } from './GlobalState';

class PostComment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: ''
		}
	}

	postComment = () => {
		if (this.props.textValue.length > 1) {
			Axios({
				method: 'post',
				url: 'https://oauth.reddit.com/api/comment',
				headers: {
					Authorization: this.context.accessToken,
				},
				data: {
					'thing_id': this.props.commentId,
					text: this.props.textValue
				}
			})
			.then((response) => {
				this.setState({
					comment: response					
				})
				alert("Your comment has gone through, " + this.state.comment);
			})
			.catch(err => {
				console.log(err)
				alert('There was an error' + err)
			})

		}
  	}


	render() {
		return(
			<div>

			</div>
		)
	}
}


export default PostComment;

PostComment.contextType = GlobalContext;