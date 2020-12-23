import axiosInstance from './axios'
import qs from 'qs'

export default function subscribe(sr, action) {
    const axios = axiosInstance()
    const data = {
        sr: sr,
        action: action,
    }
    return axios({
        method: 'post',
        url: 'https://oauth.reddit.com/api/subscribe',
        data: qs.stringify(data),
    })
        .then((response) => {
            console.log('response', response)
        })
        .catch((err) => {
            console.log(err)
        })
}
