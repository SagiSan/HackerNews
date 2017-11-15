import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Loader, List } from "semantic-ui-react";

import Story from "./Story";

import throttle from "lodash.throttle";

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
    this.tHandlerScroll = throttle(this.tHandler, 800);
  }
  componentDidMount() {
    window.addEventListener("scroll", this.tHandlerScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.tHandlerScroll);
  }
  tHandler = () => {
    let el = this.loader.getBoundingClientRect();
    if (el.bottom <= window.innerHeight) {
      if (this.state.storyIndex <= 60) {
        this.updateStoryIndex();
      } else {
        this.loader.style.display = "none";
      }
    }
  };
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
      listOfStories = (
        <List link divided>
          {stories.map(id => {
            return (
              <List.Item key={id}>
                  <Story storyId={id} />
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
