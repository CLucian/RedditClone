// import dotenv from 'dotenv'
// dotenv.config()

const getRedirectURI = () => {
    if (process.env.NODE_ENV !== 'production') {
        return process.env.REACT_APP_REDIRECT_URI_DEV
    } else {
        return process.env.REACT_APP_REDIRECT_URI_PROD
    }
}

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const REDIRECT_URI = getRedirectURI()
const DURATION = 'permanent'
const SCOPE =
    'identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread'

export { CLIENT_ID, REDIRECT_URI, DURATION, SCOPE }
