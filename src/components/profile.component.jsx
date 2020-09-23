import React from 'react';
import axios from 'axios';
import cors from 'cors';


import qs from 'qs';


// import GlobalState from './GlobalState';
import { GlobalContext } from './GlobalState'


export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state= {
			
		};
	}


	componentDidMount() {
		console.log('in profile', this.context.accessToken);
		// axios.request({
		// 	url: "https://oauth.reddit.com/api/v1/me",
		// 	headers: {
		// 	authorization: "bearer " + this.context.accessToken,
		// 	},
		// })
    	// .then((response) => {
		// 	console.log("=====PROFILE DATA=====", response);
		// 	console.log("=====PROFILE DATA=====", response.data.name);
		// 	this.context.setProfileState({
		// 		username: response.data.name
		// 	})
      	// })
      	// .catch((err) => {
        // 	console.log(err);
      	// });
  	}

	render() {
		return (
			<div>
				{this.context.accessToken}
				<h1>This is the profile Page</h1>
				<h1>Hello there {this.context.username}</h1>
			</div>
		);
	}
};


// export default function ProfileWithContext() {
// 	return (
//       <GlobalContext.Consumer>
//         {(context) => <Profile accessToken={context.accessToken} isLoggedIn={context.isLoggedIn} />}
//       </GlobalContext.Consumer>
//     );
// }
Profile.contextType = GlobalContext;