import React from 'react'

const Uncollapse = (props) => {
    if (props.isCollapsed) {
        return (
            <div className="uncollapseSVG">
                <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                >
                    <title>circle-with-plus</title>
                    <path d="M10 1.6c-4.639 0-8.4 3.761-8.4 8.4s3.761 8.4 8.4 8.4 8.4-3.761 8.4-8.4c0-4.639-3.761-8.4-8.4-8.4zM15 11h-4v4h-2v-4h-4v-2h4v-4h2v4h4v2z"></path>
                </svg>
            </div>
        )
    } else {
        return <div></div>
    }
}

export default Uncollapse

{
    /* <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
<title>chevron-with-circle-right</title>
<path d="M11 10l-2.302-2.506c-0.196-0.198-0.196-0.519 0-0.718 0.196-0.197 0.515-0.197 0.71 0l2.807 2.864c0.196 0.199 0.196 0.52 0 0.717l-2.807 2.864c-0.195 0.199-0.514 0.198-0.71 0-0.196-0.197-0.196-0.518 0-0.717l2.302-2.504zM10 0.4c5.302 0 9.6 4.298 9.6 9.6 0 5.303-4.298 9.6-9.6 9.6s-9.6-4.297-9.6-9.6c0-5.302 4.298-9.6 9.6-9.6zM10 18.354c4.613 0 8.354-3.74 8.354-8.354s-3.741-8.354-8.354-8.354c-4.615 0-8.354 3.74-8.354 8.354s3.739 8.354 8.354 8.354z"></path>
</svg> */
}

{
    /* <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
<title>chevron-small-right</title>
<path d="M11 10l-3.141-3.42c-0.268-0.27-0.268-0.707 0-0.978 0.268-0.27 0.701-0.27 0.969 0l3.83 3.908c0.268 0.271 0.268 0.709 0 0.979l-3.83 3.908c-0.267 0.272-0.701 0.27-0.969 0s-0.268-0.707 0-0.978l3.141-3.419z"></path>
</svg> */
}
