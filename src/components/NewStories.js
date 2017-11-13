import React, {Component} from 'react';
import {connect} from 'react-redux';


@connect((store) => {
    return {
      newStories: store.newStories.stories.data,
    }
  })
export default class NewStories extends Component {

    constructor() {
        super();
        this.state = {
            
        }
    }
    render() {

        return (
            <div>new stories</div>
        )
    }
}