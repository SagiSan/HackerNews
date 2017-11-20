import React, { Component } from "react";
import axios from "axios";
import { Container, Item, Header, Comment, Divider } from "semantic-ui-react";

import Comments from "./Comments";

export default class FullStory extends Component {
  constructor() {
    super();
    this.state = {
      story: {}
    };
  }
  componentWillMount() {
    axios
      .get(
        `https://hacker-news.firebaseio.com/v0/item/${this.props.match.params
          .id}.json?print=pretty`
      )
      .then(res => {
        this.setState({ story: res.data });
      });
  }
  render() {
    const { story } = this.state;
    console.log(story);
    const comments =
      story.kids &&
      story.kids.map(id => {
        return <Comments key={id} id={id} />;
      });
    return (
      <div>
        {story && (
          <div>
            <Container>
              <Item>
                <Item.Content>
                  <Header>
                    <a href={story.url}>{story.title}</a>
                  </Header>
                  <Item.Description>
                    <span>{story.score} points | </span>
                    <span>
                      by{" "}
                      <a className="user-link" href="">
                        {story.by}
                      </a>
                    </span>
                    <span> | {story.descendants} comments</span>
                  </Item.Description>
                </Item.Content>
              </Item>
            </Container>
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
            <Container textAlign="left">
              {comments}
            </Container>
          </div>
        )}
      </div>
    );
  }
}
