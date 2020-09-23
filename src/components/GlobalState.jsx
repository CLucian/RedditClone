import React from 'react';
import axios from 'axios';

export const GlobalContext = React.createContext();

export default class GlobalState extends React.Component {
	state = {
		accessToken: null,
		isLoggedIn: false,
		isLoading: true,
		username: null
	};

	componentDidMount() {
		// if (localStorage.getItem('access_token')) 


		if (localStorage.getItem('access_token')) {
			console.log("has token, setting as", localStorage.getItem("access_token"));

			axios
				.request({
					url: "https://oauth.reddit.com/api/v1/me",
					headers: {
					authorization: "bearer " + localStorage.getItem('access_token'),
					},
				})
				.then((response) => {
					console.log("=====PROFILE DATA=====", response);
					console.log("=====PROFILE DATA=====", response.data.name);
					this.setState({
					username: response.data.name,
					});
					console.log("this.state.username", this.state.username);
				})
				.catch((err) => {
					console.log(err);
				});

		// setTimeout(() => {
			this.setState({
				accessToken: localStorage.getItem('access_token'),
				isLoading: false
			})
			// }, 1500);
		} else {
			this.setState({
				isLoading: false
			})
		}


		
	}

	setAuthState = (authState) => {
		if (authState.accessToken){
			console.log("token is", authState.accessToken);
			localStorage.setItem("access_token", authState.accessToken);
			this.setState({
				accessToken: authState.accessToken,
				isLoggedIn: true,
			});
		}
	}

	// setProfileState = (profileState) => {
	// 	localStorage.setItem("username", profileState.username);
	// 		this.setState({
	// 			username: profileState.username,
	// 		});
	// }

	setLoginStatusOut = () => {
		if (localStorage.getItem('access_token')) {
			localStorage.clear()
			this.setState({
				accessToken: null,
				isLoggedIn: false,
				username: null
			})
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
				setLoginStatusOut: this.setLoginStatusOut,
				setProfileState: this.setProfileState,
			}}
			>
				{this.props.children}
			</GlobalContext.Provider>
    	);
	}
}