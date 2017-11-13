import React, {Component} from 'react';

export default class FullStory extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        console.log(this.props.match.params.id);
        return (
            <div>
                {this.props.match.params.id}
            </div>
        )
    }
}