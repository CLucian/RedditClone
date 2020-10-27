// import React from 'react';

// import { GlobalContext } from './GlobalState';

// export const CommentContext = React.createContext(); 

// class CommentState extends React.Component {
// 	constructor(props) {
// 		super(props)
// 		console.clear()
// 		console.log('this.context', this.context)
// 		this.state = {
// 			replyId: null,
// 			parentId: null,
// 			commentDataObj: null,
// 			commentReplyStr: null,
// 			author: this.context.userData.name,
// 			accessToken: this.context.accessToken,
// 			newCommentDataObj: null
// 		}
// 	}

// 	getCommentReply = (commentData, commentReply, commentId) => {
// 		this.setState({
// 			replyId: Math.random(),
// 			commentReplyStr: commentReply,
// 			commentDataObj: commentData,
// 			parentId: commentId	
// 		})
// 	}

// 	setCommentReplyData = () => {
// 		const newDataTree = this.state.commentDataObj
// 		this.state.commentDataObj[this.state.parentId].childIds.push(this.state.replyId);
// 		const replyData = {
// 			body: this.state.commentReplyStr,
// 			author: this.state.author,
// 			id: this.state.replyId
// 		}
// 		newDataTree[this.state.replyId] = replyData;
// 		this.setState({
// 			newCommentDataObj: newDataTree
// 		}) 
		
// 	}

// 	render() {
// 		console.log('commentstate accesstoken', this.context.accessToken)
// 		return (
// 			<CommentContext.Provider
// 				value={{
// 					...this.state,
// 					getCommentReply: this.getCommentReply,
// 					setCommentReplyData: this.setCommentReplyData
// 				}}
// 			>
// 				{this.props.children}
// 			</CommentContext.Provider>
// 		)
// 	}
// }


// export default CommentState;

// CommentState.contextType = GlobalContext;