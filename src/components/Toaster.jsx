import React from 'react';
import PropTypes from 'prop-types'; 

export default class Toaster extends React.Component {
    static propTypes = {
        'message': PropTypes.string.isRequired,
    }

    render() {
        return (
            <div className="toaster-container">
                <div className="toaster-message">
                    { this.props.message }
                </div>
            </div>
        );
    }
}
