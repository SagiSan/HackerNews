import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import TopStories from './components/TopStories';
import BestStories from './components/BestStories';
import NewStories from './components/NewStories';

class App extends Component {

  componentDidMount() {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty', {method: 'get'}).then((res) => {
      res
        .json()
        .then((res) => console.log(res));
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to HackerNews</h1>
        </header>
        <hr/>
        <Router>
          <div>
            <Link to="/">
              <button>Top Stories</button>
            </Link>
            <Link to="/best">
              <button>Best Storie</button>
            </Link>
            <Link to="/new">
              <button>New Stories</button>
            </Link>
            <hr/>
            <Route exact path="/" component={TopStories}/>
            <Route exact path="/best" component={BestStories}/>
            <Route exact path="/new" component={NewStories}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
