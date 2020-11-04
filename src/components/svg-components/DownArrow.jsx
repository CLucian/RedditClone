import React from 'react'

class DownArrow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    ArrowColor = () => {
        if (this.props.arrowClicked) {
            return 'DownArrowSVGClicked'
        } else {
            return 'ArrowNotClicked'
        }
    }

    render() {
        return (
            <div className="DownArrowDiv">
                <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="3rem"
                    height="3rem"
                    viewBox="0 0 20 20"
                >
                    <path
                        // className="DownArrowSVG"
                        className={this.ArrowColor()}
                        d="M13.418 7.859c0.271-0.268 0.709-0.268 0.978 0s0.272 0.701 0 0.969l-3.908 3.83c-0.27 0.268-0.707 0.268-0.979 0l-3.908-3.83c-0.27-0.267-0.27-0.701 0-0.969s0.709-0.268 0.978 0l3.421 3.141 3.418-3.141z"
                    ></path>
                </svg>
            </div>
        )
    }
}

export default DownArrow
