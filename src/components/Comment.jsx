import React from 'react';
import marked from "marked";
import DOMPurify from "dompurify";

import CommentReply from './CommentReply';
import MoreReplies from './MoreReplies';
import { GlobalContext } from './GlobalState';


const Comment = (props) => {
	const replyContext = React.useContext(GlobalContext);

	// const lastChildObj =
	// 	(props.comment.data.replies &&
	// 	props.comment.data.replies.data.children.slice(-1)[0].kind === "more" &&
	// 	props.comment.data.replies.data.children.slice(-1)[0].data.children || []).map(childCommentId => {
	// 		return childCommentId
	// 	});

	
	// const nestedCommentsFunction = () => {
	// 	if (replyContext.getAndDisplayComment.id && replyContext.getAndDisplayComment.id) {
	// 		const nestedComments = (props.comment.data.replies && props.comment.data.replies.data.children || []).map(comment => {
	// 			return <Comment key={comment.data.id} comment={comment} commentText={comment.data.body} type="child" />
	// 		})
	// 	}
	// }	


	/* const nestedComments = (props.comment.data.replies && props.comment.data.replies.data.children || []).map(comment => {
		return <Comment key={comment.data.id} comment={comment} commentText={comment.data.body} type="child" />
	}) */
	// const nestedComments = props.comment.data?.replies?.data?.children?.map(
	// 	(comment) => {
	// 		return (
	// 			<Comment
	// 			key={comment.data.id}
	// 			comment={comment}
	// 			commentText={comment.data.body}
	// 			type="child"
	// 			/>
	// 		);
	// 	}
	 // );
	
	const nestedComments = props.commentData[props.commentId]?.childIds?.map(commentId => {
		return (
			<Comment
				commentData={props.commentData}
				commentId={commentId}
				// commentData={[props.commentData}
			/>
		)
	})


	// const nestedComments = props.commentsArr.forEach(parentId => {
	// 		const dataObj = props.commentData[parentId]

	// 		dataObj.childIds.map(childId => {
	// 			return (
	// 				<Comment 
	// 					commentData={props.commentData[childId]}
	// 					commentsArr={props.commentData[childId].childIds}
	// 				/>
	// 			)
	// 		})
	// 	})
	

	//  const nestedComments = props.commentData[props.parentCommentId]?.childIds.map(childId => {
	// 	 const childData = props.commentData[childId]
	// 	 return (
	// 		<Comment 
	// 			key={childData.id}
	// 			commentData={childData}
	// 			commentText={childData.body}
	// 			type="child"
	// 		/>
	// 	 )
	//  })


	 const getMarkDown = (markDown) => {
		if (markDown) {
		const rawMarkup = marked(markDown);
		const clean = DOMPurify.sanitize(rawMarkup);
		return { __html: clean };
		} else {
		return { __html: '<p className="deleted-comment">Deleted Comment<p>' };
		}
  	};

	// New REturn
	return (
      <div className="post-comments-container">
        <div className="comment-author">
          {props.commentData[props.commentId]?.author}
        </div>
        <div
          className="comment"
          dangerouslySetInnerHTML={getMarkDown(props.commentData[props.commentId]?.body)}
        ></div>
		<CommentReply commentId={props.commentData[props.commentId].parent_id} />
      	{nestedComments}
    </div>

    // <div className="post-comments-container">
    //   <div className="comment-author">{props?.commentData[parentId]?.author}</div>
    //   <div
    //     className="comment"
    //     dangerouslySetInnerHTML={getMarkDown(props.commentData[parentId]?.body)}
    //   ></div>
    //   <CommentReply commentId={props.commentData[parentId]?.parent_id} />

    // </div>
  );


	

// 		return (
// 			<div className="post-comments-container">
// 				<div className="comment-author">{props.comment.data.author}</div>
// 				<div className="comment" dangerouslySetInnerHTML={getMarkDown(props.comment.data.body)}></div>
// 				<CommentReply commentId={props.comment.data.parent_id} />
// 				{ lastChildObj.length > 0 ? 
// 					<MoreReplies moreRepliesArray={lastChildObj} moreRepliesId={props.comment.data.parent_id} author={props.comment.data.author} />
// 					: null
// 				}
				
// 				{/* <MoreReplies commentId={props.comment.data.parent_id} commentChildrenArray={lastChildObj} /> */}
// 				{nestedComments}
				
// 			</div>
// 		);
}

export default Comment;

Comment.contextType = GlobalContext;