import React from 'react'

const Login = () => {
    const CLIENT_ID = 'MMej7E1hI1x82A'
    const REDIRECT_URI = 'http://localhost:3000/authorize'
    const DURATION = 'permanent'
    const SCOPE =
        'identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread'
    const getAuthorizationURL = () =>
        `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${Math.random()}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE}`

    return (
        <div className="login-container">
            <div className="welcome-text">Welcome to Lucian's Reddit Clone</div>
            <img
                className="login-img"
                src="https://cdn.vox-cdn.com/thumbor/-fMT5GzsyqcP2Vm7IWgSIKqJYTo=/0x0:640x427/1820x1213/filters:focal(0x0:640x427):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/45970810/reddit_logo_640.0.jpg"
            />
            <a href={getAuthorizationURL()} className="login-link">
                Log in
            </a>
        </div>
    )
}

export default Login
