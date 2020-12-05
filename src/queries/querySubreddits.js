import axios from 'axios'
import qs from 'qs'

export const getSubreddits = (query, token) => {
    const data = {
        query: query,
    }
    return axios({
        method: 'post',
        url: 'https://oauth.reddit.com/api/search_reddit_names',
        headers: {
            Authorization: 'bearer ' + token,
            'content-type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify(data),
    })
        .then((response) => {
            return getSubredditInfo(response.data.names, token)
            console.log(' subreddit query search', response)
        })
        .catch((err) => {
            console.log(err)
            console.log('what is the error', err.data)
            alert('There was an error' + err)
        })
}

function getSubredditInfo(subredditArray, token) {
    //this does 20 calls or whatever
    const mappedArr = subredditArray.map((subreddit) => {
        return axios({
            method: 'GET',
            url: `https://oauth.reddit.com/r/${subreddit}/about/`,
            headers: {
                Authorization: 'bearer ' + token,
            },
        })
            .then((response) => {
                console.log('subreddit subreddit response', response.data.data)
                return response.data.data
            })
            .catch((err) => {
                console.log('Home Component Error: ', err)
            })
    })

    return Promise.all(mappedArr)
        .then((mappedArr) => {
            return mappedArr.filter((data) => data != null)
        })
        .catch((err) => {
            return 'there was an error' + err
        })
}
