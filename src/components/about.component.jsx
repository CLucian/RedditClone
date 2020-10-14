import React from 'react';

import { GlobalContext } from './GlobalState';


export default class About extends React.Component {

	render() {
		console.log(
			"global state",
			this.context,
			"with token being:",
			this.context.accessToken);
		return (
			<div>
				<h1>Hello from the About page</h1>
			</div>
		);
	}
}

About.contextType = GlobalContext;