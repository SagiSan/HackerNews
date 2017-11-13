import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import TopStories from './components/TopStories';
import BestStories from './components/BestStories';
import NewStories from './components/NewStories';

import {getTopStories} from './reducers/topStoriesReducer';
import { getBestStories } from './actions/storiesActions';

import {connect} from 'react-redux';

@connect((store)=> {
  return {
    topStories: store.topStories
  }
})

class App extends Component {

  render() {
    console.log(this.props.topStories);
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
              <button onClick={getTopStories}>Top Stories</button>
            </Link>
            <Link to="/best">
              <button>Best Stories</button>
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
