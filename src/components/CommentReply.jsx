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
		return (
			<div>
				<div className="comment-reply" onClick={this.handleCommentPost}>
					Reply
				{/* <InputField showTextBox={this.state.showTextBox} /> */}
				</div>
				<CommentReplyInput showTextBox={this.state.showTextBox}
					commentId={this.props.commentId} 
					closeReply={this.handleCommentPost} />
			</div>
    	);
	}
}

export default CommentReply;