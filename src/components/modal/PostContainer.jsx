import React from 'react'
import { withRouter } from 'react-router-dom'

// import Toast from './Toast'
import Modal from './Modal'
import PostModal from './PostModal'

class PostContainer extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    closeModal = () => {
        const postPathName = this.props.location.pathname
        this.props.history.push(`${postPathName}`)
    }

    render() {
        const { location, history, match } = this.props

        const urlParams = new URLSearchParams(location.search || '')
        const postId = urlParams.get('post_id')

        if (!postId) {
            return null
        }

        return (
            <div className="postContainer-container">
                <Modal closeModal={this.closeModal}>
                    <PostModal postId={postId} closeModal={this.closeModal} />
                </Modal>
            </div>
        )
    }
}

export default withRouter(PostContainer)
