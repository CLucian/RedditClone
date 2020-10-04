import React from 'react';
import axios from 'axios';

import Post from './post.component';
import { GlobalContext } from './GlobalState';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			feedData: null,
			isLoading: true
		}
	}

	componentDidMount() {
		if (this.context.accessToken){
			console.log('accessToken in home component', this.context.accessToken)
			// return axios
			// 		.request({
			// 			url: "https://oauth.reddit.com/subreddits/default",  
			// 			headers: {
			// 				// authorization: "bearer " + localStorage.getItem("access_token"),
			// 				authorization: "bearer " + this.context.accessToken,
			// 			},
			// 		})
			// 		.then((response) => {
			// 			console.log('home component feed data', response.data)
			// 		})

			return axios({
					method: "GET",
					url: "https://oauth.reddit.com/subreddits/default",
					headers: {
						Authorization: 'bearer ' + this.context.accessToken
					}
				})
				.then(response => {
					console.log('this is the response for the feed', response.data.data.children)
					console.log('this is the response for the feed', typeof(response.data.data.children))
					this.setState({
						feedData: response.data.data.children,
						isLoading: false
					})
				})
				.catch(err => { console.log('Home Component Error: ', err) })
	
   		}

	}
	
	render() {
		console.log('home context', this.context.accessToken)
		console.log('type of', typeof('hello'))
		// console.log("feedData state", typeof(this.state.feedData.children));
		// console.log('feedData children', this.state.feedData);
		if(this.state.isLoading) {
			return '...Loading'
		}

		return(
			<div>
				{ this.state.feedData.map(postData => {
					return <Post postData={postData}/>
				}) }
				{/* <Post /> */}
			</div>
		)
	}
}


Home.contextType = GlobalContext;