import axiosInstance from './axios'

export default function getSubreddits() {
    let axios = axiosInstance()
    return axios({
        method: 'GET',
        url: `https://oauth.reddit.com/subreddits/mine/subscriber?limit=10`,
    })
        .then((response) => {
            return response
        })
        .catch((err) => {
            console.log('Home Component Error: ', err)
        })
}
