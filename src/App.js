import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import { Button, Container, Divider, Image } from "semantic-ui-react";

import TopStories from "./components/TopStories";
import BestStories from "./components/BestStories";
import NewStories from "./components/NewStories";
import FullStory from "./components/FullStory";

import { getTopStories as gtStories } from "./reducers/topStoriesReducer";
import { getBestStories as btStories } from "./reducers/bestStoriesReducer";
import { getNewStories as ntStories } from "./reducers/newStoriesReducer";
import { addFavFromStorage as ffs } from "./reducers/favouritesReducer";

import { connect } from "react-redux";

import * as localforage from "localforage";

@connect(store => {
  return {
    /*     topStories: store.topStories,
    bestStories: store.bestStories,
    newStories: store.newStories */
    favs: store.favourites.get("favourites")
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
    /*     localforage.setItem("favs", [
      { id: "brasno" },
      { id: "brasno2" },
      { id: "brasno3" }
    ]); */
    localforage.getItem("favourites").then(favs => {
      if (favs) {
        this.props.dispatch(ffs(favs));
      }
    });
    this.getTopStories();
    this.getBestStories();
    this.getNewStories();
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
        <Router>
          <Container textAlign="left" fluid>
            <Image
              src="https://news.ycombinator.com/y18.gif"
              size="mini"
              height="40"
              inline
              spaced="left"
            />
            <span className="title"> Hacker News </span>
            <Link to="/">
              <Button
                color="orange"
                onClick={this.getTopStories}
                content="Top Stories"
              />
            </Link>
            <Link to="/best">
              <Button
                color="orange"
                onClick={this.getBestStories}
                content="Best Stories"
              />
            </Link>
            <Link to="/new">
              <Button
                color="orange"
                onClick={this.getNewStories}
                content="New Stories"
              />
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
