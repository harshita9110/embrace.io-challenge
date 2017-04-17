import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import configureStore from './store/configureStore'
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './routes';

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Routes />
        </Router>
    </Provider>,
    document.getElementById('root')
);
