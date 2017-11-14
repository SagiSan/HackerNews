import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"

import Story from "./Story";

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
  }
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
    return <div>{listOfStories}</div>;
  }
}
