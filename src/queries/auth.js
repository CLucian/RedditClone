import axios from 'axios'

export function fetchProfile(token) {
    return axios
        .request({
            url: 'https://oauth.reddit.com/api/v1/me',
            headers: {
                authorization: 'bearer ' + token,
            },
        })
        .then((response) => {
            return response.data
        })
}

// this is where it hits the backend
export function generateToken(code) {
    // make post to my server with code data (this code is necessary to further make post req to reddit server for auth token)
    return axios.post('/login', { code }).then((response) => {
        return response.data.access_token
    })
}
