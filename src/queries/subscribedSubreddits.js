import axiosInstance from './axios'

export default function getSubreddits(pageDir, id) {
    let axios = axiosInstance()

    let url = `https://oauth.reddit.com/subreddits/mine/subscriber?limit=10`
    if (pageDir === 'next') {
        url = `https://oauth.reddit.com/subreddits/mine/subscriber?count=555&after=${id}&limit=10`
    } else if (pageDir === 'prev') {
        url = `https://oauth.reddit.com/subreddits/mine/subscriber?count=555&before=${id}&limit=10`
    }
    return axios({
        method: 'GET',
        url: url,
    })
        .then((response) => {
            return response
        })
        .catch((err) => {
            console.log('Home Component Error: ', err)
        })
}
