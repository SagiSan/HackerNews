import React, { Component } from "react";
import axios from "axios";
/* import { Link } from "react-router-dom";
 */ import {
  Header,
  Comment
} from "semantic-ui-react";
import Timestamp from "react-timestamp";

import Comments from "./Comments";

export default class SingleComment extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
      comment: {}
    };
  }
  componentWillMount() {
    axios
      .get(
        `https://hacker-news.firebaseio.com/v0/item/${
          this.props.id
        }.json?print=pretty`
      )
      .then(res => {
        this.setState({ comment: res.data });
      });
  }
  handleMore = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };
  render() {
    const { comment, collapsed } = this.state;
    //comment node
    return (
      <div className="comment">
        <Comment>
          <Comment.Avatar src="/avatar-icon.png" />
          <Comment.Content>
            <Comment.Author as="a">{comment.by}</Comment.Author>
            <Comment.Metadata>
              <div>
                <Timestamp time={comment.time} />
              </div>
            </Comment.Metadata>
            <Comment.Text>{comment.text}</Comment.Text>
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
                <Comments id={id} />;
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
