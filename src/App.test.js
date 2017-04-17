import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';
var expect = chai.expect;

import configureStore from './store/configureStore';
import { search } from './store/Home/reducer';
import * as searchActions from './store/Home/actions';

import {
    SEARCH_RESULTS_FETCH,
    SEARCH_RESULTS_SUCCESS,
    SEARCH_RESULTS_FAILURE
} from './store/Home/actions';

const store = configureStore( {} );

describe('Search should return results', async function(){
    let search;

    it('Should get search info ', async function(){
        await (searchActions.getSearchResults('beauty','movie'))(store.dispatch, store.getState);
        search = store.getState().search.result;
        expect(search[0].Type).to.equal('movie');
    })
});

describe('Should return error message on search failure', async function(){
    let message;

    it('Should return error message', async function(){
        await (searchActions.getSearchResults('123234','movie'))(store.dispatch, store.getState);
        message = store.getState().search.message;
        expect(message).to.equal('Movie not found!');
    })
});

describe('Should correctly populate the reducer', function(){
    let searchresults, error;
    let initialState = {
        isFetching: false,
        result: null,
        message: null,
        searches: [],
        favorites: []
    };

    it('Should populate the search results in reducer on success', function(){
        searchresults = search(initialState,{
            type: SEARCH_RESULTS_SUCCESS,
            results: {
                data:{
                    title:'Beauty and the Beast',
                    type: 'movie'
                }
            }
        });

        expect(searchresults.result.data.title).to.equal('Beauty and the Beast');
    })

    it('Should populate the errors in reducer on failure', function(){
        error = search(initialState,{
            type: SEARCH_RESULTS_FAILURE,
            message: {
                text:'Movie not found',
            }
        });

        expect(error.message.text).to.equal('Movie not found');
    })
});
