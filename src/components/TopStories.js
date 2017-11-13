import React, {Component} from 'react';

export default class TopStories extends Component {

    constructor() {
        super();
        this.state = {
            
        }
    }

    componentDidMount() {
        fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty', {method: 'get'}).then((res) => {
            res
                .json()
                .then((res) => console.log(res));
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {

        return (
            <div>top stories</div>
        )
    }
}