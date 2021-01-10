import axiosInstance from './axios'

export function searchSubreddit(subreddit, query) {
    const axios = axiosInstance()

    let url = `https://oauth.reddit.com/r/${subreddit}/search?q=${query}&limit=10&restrict_sr=on`

    return axios({
        method: 'GET',
        url: url,
    })
        .then((response) => {
            return response
        })
        .catch((err) => {
            console.log('Search In Subreddit Error: ', err)
        })
}

export function getSubredditPosts(
    pageDir,
    subreddit,
    pageId,
    category = 'best',
    query
) {
    // url = `https://oauth.reddit.com/r/${subreddit}/search?q=${query}&${category}&limit=10&restrict_sr=on&count=555&after=${pageId}&limit=10`
    const axios = axiosInstance()
    // let url = `https://oauth.reddit.com/r/${this.props.match.params.id}/${this.state.category}?limit=10`
    let url = `https://oauth.reddit.com/r/${subreddit}/${category}?limit=10`
    if (query !== null && pageDir === 'next') {
        url = `https://oauth.reddit.com/r/${subreddit}/search?q=${query}&${category}&restrict_sr=on&count=555&after=${pageId}&limit=10`
    } else if (query !== null && pageDir === 'prev') {
        url = `https://oauth.reddit.com/r/${subreddit}/search?q=${query}&${category}&restrict_sr=on&count=555&before=${pageId}&limit=10`
    } else if (query !== null) {
        url = `https://oauth.reddit.com/r/${subreddit}/search?q=${query}&${category}&restrict_sr=on&count=555&limit=10`
    } else if (query === null && pageDir === 'next') {
        url = `https://oauth.reddit.com/r/${subreddit}/${category}?after=${pageId}&restrict_sr=on&count=555&limit=10`
    } else if (query === null && pageDir === 'prev') {
        url = `https://oauth.reddit.com/r/${subreddit}/${category}?before=${pageId}&restrict_sr=on&count=555&limit=10`
    } else {
        url = `https://oauth.reddit.com/r/${subreddit}/${category}?limit=10`
    }
    // } else if (pageDir === 'next') {
    //     // url = `https://oauth.reddit.com/r/${this.props.match.params.id}/${this.state.category}?count=555&after=${this.state.after}&limit=10`
    //     url = `https://oauth.reddit.com/r/${subreddit}/${category}?limit=10&after=${pageId}&count=555`
    // } else if (pageDir === 'prev') {
    //     // url = `https://oauth.reddit.com/r/${this.props.match.params.id}/${this.state.category}?count=555&before=${this.state.before}&limit=10`
    //     url = `https://oauth.reddit.com/r/${subreddit}/${category}?limit=10&before=${pageId}&count=555`
    // }
    return axios({
        method: 'GET',
        url: url,
    })
        .then((response) => {
            return response
            // this.setState({
            //     subredditData: response.data.data.children,
            //     isLoading: false,
            //     before: response.data.data.before,
            //     after: response.data.data.after,
            // })
        })
        .catch((err) => {
            console.log('Home Component Error: ', err)
        })
}

export function getSubredditDetails(subreddit) {
    const axios = axiosInstance()
    return axios({
        method: 'GET',
        url: `https://oauth.reddit.com/r/${subreddit}/about/`,
    })
        .then((response) => {
            return response
            // this.setState({
            //     currentSubreddit: response.data.data,
            // })
        })
        .catch((err) => {
            console.log('Home Component Error: ', err)
        })
}
