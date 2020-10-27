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
		console.log('commentData in commentReply', this.props.commentData)
		return (
      <div>
        <div className="comment-reply" onClick={this.handleCommentPost}>
          Reply
          {/* <InputField showTextBox={this.state.showTextBox} /> */}
        </div>
        <CommentReplyInput
          getCommentReply={this.props.getCommentReply}
          showTextBox={this.state.showTextBox}
		  commentId={this.props.commentId}
		  parent_Id={this.props.parent_Id}
          closeReply={this.handleCommentPost}
          commentData={this.props.commentData}
        />
      </div>
    );
	}
}

export default CommentReply;