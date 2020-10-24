import React from "react";
import axios from "axios";

import Comment from "./Comment";
import { flattenCommentTree } from "../utils/comments";

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

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: "loading...",
	  isLoading: true,
	  parentCommentsArr: ''
    };
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
            const responseData = response.data[1].data.children;
			const parentCommentIdsArr = [];
      			responseData.forEach((parentComment) => {
        		parentCommentIdsArr.push(parentComment.data.id);
      		});

			console.clear()
			const data = responseData;
			console.log('direct data', data)
			const commentMap = flattenCommentTree(responseData);
			console.log('DATA AND COMMENT MAP', data, commentMap);

            this.setState({
			  comments: commentMap,
			  parentCommentsArr: parentCommentIdsArr,
              isLoading: false,
            });
          })
          .catch((err) => {
            console.log("Home Component Error: ", err);
          });
      }
    };

    getComments();
  }

  render() {
	console.log("comments", this.state.comments);
	console.log("comments", this.state.parentCommentsArr);
    // console.log('This is the comment Map', commentMap);
    if (this.state.isLoading) {
      return null;
    }

    return (
      <div>
		  {
			  this.state.parentCommentsArr.map((parentId) => {
				return <Comment currentData={this.state.comments[parentId]} commentData={this.state.comments} commentId={parentId} />
				// this.state.comments[parentId].body
			  })
		  }
		  {/* <Comment commentData={this.state.comments} commentsArr={this.state.parentCommentsArr} /> */}
      </div>
    );
  }
}

export default Comments;


//  {
//    this.state.comments.map((comment) => {
//      return (
//        <div>
//          <Comment
//            key={comment.data.id}
//            comment={comment}
//            commentId={comment.data.parent_id}
//          />
//          {/* <Recursion commentData={this.state.comments} /> */}
//        </div>
//      );
//    });
//  }