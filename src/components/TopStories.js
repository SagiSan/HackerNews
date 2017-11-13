import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Story from './Story';

@connect((store) => {
    return {topStories: store.topStories.stories}
})
export default class TopStories extends Component {

    constructor() {
        super();
        this.state = {
            storyIndex: 15
        }
    }
    render() {
        const {topStories} = this.props;
        const {storyIndex} = this.state;
        let stories;
        let listOfStories;
        if (topStories.length) {
            stories = topStories.slice(0, storyIndex);
            listOfStories = stories.map((id) => {
                return <Link to={`/top/${id}`} key={id}><Story storyId={id}/></Link>
            });
        }
        return (
            <div>
                {listOfStories}
            </div>
        )
    }
}