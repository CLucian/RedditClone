import axiosInstance from './axios'
import qs from 'qs'

export default function postComment(name, value) {
    let axios = axiosInstance()
    const data = {
        api_type: 'json',
        thing_id: name,
        text: value,
    }
    return axios({
        method: 'post',
        url: 'https://oauth.reddit.com/api/comment',
        data: qs.stringify(data),
    })
        .then((response) => {
            return response
        })
        .catch((err) => {
            alert('There was an error' + err)
            this.props.closeReply()
        })
}
