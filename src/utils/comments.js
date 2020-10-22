

export const flattenCommentTree = (dataTree) => {
  const commentMap = {};


  // const deleteReplies = (object) => {
  //   if(object.replies) {
  //     delete object.replies;
  //   }
  //   return object
  // }



  const recursionFnc = (data) => {
      data.forEach((commentObj) => {
        const id = commentObj.data.id
        commentMap[id] = commentObj.data;
        // commentMap[commentObj.data.id].childArr = [];
        // const childIds = []
        // commentObj.data.replies.data.children?.forEach((childObj1) => {
        //   // commentMap[commentObj.data.id].childArr.push(childObj1.data.id);
        //   childIds.push(childObj1.data.id);
        // })
        // commentMap[commentObj.data.id].aaaa = childIds;
        const childIds = []
        commentMap[id].childIds = childIds;


        const children = commentObj.data?.replies?.data?.children || []
        if (children.length) {
          // commentObj.data.replies.data.children.forEach((childrenObj) => {
          children.forEach((childrenObj) => {
            const childId = childrenObj.data.id;
            childIds.push(childId);

            //  commentMap[childrenObj.data.id].childArr = []
            // commentMap[childrenObj.data.id].childArr = childrenObj?.data?.replies?.data?.children.map((childObj2) => {
              //    return childObj2.data.id
              //  })
              // This gets sent back up to the first forEach

            // commentMap[childrenObj.data.id] = childrenObj.data;
            // return recursionFnc(commentObj.data.replies.data.children);
          });

          recursionFnc(commentObj.data.replies.data.children);
        }

        // delete commentMap[commentObj.data.id].replies;
    })

    // if (dataTree.length === 0) {
    //   return;
    // }
    
  }

  recursionFnc(dataTree);


  return commentMap;

}


