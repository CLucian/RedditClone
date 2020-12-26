import axiosInstance from './axios'
import qs from 'qs'

export default function getUser() {
    const axios = axiosInstance()
    // const data = {
    //     sr: sr,
    //     action: action,
    // }
    return axios({
        method: 'get',
        url: 'https://oauth.reddit.com/api/v1/me',
        // data: qs.stringify(data),
    })
        .then((response) => {
            return response
        })
        .catch((err) => {
            console.log(err)
        })
}
