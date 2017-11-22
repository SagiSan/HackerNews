import React, { Component } from "react";

import SingleComment from "./SingleComment";

export default class Comments extends Component {

  render() {
    return (
      <div>
        <SingleComment id={this.props.id} />
      </div>
    );
  }
}
