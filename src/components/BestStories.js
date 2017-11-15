import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Story from "./Story";

import throttle from "lodash.throttle";

@connect(store => {
  return {
    bestStoriesID: store.bestStories.storiesID
  };
})
export default class BestStories extends Component {
  constructor() {
    super();
    this.state = {
      storyIndex: 15
    };
    this.scrollHandler = throttle(this.throttleHandler, 800);
  }
  componentDidMount() {
    if (this.loader) {
      window.addEventListener("scroll", this.scrollHandler);
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollHandler);
  }
  throttleHandler = () => {
    let el = this.loader.getBoundingClientRect();
    if (el.bottom <= window.innerHeight) {
      if (this.state.storyIndex <= 60) {
        this.updateStoryIndex();
      } else {
        this.loader.style.display = "none";
      }
    }
  };
  updateStoryIndex = () => {
    this.setState({ storyIndex: this.state.storyIndex + 15 });
  };
  render() {
    const { bestStoriesID } = this.props;
    const { storyIndex } = this.state;
    let stories;
    let listOfStories;
    if (bestStoriesID.length) {
      stories = bestStoriesID.slice(0, storyIndex);
      listOfStories = stories.map(id => {
        return (
          <Link to={`/top/${id}`} key={id}>
            <Story storyId={id} />
          </Link>
        );
      });
    }
    return (
      <div>
        {listOfStories}
        <div
          className="loader-holder"
          ref={load => {
            this.loader = load;
          }}
        >
          <img
            className="loader"
            src="https://i.stack.imgur.com/wD3lC.png"
            alt="loader"
          />
        </div>
      </div>
    );
  }
}
