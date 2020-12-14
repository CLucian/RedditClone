import axiosInstance from './axios'
import qs from 'qs'

export default function getComments(subreddit, postCommentsId) {
    let axios = axiosInstance()

    return axios({
        method: 'GET',
        url: `https://oauth.reddit.com/${subreddit}/comments/${postCommentsId}`,
    })
        .then((response) => {
            console.log('response in comments', response)
            return response
        })
        .catch((err) => {
            console.log('Home Component Error: ', err)
        })
}
