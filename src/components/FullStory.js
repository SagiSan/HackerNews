import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Item,
  Header,
  Divider,
  Comment,
  Loader
} from "semantic-ui-react";
import throttle from "lodash.throttle";

import SingleComment from "./SingleComment";

export default class FullStory extends Component {
  constructor() {
    super();
    this.state = {
      story: {},
      commentIndex: 15,
    };
    this.tHandlerScroll = throttle(this.tHandler, 200);
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
  componentDidMount() {
    window.addEventListener("scroll", this.tHandlerScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.tHandlerScroll);
  }
  tHandler = () => {
    let el = this.loader.getBoundingClientRect();
    if (el.bottom - 10 <= window.innerHeight) {
      if (this.state.commentIndex <= this.state.story.descendants) {
        this.updateCommentIndex();
      } else {
        this.loader.style.display = "none";
      }
    }
  };
  updateCommentIndex = () => {
    this.setState({ commentIndex: this.state.commentIndex + 15 });
  };
  render() {
    const { story, commentIndex } = this.state;
    const comments = story.kids && story.kids.slice(0, commentIndex);
    const listOfComments =
      comments &&
      comments.map((id,index) => {
        return <SingleComment className key={id} id={id} index={index} />;
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
              <Comment.Group>{listOfComments}</Comment.Group>
            </Container>
            <div
              className="loader-holder"
              ref={load => {
                this.loader = load;
              }}
            >
              <Loader active inline="centered" content="Loading" />
            </div>
          </div>
        )}
      </div>
    );
  }
}
