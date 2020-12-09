import React from 'react'

export const MasterSearchContext = React.createContext()

export default class MasterSearchProvider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
        }
    }

    getQueryString = (qString) => {
        this.setState({
            query: qString,
        })
    }

    handleStateChange = () => {}

    render() {
        return (
            <MasterSearchContext.Provider
                value={{
                    getQueryString: this.getQueryString,
                    query: this.state.query,
                }}
            >
                {this.props.children}
            </MasterSearchContext.Provider>
        )
    }
}
