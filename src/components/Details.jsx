import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Details extends Component {
    static propTypes = {
        results: PropTypes.array.isRequired,
        type: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        favorites: PropTypes.array
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(result, evt) {
        this.props.onClick(result);
    }

    render() {
        let results=[];
        let exists;

        results = this.props.results.map((result, index) => {
            if(this.props.favorites) {
                exists = this.props.favorites.filter(x=>x.imdbID === result.imdbID);
            }
            return (<div className="result" key={index}>
                {result.Poster !== 'N/A' ? (<img src={result.Poster} alt={result.imdbID} className="image"/>) : null}
                <p>{result.Title}</p>
                <p>{result.Year}</p>
                {this.props.type==='home' && exists.length === 0 ? <p className="clickable" onClick={ (evt) => this.handleClick(result, evt)}>Favorite</p> : null}
            </div>)
        })

        return(
            <div className="container--Detail">
                {results}
            </div>
        )
    }
}
