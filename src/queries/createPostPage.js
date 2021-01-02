import axiosInstance from './axios'
import qs from 'qs'

export default function submitPost(title, subreddit, type, text) {
    const axios = axiosInstance()
    const data = {
        title: title,
        sr: subreddit,
        kind: 'self',
        text: text,
    }
    return axios({
        method: 'post',
        url: 'https://oauth.reddit.com/api/submit',
        data: qs.stringify(data),
    })
        .then((response) => {
            return response
        })
        .catch((err) => {
            return err
        })
}
