import React, { Component } from 'react';
import axios from 'axios';

export default class Story extends Component {
    constructor() {
        super();
        this.state = {
            story: {}
        }
    }

    componentWillMount() {
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${this.props.storyId}.json?print=pretty`)
            .then((res) => {
                this.setState({ story: res.data });
            });
    }

    render() {
        const { story } = this.state;
        return (
            <div className="story">
                {story && story.title}
            </div>
        )
    }
}