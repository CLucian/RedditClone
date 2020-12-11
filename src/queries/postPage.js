import axiosInstance from './axios'
import qs from 'qs'

export function getAuthorAvatar(author) {
    const axios = axiosInstance()

    const data = {
        id: author,
    }
    return axios({
        method: 'GET',
        url: `https://oauth.reddit.com/user/${author}/about`,
        data: qs.stringify(data),
    }).then((response) => {
        return response
    })
}

export function postVote(voteVal) {
    const axios = axiosInstance()
    const data = {
        dir: voteVal.toString(),
        id: this.props.postData.data.name,
    }
    axios({
        method: 'post',
        url: 'https://oauth.reddit.com/api/vote',
        data: qs.stringify(data),
    })
        .then((response) => {})
        .catch((err) => {
            console.log(err)
        })
}
