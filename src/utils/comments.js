

export const flattenCommentTree = (dataTree) => {

  const commentMap = {};
  const recursionFnc = (data) => {
      data.forEach((commentObj) => {
        const id = commentObj.data.id
        commentMap[id] = commentObj.data;
        const childIds = []
        commentMap[id].childIds = childIds;

        const children = commentObj.data?.replies?.data?.children || []
        if (children.length) {
          children.forEach((childrenObj) => {
            const childId = childrenObj.data.id;
            childIds.push(childId);
            
          });
          recursionFnc(commentObj.data.replies.data.children);          
        }
        delete commentMap[commentObj.data.id].replies;
    })
    
  }

  recursionFnc(dataTree);

  // return parentCommentIds
  return commentMap;

}


