import React from 'react';
import axios from 'axios';

// import GlobalState from './GlobalState';
import { GlobalContext} from './GlobalState'

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state={};
	}

	render() {
		console.log('This is the accessToken', this.props.accessToken)
		console.log('is this logged in?', this.props.isLoggedIn)
		return (
			<div>
				<h1>This is the profile Page</h1>
			</div>
		);
	}
};


export default function ProfileWithContext() {
	return (
      <GlobalContext.Consumer>
        {(context) => <Profile accessToken={context.state.accessToken} isLoggedIn={context.state.isLoggedIn} />}
      </GlobalContext.Consumer>
    );
}
// Profile.contextType = GlobalContext;