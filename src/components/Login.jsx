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
        <div>
            <a href={getAuthorizationURL()}>Log in</a>
        </div>
    )
}

export default Login
