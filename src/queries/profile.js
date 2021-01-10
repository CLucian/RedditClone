import axiosInstance from './axios'
import qs from 'qs'

export default function getProfile(pageDir, name, after, before) {
    let axios = axiosInstance()

    let url = `https://oauth.reddit.com/user/${name}/comments?count=555&limit=10`
    if (pageDir === 'next') {
        url = `https://oauth.reddit.com/user/${name}/comments?after=${after}&count=555&limit=10`
    } else if (pageDir === 'prev') {
        url = `https://oauth.reddit.com/user/${name}/comments?before=${before}&count=555&&limit=10`
    }
    const data = {
        t: 'all',
        type: 'comments',
        sort: 'new',
        limit: '100',
    }
    return axios({
        method: 'get',
        url: url,
        data: qs.stringify(data),
    })
        .then((response) => {
            return response
        })
        .catch((err) => {
            console.log(err)
            console.log('what is the error', err.data)
            alert('There was an error' + err)
        })
}
