import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Loader, List } from "semantic-ui-react";

import Story from "./Story";

import throttle from "lodash.throttle";

@connect(store => {
  return {
    bestStoriesID: store.bestStories.get("storiesID")
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
    if (el.bottom - 10 <= window.innerHeight) {
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
    if (bestStoriesID.size) {
      stories = bestStoriesID.slice(0, storyIndex);
      listOfStories = (
        <List link>
          {stories.map((id, index) => {
            return (
              <List.Item key={id}>
                <Story storyId={id} index={index} />
              </List.Item>
            );
          })}
        </List>
      );
    }
    return (
      <Container textAlign="left">
        {listOfStories}
        <div
          className="loader-holder"
          ref={load => {
            this.loader = load;
          }}
        >
          <Loader active inline="centered" content="Loading" />
        </div>
      </Container>
    );
  }
}
