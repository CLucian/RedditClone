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
        this.props.history.push('/')
    }

    render() {
        const { location, history } = this.props

        if (!location.search) {
            return null
        }

        const urlParams = new URLSearchParams(location.search)
        const postId = urlParams.get('post_id')

        console.log('what is location.search', location.search)
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
