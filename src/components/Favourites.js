import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Loader } from "semantic-ui-react";
import FavStory from "./FavStory";

import throttle from "lodash.throttle";

import { addFavFromStorage as ffs } from "../reducers/favouritesReducer";
import * as localforage from "localforage";

@connect(store => {
  return {
    favs: store.favourites.get("favourites")
  };
})
export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      storyIndex: 15,
      storyAnimate: { transform: "translate(0)" },
    };
    this.updateStoryIndex = this.updateStoryIndex.bind(this);
    this.tHandlerScroll = throttle(this.tHandler, 200);
  }
  componentDidMount() {
    localforage.getItem("favourites").then(favs => {
      if (favs) {
        this.props.dispatch(ffs(favs));
      }
    });
    window.addEventListener("scroll", this.tHandlerScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.tHandlerScroll);
  }
  tHandler = () => {
    let el = this.loader.getBoundingClientRect();
    if (el.bottom - 10 <= window.innerHeight) {
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
    const { favs } = this.props;
    const { storyIndex } = this.state;
    let stories;
    if (favs.size) {
      stories = favs.slice(0, favs.size < 15 ? favs.size : storyIndex);
    }
    if (favs && favs.size < 15 && this.loader) {
      this.loader.style.display = "none";
    }
    return (
      <Container textAlign="left">
        {stories &&
          stories.valueSeq().map((story, index) => (
            <div key={story.id}>
              <FavStory locStory={story} index={index} />
            </div>
          ))}
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
