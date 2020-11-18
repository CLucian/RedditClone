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

export function generateToken(code) {
    return axios.post('/login', { code }).then((response) => {
        return response.data.access_token
    })
}
