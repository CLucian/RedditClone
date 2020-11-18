import React from 'react';
import axios from 'axios';

import DisplayMoreComments from './DisplayMoreComments';

class MoreReplies extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: true,
			moreRepliesClicked: false
		}
	}

	// showComponent = () => {
	// 	this.props.commentChildrenObj.data
	// 	if (this.props.commentData.) {
	// 		return <MoreRepliesDisplay />
	// 	} else {
	// 		return null
	// 	}
	// }



	render() {
		// console.log("this is the commentData", this.props.moreRepliesArray);
		return (
      <div>
        {this.props.moreRepliesArray.length > 0 ? (
			<DisplayMoreComments 
												moreRepliesArray={this.props.moreRepliesArray}
												moreRepliesId={this.props.moreRepliesId}
												author={this.props.author}
		 />
		 ) : null }
      </div>
    );
	}
}

export default MoreReplies;