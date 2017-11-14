import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"

import Story from "./Story";

@connect(store => {
  return {
    newStoriesID: store.newStories.storiesID
  };
})
export default class NewStories extends Component {
  constructor() {
    super();
    this.state = {
        storyIndex: 15
    };
  }
  render() {
    const { newStoriesID } = this.props;
    const { storyIndex } = this.state;
    let stories;
    let listOfStories;
    if (newStoriesID.length) {
      stories = newStoriesID.slice(0, storyIndex);
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
