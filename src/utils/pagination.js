export const handlePages = () => {
    const { location } = this.props
    const urlParams = new URLSearchParams(location.search || '')
    let pageDir = null
    let pageId = null

    // determine if next page or previous page was clicked
    // set Id

    if (urlParams.get('after')) {
        pageDir = 'after'
        pageId = urlParams.get(pageDir)
    } else if (urlParams.get('before')) {
        pageDir = 'before'
        pageId = urlParams.get(pageDir)

        return this.getHomePage2(this.state.sortBy, pageDir, pageId)
    }
}
