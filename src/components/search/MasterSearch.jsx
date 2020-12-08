import React from 'react'
import SearchSVG from '../svg-components/SearchSVG'
import { MasterSearchContext } from './MasterSearchProvider'

class MasterSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
        }
    }

    handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => {
                this.context.getQueryString(this.state.query)
            }
        )
    }

    render() {
        return (
            <div className="master-search-container">
                <form className="master-search-form" type="submit">
                    <SearchSVG />
                    <input
                        type="text"
                        placeholder="search"
                        name="query"
                        value={this.state.query}
                        onChange={this.handleChange}
                    />
                </form>
            </div>
        )
    }
}

export default MasterSearch

MasterSearch.contextType = MasterSearchContext
