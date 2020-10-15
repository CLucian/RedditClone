import React from 'react';
import marked from "marked";
import DOMPurify from "dompurify";

import CommentReply from './CommentReply';



const Comment = (props) => {
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
			{nestedComments}
		</div>
	);
}

export default Comment;
