import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Details } from '../components/Details';

import * as toasterActions from '../store/Toaster/actions';
import * as searchActions from '../store/Home/actions';

export class Home extends Component {
    static propTypes = {
        toasterActions: PropTypes.object.isRequired,
        searchActions: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state={
            title: null,
            type: 'movie',
            search: null,
            errors: {
                title:null
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addResultToFavorite = this.addResultToFavorite.bind(this);
    }

    addResultToFavorite(result) {
        this.props.searchActions.addFavorite(result);
    }

    async handleSubmit() {
        let errors = this.state.errors;
        this.validate();
        if(errors.title == null) {
            await this.props.searchActions.getSearchResults(this.state.title || this.state.search, this.state.type);

            if(this.props.search.message) {
                this.props.toasterActions.show('Sorry no details found ' + this.props.search.message.text);
            }
        }
    }

    handleChange(evt) {
        let { name, value } = evt.target;

        this.setState({
            [name]: value
        });
    }

    validate() {
        let { errors, title, search } = this.state;

        errors.title = title || search ? null :'Title is required';

        if( !errors.title ) {
            errors.title = !/[^a-zA-Z0-9 .-?]/.test(title)? null : 'Please enter a valid title.'
        }

        this.setState({
            'errors': errors
        });
    }


    render() {
        let alreadySearched;
        let hasSearches=this.props.search.searches.length > 0;

        let options = ['Movie','Series'].map((type,index) => {
            return(
                <option key={index} value={type.toLowerCase()}>{type}</option>
            )
        });

        if(hasSearches) {
            alreadySearched = this.props.search.searches.map((search,index) => {
                return(
                    <option key={index} value={search}>{search}</option>
                )
            });
        }


        let errors = this.state.errors;

        return(

            <div id="container--Home">
                <Link to='/favorites'>Go to favorites</Link>
                <div className="row search space-around">
                    <div>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" onChange={this.handleChange}/>
                        { errors.title ? <div className="errors">{errors.title}</div> : null}
                    </div>
                    <div className="dropdown">
                        <label htmlFor="type">Type</label>
                        <select name="type" onChange={this.handleChange}>
                            {options}
                        </select>
                    </div>
                    { hasSearches > 0 ?
                    (<div className="dropdown">
                        <label htmlFor="search">Recent Searches</label>
                        <select name="search" onChange={this.handleChange}>
                            <option></option>
                            {alreadySearched}
                        </select>
                    </div>) : null }
                    <button type="submit" disabled={ this.props.search.isFetching } onClick={this.handleSubmit}>Submit</button>
                </div>
                { this.props.search.result ? (<Details results={this.props.search.result} type="home" onClick={this.addResultToFavorite} favorites={this.props.search.favorites}/>): null }
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
        searchActions:  bindActionCreators(searchActions, dispatch)
    })
)(Home);
