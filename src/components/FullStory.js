import React, {Component} from 'react';
import axios from 'axios';

export default class FullStory extends Component {
    constructor() {
        super();
        this.state = {
            story: {}
        }
    }
    componentWillMount() {
        axios
            .get(`https://hacker-news.firebaseio.com/v0/item/${this.props.match.params.id}.json?print=pretty`)
            .then((res) => {
                this.setState({story: res.data});
            })
    }
    render() {
        const {story} = this.state;
        console.log(story);
        return (
            <div>
                {story &&
                <div>
                    <h3>{story.title}</h3>
                    <span>By {story.by}</span>
                </div>
                }
            </div>
        )
    }
}