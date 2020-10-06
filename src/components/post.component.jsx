import React from 'react';
import { GlobalContext } from './GlobalState';

import Comments from './Comments';
import { render } from '@testing-library/react';



// const defaultThumbnail = (props) => {
// 	const def1 = "default";
// 	const def2 = "self";

// 	if (props.postData.data.thumbnail === def1 && props.postData.data.thumbnail === def2) {
// 		return "https://momentummartialarts.ca/wp-content/uploads/2017/04/default-image-720x530.jpg";
// 	} else {
// 		return props.postData.data.thumbnail
// 	}

// }

class Post extends React.Component {
	constructor(props){
		super(props);
		this.state = {

		}
	}


	defaultThumbnail = () => {
		const default1 = "default";
		const default2 = "self";
		const defaultURLImg = "https://momentummartialarts.ca/wp-content/uploads/2017/04/default-image-720x530.jpg";

		if (this.props.postData.data.thumbnail === default1) {
      return defaultURLImg;
    } else if (this.props.postData.data.thumbnail === default2) {
      return defaultURLImg;
    } else if (this.props.postData.data.thumbnail.length < 6) {
      return defaultURLImg;
    } else {
      return this.props.postData.data.thumbnail;
    }
  };


render() {

		return (
			<div className="main-container">
				<div className="post-container">
					<div className="post-thumbnail-container">
						<img className="post-thumbnail" src={this.defaultThumbnail()} />
					</div>
					<div className="main-text-container">
						<div className="post-title">
							<h1>{this.props.postData.data.title}</h1>
						</div>
						<div className="post-description">
							<h5>
							/r/{this.props.postData.data.subreddit}
							</h5>
						</div>
						<div className="post-author">
							<p>{this.props.postData.data.author}</p>
						</div>
						<div className="post-comments">
							<Comments subreddit={this.props.postData.data.subreddit_name_prefixed} accessToken={this.props.accessToken} postCommentsId={this.props.postData.data.id} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

// Post.contextType = GlobalContext;

export default Post;