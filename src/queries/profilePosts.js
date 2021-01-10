import axiosInstance from './axios'
import qs from 'qs'

export default function getPosts(pageDir, name, after, before) {
    let axios = axiosInstance()

    // let url = `https://oauth.reddit.com/user/${name}/submitted?count=555&limit=10`
    let url = `https://oauth.reddit.com/user/${name}/submitted`
    if (pageDir === 'next') {
        url = `https://oauth.reddit.com/user/${name}/submitted?count=555&after=${after}&limit=10`
    } else if (pageDir === 'prev') {
        url = `https://oauth.reddit.com/user/${name}/submitted?count=555&before=${before}&limit=10`
    }
    const data = {
        t: 'all',
        // type: 'comments',
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
