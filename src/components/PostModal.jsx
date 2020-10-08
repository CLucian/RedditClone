import React from 'react';
import Comments from './Comments';

class PostModal extends React.Component {
	constructor(props){
		super(props)
		this.state = {};
	}



	
	render() {
		return(
			<div className="modal-post-content">
				<div className="modal-post-header">
					<div className="modal-post-title">
						{this.props.postData.title}
					</div>
					<div className="post-details">
						<div className="modal-post-subreddit">
							{this.props.postData.subreddit_name_prefixed}
						</div>
						<div className="modal-post-author">
							{this.props.postData.author}
						</div>
					</div>
				</div>
				<div className="modal-description">
					{this.props.postData.selftext}
				</div>
				
				<div className="post-comments">
					<Comments 
						subreddit={this.props.postData.subreddit_name_prefixed} 
						accessToken={this.props.accessToken} 
						postCommentsId={this.props.postData.id} 
					/>
				</div>
				<button onClick={this.props.closeModal}>
					Close
				</button>
			</div>
		)
	}
}


export default PostModal;