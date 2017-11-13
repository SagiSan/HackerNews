import React, {Component} from 'react';
import {connect} from 'react-redux';


@connect((store) => {
    return {
      topStories: store.topStories.stories.data,
    }
  })
export default class TopStories extends Component {

    constructor() {
        super();
        this.state = {
            
        }
    }
    render() {

        return (
            <div>top stories</div>
        )
    }
}