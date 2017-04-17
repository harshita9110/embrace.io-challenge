import React from 'react';
import logo from '../../public/embrace.png';

export default class Header extends React.Component {
    render() {
        return (
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcome to your entertainment search</h2>
            </div>
        );
    }
}
