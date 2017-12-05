import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Loader, Item, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";

import throttle from "lodash.throttle";

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
      storyAnimate: { transform: "translate(0)" }
    };
    this.updateStoryIndex = this.updateStoryIndex.bind(this);
    this.tHandlerScroll = throttle(this.tHandler, 200);
  }
  componentDidMount() {
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
/*     const { storyIndex } = this.state;
    let stories;
    if (favs.size) {
      stories = favs.slice(0, favs.size < 15 ? favs.size : storyIndex);
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
    } */
    return (
      <Container textAlign="left">
        {favs.valueSeq().map((story, index) => (
          <div key={story.id}>
            <div className="story-scale">
              <div
                className={`story ${
                  index % 2 === 0 ? "story-left" : "story-right"
                }`}
                style={this.state.storyAnimate}
              >
                <Item>
                  <Item.Content>
                    <Item.Header className="item-header">
                      <Link to={`/top/${story.id}`}>
                        <div className="fav-title"
                          dangerouslySetInnerHTML={{
                            __html: story.title
                          }}
                        />
                      </Link>
                    </Item.Header>
                    <Item.Meta>
                      <span>{story.score} points </span>
                      <span>by {story.by}</span>
                      <span> | {story.descendants} comments</span>
                    </Item.Meta>
                  </Item.Content>
                </Item>
              </div>
            </div>
            <Divider hidden />
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
