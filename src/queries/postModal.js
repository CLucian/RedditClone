import axiosInstance from './axios'

export default function getPostById(postId) {
    const axios = axiosInstance()
    return axios({
        method: 'get',
        url: `https://oauth.reddit.com/by_id/${postId}`,
        data: null,
    })
        .then((response) => {
            return response
        })
        .catch((err) => {
            console.log(err)
            console.log('what is the error', err.data)
        })
}
