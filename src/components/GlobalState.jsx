import React from 'react';

export const GlobalContext = React.createContext();

export default class GlobalState extends React.Component {
	state = {
		accessToken: null,
		isLoggedIn: false,
	};

	componentDidMount() {
		if (localStorage.getItem('access_token')) {
			this.setState({
				accessToken: localStorage.getItem('access_token')
			})
		}
	}

	setAuthState = (authState) => {
		authState.accessToken &&
		this.setState({
			accessToken: authState.accessToken,
			isLoggedIn: true,
		}, localStorage.setItem("access_token", this.state.accessToken));
		
	}

	setLoginStatusOut = () => {
		if (localStorage.getItem('access_token')) {
			this.setState({
				accessToken: null,
				isLoggedIn: false
			}, localStorage.clear())
		}
	}
	

	render() {
		console.log("this is the new global state", localStorage.getItem('access_token'));
		console.log('this is the new global state', this.state.accessToken)
		return (
			<GlobalContext.Provider
			value={{
				...this.state,
				setAuthState: this.setAuthState,
				setLoginStatusOut: this.setLoginStatusOut
			}}
			>
				{this.props.children}
			</GlobalContext.Provider>
    	);
	}
}