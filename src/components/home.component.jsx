import React from 'react'

import { withRouter } from 'react-router-dom'
import { debounce } from 'lodash'

import Post from './post.component'
import getHomePage, { getSearchQuery } from '../queries/postQuery'

import CreatePost from './posting/CreatePost'
import { MasterSearchContext } from '../components/search/MasterSearchProvider'
import MasterSearch from './search/MasterSearch'

import Loader from './svg-components/Loader'
import NextSVG from './svg-components/pageNav-svgs/NextSVG'
import PrevSVG from './svg-components/pageNav-svgs/PrevSVG'
import BestSVG from './svg-components/BestSVG'
import HotSVG from './svg-components/HotSVG'
import NewSVG from './svg-components/NewSVG'
import RisingSVG from './svg-components/RisingSVG'
import TopSVG from './svg-components/TopSVG'

const sortOptions = [
    { name: 'Best', value: 'best', icon: <BestSVG /> },
    { name: 'Hot', value: 'hot', icon: <HotSVG /> },
    { name: 'New', value: 'new', icon: <NewSVG /> },
    { name: 'Top', value: 'top', icon: <TopSVG /> },
    { name: 'Rising', value: 'rising', icon: <RisingSVG /> },
]

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            feedData: null,
            isLoading: true,
            showModal: false,
            listOpen: false,
            sortBy: 'best',
            clicked: '',
            after: null,
            before: null,
            page: 1,
            pageDir: null,
            isQuery: false,
            resize: '',
        }
    }

    componentDidMount() {
        getHomePage()
            .then((response) => {
                this.handleDataResponse(response)
            })
            .catch((err) => {
                return err
            })

        window.addEventListener('resize', this.resize)
        this.resize()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.query !== this.props.query) {
            this.handleQuerySearch()
        }
    }

    resize = () => {
        let currentWidth = window.innerWidth < 400
        if (currentWidth !== this.state.resize) {
            this.setState({
                resize: currentWidth,
            })
        }
    }

    handleQuerySearch = debounce(() => {
        getSearchQuery(
            this.state.sortBy,
            undefined,
            undefined,
            this.props.query
        ).then((response) => {
            this.setState({
                feedData: response.data.data.children,
                after: response.data.data.after,
                before: response.data.data.before,
                isQuery: true,
            })
        })
    }, 300)

    handleSort = (category) => {
        this.setState(
            {
                sortBy: category,
            },
            () =>
                getHomePage(category, undefined, undefined).then((response) => {
                    this.handleDataResponse(response)
                })
        )
    }

    handleDataResponse = (response, queryState) => {
        this.setState({
            feedData: response.data.data.children,
            isLoading: false,
            after: response.data.data.after,
            before: response.data.data.before,
            isQuery: queryState,
        })
    }

    getPage = (pageDir) => {
        const newPage =
            pageDir === 'next' ? this.state.page + 1 : this.state.page - 1
        const ids = pageDir === 'next' ? this.state.after : this.state.before

        if (this.state.isQuery) {
            this.setState({ page: newPage }, () => {
                getSearchQuery(
                    this.state.sortBy,
                    pageDir,
                    ids,
                    this.props.query
                ).then((response) => {
                    this.handleDataResponse(response, true)
                })
            })
        } else {
            this.setState(
                {
                    page: newPage,
                },
                () =>
                    getHomePage(this.state.sortBy, pageDir, ids).then(
                        (response) => {
                            this.handleDataResponse(response, false)
                        }
                    )
            )
        }
    }

    render() {
        if (this.state.isLoading) {
            return <Loader />
        }

        return (
            <div>
                <div className="sort-container">
                    <div className="sortByMenuContainer">
                        <div className="sort-by-text"></div>
                        {sortOptions.map((option) => (
                            <div
                                onClick={() => this.handleSort(option.value)}
                                className={`menu-svg-container ${
                                    this.state.sortBy === option.value
                                        ? 'active-menu'
                                        : ''
                                }`}
                            >
                                {option.icon}
                                <div className="sort-by-text">
                                    {option.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="create-post-master">
                    <div className="create-post-container">
                        <div className="media-post-container">
                            <MasterSearch />
                            <CreatePost />
                        </div>
                    </div>
                </div>
                {this.state.feedData.map((postData) => {
                    return (
                        <Post
                            onClick={this.openModal}
                            postData={postData}
                            key={postData.data.id}
                        />
                    )
                })}
                <div className="pagination-container">
                    {this.state.before && this.state.page > 1 && (
                        <div
                            onClick={() => {
                                this.getPage('prev')
                            }}
                            className="pagination"
                        >
                            <PrevSVG />
                        </div>
                    )}
                    {this.state.after && (
                        <div
                            onClick={() => {
                                this.getPage('next')
                            }}
                            className="pagination"
                        >
                            <NextSVG />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default withRouter(Home)

Home.contextType = MasterSearchContext
