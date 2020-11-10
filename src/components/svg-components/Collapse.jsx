import React from 'react'

const Collapse = (props) => {
    if (!props.isCollapsed) {
        return (
            <div className="collapseSVG">
                <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                >
                    <title>chevron-small-down</title>
                    <path d="M13.418 7.859c0.271-0.268 0.709-0.268 0.978 0s0.272 0.701 0 0.969l-3.908 3.83c-0.27 0.268-0.707 0.268-0.979 0l-3.908-3.83c-0.27-0.267-0.27-0.701 0-0.969s0.709-0.268 0.978 0l3.421 3.141 3.418-3.141z"></path>
                </svg>
            </div>
        )
    } else {
        return null
    }
}

export default Collapse

// <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
// <title>chevron-with-circle-down</title>
// <path d="M12.505 8.698l-2.505 2.302-2.506-2.302c-0.198-0.196-0.518-0.196-0.718 0-0.197 0.196-0.197 0.515 0 0.71l2.864 2.807c0.199 0.196 0.52 0.196 0.717 0l2.864-2.807c0.199-0.195 0.198-0.514 0-0.71-0.197-0.196-0.517-0.196-0.716 0zM10 0.4c-5.302 0-9.6 4.298-9.6 9.6 0 5.303 4.298 9.6 9.6 9.6s9.6-4.297 9.6-9.6c0-5.302-4.298-9.6-9.6-9.6zM10 18.354c-4.615 0-8.354-3.74-8.354-8.354s3.739-8.354 8.354-8.354c4.613 0 8.354 3.74 8.354 8.354s-3.741 8.354-8.354 8.354z"></path>
// </svg>
