import React from 'react';
import marked from "marked";
import DOMPurify from "dompurify";

import CommentReply from './CommentReply';
import MoreReplies from './MoreReplies';


const Comment = (props) => {

	const lastChildObj =
		(props.comment.data.replies &&
		props.comment.data.replies.data.children.slice(-1)[0].kind === "more" &&
		props.comment.data.replies.data.children.slice(-1)[0].data.children || []).map(childCommentId => {
			return childCommentId
		});
		console.log("lastChildObj", lastChildObj);

	const nestedComments = (props.comment.data.replies && props.comment.data.replies.data.children || []).map(comment => {
		return <Comment key={comment.data.id} comment={comment} commentText={comment.data.body} type="child" />
	})



	const getMarkDown = (markDown) => {
		if(markDown) {
			const rawMarkup = marked(markDown);
			const clean = DOMPurify.sanitize(rawMarkup);
			return { __html: clean };
		} else {
			return { __html: '<p className="deleted-comment">Deleted Comment<p>' }
		}
		
	};

		return (
			<div className="post-comments-container">
				<div className="comment-author">{props.comment.data.author}</div>
				<div className="comment" dangerouslySetInnerHTML={getMarkDown(props.comment.data.body)}></div>
				<CommentReply commentId={props.comment.data.parent_id} />
				{ lastChildObj.length > 0 ? 
					<MoreReplies moreRepliesArray={lastChildObj} moreRepliesId={props.comment.data.parent_id} author={props.comment.data.author} />
					: null
				}
				
				{/* <MoreReplies commentId={props.comment.data.parent_id} commentChildrenArray={lastChildObj} /> */}
				{nestedComments}
				
			</div>
		);
}

export default Comment;
