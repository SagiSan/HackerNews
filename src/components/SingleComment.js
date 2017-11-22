import React, { Component } from "react";
import axios from "axios";
import { Comment } from "semantic-ui-react";
import Timestamp from "react-timestamp";

import Comments from "./Comments";

export default class SingleComment extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
      comment: {},
      storyAnimate: {}
    };
  }
  componentDidMount() {
    axios
      .get(
        `https://hacker-news.firebaseio.com/v0/item/${
          this.props.id
        }.json?print=pretty`
      )
      .then(res => {
        this.setState({
          comment: res.data,
          storyAnimate: { transform: "translate(0)" }
        });
      });
  }
  handleMore = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };
  render() {
    const { comment, collapsed, storyAnimate } = this.state;
    const { index } = this.props;
    const isEven = comment && index % 2 === 0 ? "story-left" : "story-right";
    return (
      <div className={`comment ${isEven}`} style={storyAnimate}>
        <Comment>
          <Comment.Avatar src="/avatar-icon.png" />
          <Comment.Content>
            <Comment.Author as="a">{comment.by}</Comment.Author>
            <Comment.Metadata>
              <div>
                <Timestamp time={comment.time} />
              </div>
            </Comment.Metadata>
            <Comment.Text>
              <div dangerouslySetInnerHTML={{ __html: comment.text }} />
            </Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
              {comment.kids && (
                <Comment.Action onClick={this.handleMore}>
                  {collapsed ? "More" : "Less"}
                </Comment.Action>
              )}
            </Comment.Actions>
          </Comment.Content>
          {comment.kids && (
            <Comment.Group collapsed={collapsed}>
              {comment.kids.map(id => {
                return <Comments key={id} id={id} />;
              })}
            </Comment.Group>
          )}
        </Comment>
        {/*        <Comment.Group>
          <Comment>
            <Comment.Avatar src="/avatar-icon.png" />
            <Comment.Content>
              <Comment.Author as="a">{comment.by}</Comment.Author>
              <Comment.Metadata>
                <div>
                  <Timestamp time={comment.time} />
                </div>
              </Comment.Metadata>
              <Comment.Text>
                <div dangerouslySetInnerHTML={{ __html: comment.text }} />
              </Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
                <Comment.Action onClick={this.handleMore}>
                  {collapsed ? "More" : "Less"}
                </Comment.Action>
              </Comment.Actions>
            </Comment.Content>
            <Comment.Group collapsed={collapsed}>
              <Comment>
                <Comment.Avatar src="/avatar-icon.png" />
                <Comment.Content>
                  <Comment.Author as="a">Jenny Hess</Comment.Author>
                  <Comment.Metadata>
                    <div>Just now</div>
                  </Comment.Metadata>
                  <Comment.Text>Elliot you are always so right :)</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>
          </Comment>
        </Comment.Group>
        <Header hidden /> */}
      </div>
    );
  }
}
