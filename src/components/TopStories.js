import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Story from "./Story";

@connect(store => {
  return {
    topStoriesID: store.topStories.storiesID
  };
})
export default class TopStories extends Component {
  constructor() {
    super();
    this.state = {
      storyIndex: 15
    };
    this.updateStoryIndex = this.updateStoryIndex.bind(this);
  }
  componentDidMount() {
    window.addEventListener("scroll", e => {
      let el = this.loader.getBoundingClientRect();
      if (el.bottom <= window.innerHeight) {
        console.log(el.bottom <= window.innerHeight);
        this.updateStoryIndex();
      }
    });
  }
  updateStoryIndex() {
    this.setState({ storyIndex: this.state.storyIndex + 15 });
  }
  render() {
    const { topStoriesID } = this.props;
    const { storyIndex } = this.state;
    let stories;
    let listOfStories;
    if (topStoriesID.length) {
      stories = topStoriesID.slice(0, storyIndex);
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
          ref={load => {
            this.loader = load;
          }}
        >
          Loading
        </div>
      </div>
    );
  }
}
