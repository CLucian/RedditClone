import React from 'react'

class UpArrow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    ArrowColor = () => {
        if (this.props.arrowClicked) {
            return 'UpArrowSVGClicked'
        } else {
            return 'ArrowNotClicked'
        }
    }

    render() {
        return (
            <div className="UpArrowDiv">
                <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="3rem"
                    height="3rem"
                    viewBox="0 0 20 20"
                >
                    <title>chevron-small-up</title>
                    <path
                        className={this.ArrowColor()}
                        d="M6.582 12.141c-0.271 0.268-0.709 0.268-0.978 0s-0.272-0.701 0-0.969l3.908-3.83c0.27-0.268 0.707-0.268 0.979 0l3.908 3.83c0.27 0.267 0.27 0.701 0 0.969s-0.709 0.268-0.979 0l-3.42-3.141-3.418 3.141z"
                    ></path>
                </svg>
            </div>
        )
    }
}

export default UpArrow
