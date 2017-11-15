import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import TopStories from "./components/TopStories";
import BestStories from "./components/BestStories";
import NewStories from "./components/NewStories";
import FullStory from "./components/FullStory";

import { getTopStories as gtStories } from "./reducers/topStoriesReducer";
import { getBestStories as btStories } from "./reducers/bestStoriesReducer";
import { getNewStories as ntStories } from "./reducers/newStoriesReducer";

import { connect } from "react-redux";

@connect(store => {
  return {
    /*     topStories: store.topStories,
    bestStories: store.bestStories,
    newStories: store.newStories */
  };
})
class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.getTopStories = this.getTopStories.bind(this);
    this.getBestStories = this.getBestStories.bind(this);
    this.getNewStories = this.getNewStories.bind(this);
  }

  componentWillMount() {
    this.getTopStories();
  }
  getTopStories() {
    this.props.dispatch(gtStories());
  }
  getBestStories() {
    this.props.dispatch(btStories());
  }
  getNewStories() {
    this.props.dispatch(ntStories());
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to HackerNews</h1>
        </header>
        <hr />
        <Router>
          <div>
            <Link to="/">
              <button onClick={this.getTopStories}>Top Stories</button>
            </Link>
            <Link to="/best">
              <button onClick={this.getBestStories}>Best Stories</button>
            </Link>
            <Link to="/new">
              <button onClick={this.getNewStories}>New Stories</button>
            </Link>
            <hr />
            <Route exact path="/" component={TopStories} />
            <Route exact path="/top" component={TopStories} />
            <Route exact path="/top/:id" component={FullStory} />
            <Route exact path="/best" component={BestStories} />
            <Route exact path="/new" component={NewStories} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
