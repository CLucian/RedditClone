import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";


import Home from './components/home.component';
import About from "./components/about.component";
import Authorize from "./components/authorize.component";
import ErrorPage from "./components/errorPage.component";
import Navbar from "./components/navbar.component";
import Profile from './components/profile.component';
import { GlobalContext } from './components/GlobalState';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }

    

  }

  // Do this in /authorize, set state for islogged in and the auth token and then conditionally redirect IF islogged in back to home page

  


  render() {
    if (this.context.isLoading){
      return 'loading...'
    }

    return (
      <div className="app">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/authorize" exact component={Authorize} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/" component={ErrorPage} />
        </Switch>
      </div>
    );
  }
}

App.contextType = GlobalContext;

export default App;
