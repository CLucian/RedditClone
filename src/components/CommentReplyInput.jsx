import React from 'react';
import PostComment from './PostComment';
import Axios from 'axios';
import qs from 'qs';

import { GlobalContext } from './GlobalState';

class CommentReplyInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	  value: "",
    };
  }

  postComment = () => {
	const data = {
			api_type: "json",
			thing_id: this.props.commentId,
			text: this.state.value,
		}
	Axios({
		method: "post",
		url: "https://oauth.reddit.com/api/comment",
		headers: {
		Authorization: "bearer " + this.context.accessToken,
		"content-type": "application/x-www-form-urlencoded",
		// "Content-Type": "application/x-www-form-urlencoded"
		},
		data: qs.stringify(data)
	})
		.then((response) => {
			alert("Your comment has gone through, " + response);
			console.log('this.state.value', this.state.value)
			console.log("This is the commentId", this.props.commentId);
			console.log('this is the response', response)
			this.context.getAndDisplayComment(this.props.commentId, this.state.value);
			this.props.closeReply();
		})
		.catch((err) => {
			console.log(err);
			alert("There was an error" + err);
			this.props.closeReply();
			// console.log("accessToken" + this.context.accessToken);
			// console.log("textvalue", this.state.value);
			// console.log("thing_id", this.props.commentId);
		});
    }

	practiceFunction = () => {
		console.log('Is this.state.value logging correctly?', this.state.value)
		alert(this.state.value)
	}

	handleChange = (e) => {
		this.setState({
			value: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.value.length > 0) {
			this.setState({ value: this.state.value }, this.postComment)
		} else {
			alert('Please type something')
		}
	};

  render() {
    return (
      <div>
        {this.props.showTextBox ? (
          <form className="comment-form" onSubmit={this.handleSubmit}>
            <textarea
				placeholder="What's on your mind?"
				type="textarea"
				wrap="physical"
				value={this.state.textInput}
				onChange={this.handleChange}
            ></textarea>
				<div className="comment-buttons">
					<button className="cancel-comment" onClick={this.props.closeReply} type="button">Cancel</button>
					<button className="comment-submit" type="submit">Submit</button>
				</div>
            <p>{this.state.value}</p>
          </form>
        ) : null}
        <PostComment
          textValue={this.state.value}
          commentId={this.props.commentId}
        />
      </div>
    );
  }
}

export default CommentReplyInput;

CommentReplyInput.contextType = GlobalContext;