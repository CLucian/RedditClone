import {
    port_dev,
    port_prod,
    client_id,
    client_secret,
    redirect_uri_dev,
    redirect_uri_prod,
} from '../../config'

const getRedirectURI = () => {
    if (process.env.NODE_ENV !== 'production') {
        return port_dev
    } else {
        return port_prod
    }
}

export const loginFnc = () => {
    const CLIENT_ID = 'MMej7E1hI1x82A'
    const REDIRECT_URI = 'http://localhost:4000/authorize'
    const DURATION = 'permanent'
    const SCOPE =
        'identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread'

    const getAuthorizationURL = () =>
        `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${Math.random()}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE}`

    getAuthorizationURL()
}

const ACCESS_TOKEN_KEY = 'access_token'

export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function setAccessToken(token) {
    return localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export function clearAccessToken() {
    return localStorage.removeItem(ACCESS_TOKEN_KEY)
}
