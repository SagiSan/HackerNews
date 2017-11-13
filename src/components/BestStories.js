import React, {Component} from 'react';
import {connect} from 'react-redux';


@connect((store) => {
    return {
      bestStories: store.bestStories.stories.data,
    }
  })
export default class BestStories extends Component {

    constructor() {
        super();
        this.state = {
            
        }
    }
    render() {

        return (
            <div>best stories</div>
        )
    }
}