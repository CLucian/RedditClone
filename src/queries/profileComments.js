import axiosInstance from './axios'
import qs from 'qs'

export default function getAuthorAvatar(author) {
    // if (author === '[deleted]') {
    //     return null
    // }
    const axios = axiosInstance()
    const data = {
        id: author,
    }
    return axios({
        method: 'GET',
        url: `https://oauth.reddit.com/user/${author}/about`,
        data: qs.stringify(data),
    })
        .then((response) => {
            console.log('response in profileComments', response)
            return response
        })
        .catch((err) => {
            // return err
            console.log('Avatar fetch error ', err)
        })
}
