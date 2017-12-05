import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Item, Icon } from "semantic-ui-react";
import Timestamp from "react-timestamp";

@connect(store => {
  return {
    favs: store.favourites.get("favourites")
  };
})
export default class FavStory extends Component {
  constructor() {
    super();
    this.state = {
      story: {},
      storyAnimate: {},
      eye: "unhide",
      redCrossed: ""
    };
  }

  componentDidMount() {
    this.getStory();
  }
  getStory = () => {
    axios
      .get(
        `https://hacker-news.firebaseio.com/v0/item/${
          this.props.locStory.id
        }.json?print=pretty`
      )
      .then(res => {
        this.setState({
          story: res.data,
          storyAnimate: { transform: "translate(0)" }
        });
      });
  };
  compareHandler = () => {
    if (this.state.eye === "unhide") {
      this.setState({ eye: "hide", redCrossed: "red-cross" });
    } else {
      this.setState({ eye: "unhide", redCrossed: "" });
    }
  };
  render() {
    const { story, eye, redCrossed } = this.state;
    const { locStory, index } = this.props;
    const isEven = story && index % 2 === 0 ? "story-left" : "story-right";
    return (
      <div className="story-scale">
        <div className={`story ${isEven}`} style={this.state.storyAnimate}>
          <Item>
            <Item.Content>
              <Item.Header className="item-header">
                <Link to={`/top/${locStory.id}`}>
                  <div
                    className="fav-title"
                    dangerouslySetInnerHTML={{ __html: locStory.title }}
                  />
                </Link>
              </Item.Header>
              <Item.Meta>
                <span className={redCrossed}>{locStory.score} points </span>
                <span>by {locStory.by}</span>
                <span className={redCrossed}>
                  {" "}
                  | {locStory.descendants} comments |{" "}
                </span>
                <span>
                  <span>last updated </span>{" "}
                  <Timestamp time={locStory.timestamp / 1000} />{" "}
                </span>
                <div>
                  {eye === "hide" && (
                    <span>
                      <span className="green-new">{story.score} points </span>
                      <span>by {story.by} </span>
                      <span className="green-new">
                        {" "}
                        | {story.descendants} comments |{" "}
                      </span>
                      <span>
                        <span>created </span> <Timestamp time={story.time} />{" "}
                      </span>
                    </span>
                  )}
                  <div className="favourites">
                    <Icon
                      onClick={this.compareHandler}
                      className={eye}
                      name={eye}
                      size="large"
                    />
                  </div>
                </div>
              </Item.Meta>
            </Item.Content>
          </Item>
          {/* <div className="favourites">
            <Icon
              onClick={this.compareHandler}
              className={eye}
              name={eye}
              size="large"
            />
          </div> */}
        </div>
      </div>
    );
  }
}
