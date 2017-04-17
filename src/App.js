import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Home from './containers/Home';
import Toaster from './components/Toaster';
import Header from './components/Header';

class App extends Component {
    render() {
        let toaster;

        if ( this.props.toaster.visible ) {
            toaster = <Toaster message={ this.props.toaster.message }/>
        }
        return (
            <div className="App">
                { toaster }
                <Header/>
                <Home />
            </div>
        );
    }
}

export default connect(
    state => ( {
        'toaster': state.toaster
    } )
)( App );
