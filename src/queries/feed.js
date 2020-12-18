import getAxios from './axios'

export function getFeed(sortBy = 'best', pageDir) {
    let url = `https://oauth.reddit.com/${sortBy}?limit=10`
    if (pageDir === 'next') {
        url = `https://oauth.reddit.com/${sortBy}?after=${this.state.after}&limit=10&count=555`
        // url = `https://oauth.reddit.com/count=555?after=${this.state.after}`
    } else if (pageDir === 'prev') {
        url = `https://oauth.reddit.com/${sortBy}?before=${this.state.before}&limit=10&count=555`
    }
    return getAxios()({
        method: 'GET',
        url: url,
    })
        .then((response) => {
            return response.data.data
        })
        .catch((err) => {
            return err
        })
}
