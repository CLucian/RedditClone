import React from 'react'
import ReactDOM from 'react-dom'

class Toast extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.element = document.getElementById('toast-root')
    }

    render() {
        return ReactDOM.createPortal(
            <div className="toast-container">{this.props.children}</div>,
            this.element
        )
    }
}

export default Toast
