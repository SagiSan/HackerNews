import React, { Component } from "react";
import axios from "axios";
/* import { Link } from "react-router-dom";
 */ import {
  Header,
  Comment
} from "semantic-ui-react";
import Timestamp from "react-timestamp";

export default class SingleComment extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
      comment: {}
    };
  }
  /*   componentWillMount() {
    axios
      .get(
        `https://hacker-news.firebaseio.com/v0/item/${
          this.props.id
        }.json?print=pretty`
      )
      .then(res => {
        this.setState({ comment: res.data });
      });
  } */
  /*   handleMore = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }; */
  render() {
    /*   const { comment, collapsed } = this.state; */
    //comment node
    return (
      <div className="comment">
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
      </div>
    );
  }
}
