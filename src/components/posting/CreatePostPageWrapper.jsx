import React from 'react'
import { ToastContext } from '../toasts/ToastProvider'
import CreatePostPage from './CreatePostPage'

class CreatePostPageWrapper extends React.Component {
    render() {
        console.log(
            'this is the query in HomeWrapper',
            this.context.CreatePostPageWrapper
        )

        return <CreatePostPage notify={this.context.notify} />
    }
}

export default CreatePostPageWrapper

CreatePostPageWrapper.contextType = ToastContext
