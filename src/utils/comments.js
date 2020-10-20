

export const flattenCommentTree = (dataTree) => {
  const commentMap = {};

  const deleteReplies = (object) => {
    if(object.replies) {
      delete object.replies;
    }
    return object
  }

  const recursionFnc = (data) => {
    
      data.forEach((commentObj) => {
        commentMap[commentObj.data.id] = commentObj.data;
        if (commentObj.data?.replies?.data?.children) {
          commentObj.data.replies.data.children.forEach((childrenObj) => {
            commentMap[childrenObj.data.id] = childrenObj.data
            return recursionFnc(commentObj.data.replies.data.children);
          });
        }
        delete commentMap[commentObj.data.id].replies;
        
    })

    if (dataTree.length === 0) {
      return;
    }
    
  }

  recursionFnc(dataTree);


  return commentMap;

}


