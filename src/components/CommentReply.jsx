import React from 'react';
import CommentReplyInput from './CommentReplyInput';
// import InputField from './InputField';

class CommentReply extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showTextBox: false
		}
	}

	handleCommentPost = () => {
		this.setState({
			showTextBox: !this.state.showTextBox
		})
	}



	render() {
		console.log('what is this comments id', this.props.commentId)
		return (
			<div>
				<div className="comment-reply" onClick={this.handleCommentPost}>
					Reply
				{/* <InputField showTextBox={this.state.showTextBox} /> */}
				</div>
				<CommentReplyInput showTextBox={this.state.showTextBox} commentId={this.props.commentId} />
			</div>
    	);
	}
}

export default CommentReply;