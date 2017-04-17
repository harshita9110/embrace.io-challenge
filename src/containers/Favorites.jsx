import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Header from '../components/Header';

import { Details } from '../components/Details';

import * as toasterActions from '../store/Toaster/actions';

export class Favorites extends Component {
    static propTypes = {
        toasterActions: PropTypes.object.isRequired
    };

    render() {
        let favorites = this.props.search.favorites;
        return(
            <div id="container--Favorites">
                <Header/>
                <Link to='/'>Back</Link>
                { favorites.length> 0 ? (<Details results={favorites} type="favorites"/>) : <div className="search">No favorites found. Add some to view them here.</div>}
            </div>
        )
    }

}

export default connect(
    state => ({
        search: state.search
    }),
    dispatch => ({
        toasterActions: bindActionCreators(toasterActions, dispatch),
    })
)(Favorites);
