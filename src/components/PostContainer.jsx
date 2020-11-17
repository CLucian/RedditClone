import React from 'react'
import { withRouter } from 'react-router-dom'

import Modal from './Modal'
import PostModal from './PostModal'

class PostContainer extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    // getId = (url) => {
    //     return url.searchParams.get('post_id')
    // }

    // Post container needs a function to pass down to the post modal - close function that closes modal by getting
    // rid of post id in the url (history.push)

    closeModal = () => {
        // /r/movies?post_id=123&type=top ->
        // /r/movies?type=top
        // convert to a string
        const postIdParam = this.props.location.search
        const postPathName = this.props.location.pathname
        this.props.history.push(`${postPathName}`)
        // this.props.history.push(history.location.pathname)
    }

    render() {
        const { location, history, match } = this.props

        const urlParams = new URLSearchParams(location.search || '')
        const postId = urlParams.get('post_id')
        // if (!location.search) {
        //     return null
        // }
        if (!postId) {
            return null
        }

        const postIdParam = this.props.history.location.search

        console.log('what is the postIdParam', typeof postIdParam)
        console.log('what is location.search', location)
        console.log('what is the match', match)
        console.log('what is the history', history)
        console.log('what is urlParams', urlParams)
        console.log('what is the currentId in the postContainer', postId)

        return (
            <div>
                <p>This is the PostContainer component</p>
                <Modal closeModal={this.closeModal}>
                    <PostModal postId={postId} closeModal={this.closeModal} />
                </Modal>
            </div>
        )
    }
}

export default withRouter(PostContainer)
