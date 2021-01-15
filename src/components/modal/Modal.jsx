import React from 'react'
import ReactDOM from 'react-dom'

class Modal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.element = document.getElementById('modal-root')
    }

    render() {
        return ReactDOM.createPortal(
            <div className="modal-container">
                <div className="modal-bg" onClick={this.props.closeModal}></div>
                {this.props.children}
            </div>,
            this.element
        )
    }
}

export default Modal
