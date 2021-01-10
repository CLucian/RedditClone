import axiosInstance from './axios'
import qs from 'qs'

export default function postVote(vote, comment) {
    const axios = axiosInstance()
    const data = {
        dir: vote.toString(),
        id: comment,
    }
    return axios({
        method: 'post',
        url: 'https://oauth.reddit.com/api/vote',
        data: qs.stringify(data),
    })
        .then((response) => {})
        .catch((err) => {
            console.log(err)
        })
}
