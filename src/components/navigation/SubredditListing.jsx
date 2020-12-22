import React from 'react'
import SubredditList from '../profile/SubredditList'

const SubredditListing = (props) => {
    return (
        <div className="subreddit-page-container">
            {props.subInfoArr &&
                props.subInfoArr.map((subredditData) => {
                    return <SubredditList data={subredditData} />
                })}
            {/* <div className="pagination-container">
                    {this.state.before && this.state.page > 1 && (
                        <div
                            onClick={() => {
                                this.getPage('prev')
                            }}
                            className="pagination"
                        >
                            Prev Page
                        </div>
                    )}
                    {this.state.after && (
                        <div
                            onClick={() => {
                                this.getPage('next')
                            }}
                            className="pagination"
                        >
                            Next Page
                        </div>
                    )}
                </div> */}
        </div>
    )
}

export default SubredditListing
