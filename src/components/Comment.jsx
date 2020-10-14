import React from 'react';
import marked from "marked";
import DOMPurify from "dompurify";



const Comment = (props) => {
		const nestedComments = (props.comment.data.replies && props.comment.data.replies.data.children || []).map(comment => {
		console.log('comment', comment.data.body);
		return <Comment key={comment.id} comment={comment} commentText={comment.data.body} type="child" />
	})

	const getMarkDown = (markDown) => {
		if(markDown) {
			const rawMarkup = marked(markDown, {
				sanitize: true,
			});
			const clean = DOMPurify.sanitize(rawMarkup);
			return { __html: clean };
		} else {
			return markDown
		}
		
    };



	return (
		<div className="post-comments-container">
		<div className="comment-author">{props.comment.data.author}</div>
		<div className="comment" dangerouslySetInnerHTML={getMarkDown(props.comment.data.body)}></div>
			{nestedComments}
		</div>
	);
}

export default Comment;
