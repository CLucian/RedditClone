// import React from 'react'
// import axios from 'axios'
// import qs from 'qs'
// import marked from 'marked'
// import DOMPurify from 'dompurify'

// import { GlobalContext } from '../GlobalState'

// class DisplayMoreComments extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             isLoaded: false,
//             moreCommentsArr: '',
//         }
//     }

//     getMarkDown = (markDown) => {
//         if (markDown) {
//             const rawMarkup = marked(markDown)
//             const clean = DOMPurify.sanitize(rawMarkup)
//             return { __html: clean }
//         } else {
//             return {
//                 __html: '<p className="deleted-comment">Deleted Comment<p>',
//             }
//         }
//     }

//     getChildrenComments = () => {
//         const moreRepliesToList = this.props.moreRepliesArray.toString()
//         console.log(this.props.moreRepliesId)
//         const data = {
//             api_type: 'json',
//             link_id: this.props.moreRepliesId,
//             children: moreRepliesToList,
//         }
//         return axios({
//             method: 'post',
//             url: 'https://oauth.reddit.com/api/morechildren',
//             headers: {
//                 Authorization: 'bearer ' + this.context.accessToken,
//                 // "Content-Type": "application/x-www-form-urlencoded"
//             },
//             data: qs.stringify(data),
//         })
//             .then((response) => {
//                 // console.log('this.state.value', this.state.value)
//                 console.log('this is the response', response)
//                 this.setState({
//                     isLoaded: true,
//                     moreCommentsArr: response.data.json.data.things,
//                 })
//                 console.log('moreComment State', this.state.moreComment)
//             })
//             .catch((err) => {
//                 console.log(err)
//                 console.log('link_id ', this.props.moreRepliesId)
//             })
//     }

//     render() {
//         return (
//             <div>
//                 <button onClick={this.getChildrenComments}>More Replies</button>
//                 {/* <h1>{this.state.moreComment}</h1> */}
//                 {this.state.isLoaded
//                     ? this.state.moreCommentsArr.map((childObj) => {
//                           return (
//                               <div className="post-comments-container">
//                                   <div className="comment-author">
//                                       {childObj.data.author}
//                                   </div>
//                                   <div
//                                       className="comment"
//                                       dangerouslySetInnerHTML={this.getMarkDown(
//                                           childObj.data.body
//                                       )}
//                                   ></div>
//                               </div>
//                           )
//                       })
//                     : null}
//             </div>
//         )
//     }
// }

// export default DisplayMoreComments

// DisplayMoreComments.contextType = GlobalContext
