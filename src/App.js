import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios';


import Home from './components/home.component';
import About from "./components/about.component";
import Authorize from "./components/authorize.component";
import ErrorPage from "./components/errorPage.component";
import Navbar from "./components/navbar.component";
import ProfileWithContext from './components/profile.component';
import GlobalState from './components/GlobalState';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }

    

  }

  // Do this in /authorize, set state for islogged in and the auth token and then conditionally redirect IF islogged in back to home page

  


  render() {
    return (
      <GlobalState>
        <Router>
          <div className="app">
            <Navbar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" exact component={About} />
              <Route path="/authorize" exact component={Authorize} />
              <Route path="/profile" exact>
                <ProfileWithContext />
              </Route>
              <Route path="/" component={ErrorPage} />
            </Switch>
          </div>
        </Router>
      </GlobalState>
    );
  }
}

export default App;
