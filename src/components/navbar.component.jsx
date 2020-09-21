import React from 'react';
import { Link } from 'react-router-dom';

import { GlobalContext } from './GlobalState';


const CLIENT_ID = "MMej7E1hI1x82A";
const REDIRECT_URI = "http://localhost:3000/authorize";
const DURATION = "permanent";
const SCOPE =
  "identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread";

const getAuthorizationURL = () =>
  `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${Math.random()}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE}`;



export default class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}

	clearStorage = () => {
		localStorage.clear();
	}

	render() {
		return (
			<React.Fragment>
				{ this.context.isLoading === false ?
					<div className="navbar">
						<ul className="navbar-links">
						<li className="list-item">
							<Link to="/">Home</Link>
						</li>
						{ this.context.accessToken ? null :
							<li className="list-item">
								<a href={getAuthorizationURL()}>Log In</a>
							</li>
						}
						<li className="list-item">
							<Link to="/about">About</Link>
						</li>
						<li className="list-item">
							<Link to="/profile">Profile</Link>
						</li>
						<li className="list-item">
							<button onClick={this.context.setLoginStatusOut}>Log out</button>
						</li>
						</ul>
					</div> 
					:
					null
				}
			</React.Fragment>
   		);
	}
}

Navbar.contextType = GlobalContext;

