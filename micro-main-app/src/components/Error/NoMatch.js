import React, {Component} from 'react';

class NoMatch extends Component {
    render() {
        const { location } = this.props
        return (
            <div>
                <h3>
                    No match for <code>{location.pathname}</code>
                </h3>
            </div>
        );
    }
}

export default NoMatch;