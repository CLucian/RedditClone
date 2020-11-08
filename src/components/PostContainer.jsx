import React from 'react'
import { withRouter } from 'react-router-dom'

import Modal from './Modal'
import PostModal from './PostModal'

class PostContainer extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    // i need a componentDidUpdate to see if it to see if theres a postid then i set it to state

    // getId = (url) => {
    //     return url.searchParams.get('post_id')
    // }

    // Post container needs a function to pass down to the post modal - close function that closes modal by getting
    // rid of post id in the url (history.push)

    closeModal = () => {
        this.props.history.push('/')
    }

    clearHistory = () => {
        this.props.history.push('/')
    }

    render() {
        const { location, history } = this.props
        // console.log('This is the location in the post container', location)

        if (!location.search) {
            return null
        }

        const urlParams = new URLSearchParams(location.search)
        const postId = urlParams.get('post_id')

        console.log('what is the currentId in the postContainer', postId)

        return (
            <div>
                <p>This is the PostContainer component</p>
                <Modal
                    closeModal={this.closeModal}
                    // isVisible={this.state.showModal}
                >
                    <PostModal
                        clearHistory={this.clearHistory}
                        postId={postId}
                        closeModal={this.closeModal}
                        // closeModal={this.closeModal}
                        // thumbnail={this.defaultThumbnail}
                        // postData={this.props.postData.data}
                        // accessToken={this.props.accessToken}
                    />
                </Modal>
            </div>
        )
    }
}

export default withRouter(PostContainer)
