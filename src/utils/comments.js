export const flattenCommentTree = (dataTree) => {
    const commentMap = {}
    const recursionFnc = (data) => {
        data.forEach((commentObj) => {
            const id = commentObj.data.id
            // aka --> commentMap = {gg324d : {...}}
            commentMap[id] = commentObj.data
            const childIds = []
            // add a childIds key and value to the data obj --> {gg324d : {..., childIds: []}}
            commentMap[id].childIds = childIds

            const children = commentObj.data?.replies?.data?.children || []
            if (children.length) {
                children.forEach((childrenObj) => {
                    const childId = childrenObj.data.id
                    childIds.push(childId)
                })
                recursionFnc(commentObj.data.replies.data.children)
            }
            // delete replies key and value ==> this way we don't recurse on this
            delete commentMap[commentObj.data.id].replies
        })
    }

    recursionFnc(dataTree)

    // return parentCommentIds
    return commentMap
}
