import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Story extends Component {
  constructor() {
    super();
    this.state = {
      story: {}
    };
  }

  componentDidMount() {
    this.getStory();
  }
  getStory = () => {
    axios.get(`https://hacker-news.firebaseio.com/v0/item/${this.props.storyId}.json?print=pretty`).then(res => {
        this.setState({ story: res.data });
      });
  };
  render() {
    const { story } = this.state;
    const { storyId } = this.props;
    console.log(story);
    return <div className="story">
        <Link to={`/top/${storyId}`}>{story && story.title}</Link>
    </div>;
  }
}
