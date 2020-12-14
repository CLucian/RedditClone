import axiosInstance from './axios'
import qs from 'qs'

export default function editComment(name, value) {
    let axios = axiosInstance()

    const data = {
        api_type: 'json',
        thing_id: name,
        text: value,
    }
    return axios({
        method: 'post',
        url: 'https://oauth.reddit.com/api/editusertext',
        data: qs.stringify(data),
    })
        .then((response) => {
            return response
        })
        .catch((err) => {
            alert('There was an error' + err)
        })
}
