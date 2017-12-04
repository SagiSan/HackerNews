import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Item, Icon } from "semantic-ui-react";

import { addFavourite, removeFavourite } from "../reducers/favouritesReducer";

import * as localforage from "localforage";

@connect(store => {
  return {
    favs: store.favourites.get("favourites")
  };
})
export default class Story extends Component {
  constructor() {
    super();
    this.state = {
      story: {},
      storyAnimate: {},
      star: "empty star"
    };
  }

  componentWillMount() {
    if (this.props.favs.get(`${this.props.storyId}`)) {
      this.setState({ star: "star" });
    }
  }
  componentDidMount() {
    this.getStory();
  }
  getStory = () => {
    axios
      .get(
        `https://hacker-news.firebaseio.com/v0/item/${
          this.props.storyId
        }.json?print=pretty`
      )
      .then(res => {
        this.setState({
          story: res.data,
          storyAnimate: { transform: "translate(0)" }
        });
      });
  };
  favouriteHandler = () => {
    if (this.state.star === "empty star") {
      this.props.dispatch(addFavourite(this.state.story));
    } else {
      this.props.dispatch(removeFavourite(this.state.story));
    }
    this.setState({
      star: this.state.star === "star" ? "empty star" : "star"
    });
  };
  render() {
    const { story, star } = this.state;
    const { storyId, index } = this.props;
    const isEven = story && index % 2 === 0 ? "story-left" : "story-right";
    return (
      <div className="story-scale">
        <div className={`story ${isEven}`} style={this.state.storyAnimate}>
          <Item>
            <Item.Content>
              <Item.Header className="item-header">
                <Link to={`/top/${storyId}`}>{story && story.title}</Link>
              </Item.Header>
              <Item.Meta>
                <span>{story.score} points </span>
                <span>by {story.by}</span>
                <span> | {story.descendants} comments</span>
              </Item.Meta>
            </Item.Content>
          </Item>
          <div className="favourites">
            <Icon
              onClick={this.favouriteHandler}
              className="star"
              name={star}
              size="large"
            />
          </div>
        </div>
      </div>
    );
  }
}
