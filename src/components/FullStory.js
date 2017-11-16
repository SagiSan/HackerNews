import React, { Component } from "react";
import axios from "axios";
import { Container, Item, Header, Comment, Divider } from "semantic-ui-react";

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
    return (
      <div>
        {story && (
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
        )}
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Container textAlign="left">
        <Comment.Group>
        <Comment>
          <Comment.Content>
            <Comment.Author as="a">Matt</Comment.Author>
            <Comment.Metadata>
              <div>Today at 5:42PM</div>
            </Comment.Metadata>
            <Comment.Text>How artistic!</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
        </Comment.Group>
        </Container>
      </div>
    );
  }
}
