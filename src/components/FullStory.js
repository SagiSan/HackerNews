import React, { Component } from "react";
import axios from "axios";
import { Container, Item, Header, Comment, Divider } from "semantic-ui-react";

export default class FullStory extends Component {
  constructor() {
    super();
    this.state = {
      story: {},
      kids: []
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
        res.data.kids.map(id => {
          axios
            .get(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
            )
            .then(res => {
              this.state.kids.push(res.data);
            });
        });
      })
      .then(() => {
        this.setState({ kids: this.state.kids });
      });
  }
  render() {
    console.log(this.state.kids);
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
              <Comment.Avatar src="/avatar-icon.png" />
              <Comment.Content>
                <Comment.Author as="a">Elliot Fu</Comment.Author>
                <Comment.Metadata>
                  <div>Yesterday at 12:30AM</div>
                </Comment.Metadata>
                <Comment.Text>
                  <p>
                    This has been very useful for my research. Thanks as well!
                  </p>
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
              <Comment.Group>
                <Comment>
                  <Comment.Avatar src="/avatar-icon.png" />
                  <Comment.Content>
                    <Comment.Author as="a">Jenny Hess</Comment.Author>
                    <Comment.Metadata>
                      <div>Just now</div>
                    </Comment.Metadata>
                    <Comment.Text>
                      Elliot you are always so right :)
                    </Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            </Comment>
          </Comment.Group>
        </Container>
      </div>
    );
  }
}
