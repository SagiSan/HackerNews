import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Button, Header, Container, Divider } from "semantic-ui-react";

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
        </header>
          <Header as="h3"textAlign="center" color="blue" dividing={true}>Welcome to HackerNews</Header>
        <Router>
          <Container textAlign="center" fluid>
            <Link to="/">
              <Button onClick={this.getTopStories} content="Top Stories" />
            </Link>
            <Link to="/best">
              <Button onClick={this.getBestStories} content="Best Stories" />
            </Link>
            <Link to="/new">
              <Button onClick={this.getNewStories} content="New Stories" />
            </Link>
            <Divider clearing />
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <Route exact path="/" component={TopStories} />
            <Route exact path="/top" component={TopStories} />
            <Route exact path="/top/:id" component={FullStory} />
            <Route exact path="/best" component={BestStories} />
            <Route exact path="/new" component={NewStories} />
          </Container>
        </Router>
      </div>
    );
  }
}

export default App;
