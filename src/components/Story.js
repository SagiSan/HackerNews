import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Item, Icon } from "semantic-ui-react";

export default class Story extends Component {
  constructor() {
    super();
    this.state = {
      story: {},
      storyAnimate: {},
      star: "empty star"
    };
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
              onClick={() =>
                this.setState({
                  star: this.state.star === "star" ? "empty star" : "star"
                })
              }
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
