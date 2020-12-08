// import axios from 'axios'
import axiosInstance from './axios'

export default function getHomePage(sortBy = 'best', pageDir, pageId) {
    const axios = axiosInstance()

    let url = `https://oauth.reddit.com/${sortBy}?limit=10`
    if (pageDir === 'next') {
        url = `https://oauth.reddit.com/${sortBy}?after=${pageId}&limit=10&count=555`
    } else if (pageDir === 'prev') {
        url = `https://oauth.reddit.com/${sortBy}?before=${pageId}&limit=10&count=555`
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
