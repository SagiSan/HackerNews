import React, { Component } from "react";
import axios from "axios";
import { Container, Item, Header, Divider, Comment } from "semantic-ui-react";

import SingleComment from "./SingleComment";

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
        `https://hacker-news.firebaseio.com/v0/item/${
          this.props.match.params.id
        }.json?print=pretty`
      )
      .then(res => {
        this.setState({ story: res.data });
      });
  }
  render() {
    const { story } = this.state;
    const comments =
      story.kids &&
      story.kids.map(id => {
        return <SingleComment key={id} id={id} />;
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
              <Comment.Group>{comments}</Comment.Group>
            </Container>
          </div>
        )}
      </div>
    );
  }
}
