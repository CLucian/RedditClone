import axiosInstance from './axios'
import qs from 'qs'

export default function submitPost(title, subreddit, type, text) {
    const axios = axiosInstance()
    const data = {
        title: title,
        sr: subreddit,
        kind: type,
        text: text,
    }
    return axios({
        method: 'post',
        url: 'https://oauth.reddit.com/api/submit',
        data: qs.stringify(data),
    })
        .then((response) => {
            alert('your post has gone through, ' + response)
            return response
        })
        .catch((err) => {
            alert('There was an error' + err)
        })
}
