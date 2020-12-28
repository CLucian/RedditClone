import React from 'react'
import ReactDOM from 'react-dom'

class Modal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.element = document.getElementById('modal-root')
    }

    render() {
        // if (!this.props.isVisible) {
        //     return null
        // }

        return ReactDOM.createPortal(
            <div className="modal-container">
                <div className="modal-bg" onClick={this.props.closeModal}></div>
                {/* <div className="modal-info-container"> */}
                {this.props.children}
                {/* </div> */}
            </div>,
            this.element
        )
    }
}

export default Modal
