import {getResults} from '../../api/search';

export const SEARCH_RESULTS_FETCH = 'SEARCH_RESULTS_FETCH';
export const SEARCH_RESULTS_SUCCESS = 'SEARCH_RESULTS_SUCCESS';
export const SEARCH_RESULTS_FAILURE = 'SEARCH_RESULTS_FAILURE';

export function initiateSearchResults() {
    return {
        type: SEARCH_RESULTS_FETCH
    }
}

export function searchResultsSuccess(data) {
    return {
        type: SEARCH_RESULTS_SUCCESS,
        results: data
    }
}

export function searchResultsFailure(message) {
    return {
        type: SEARCH_RESULTS_FAILURE,
        message: message
    }
}

export function getSearchResults(title, type) {
    return async (dispatch, getState) => {
        try{
            dispatch(initiateSearchResults());
            let recent;
            recent = getState().search.searches;
            let exists = recent.filter(x=>x===title);
            if(exists.length === 0) {
                recent.push(title);
                dispatch(addSearchResult(recent));
            }

            let results = await getResults(title, type);

            if( results.Search ) {
                dispatch(searchResultsSuccess(results.Search));
            } else if( results.Error ) {
                dispatch(searchResultsFailure(results.Error));
                recent = getState().search.searches;
                recent.pop();
            }

        } catch(e) {
            console.log(e);
            dispatch(searchResultsFailure());
        }
  }
}

export const ADD_RECENT_SEARCHES = 'ADD_RECENT_SEARCHES';

export function addSearchResult(search) {
    return {
        type: ADD_RECENT_SEARCHES,
        data: search
    }
}

export const ADD_FAVORITE = 'ADD_FAVORITE';

export function addToFavorite(favorite) {
    return {
        type: ADD_FAVORITE,
        data: favorite
    }
}

export function addFavorite(favorite) {
    return (dispatch, getState) => {
        let favorites = getState().search.favorites;

        favorites.push(favorite);
        dispatch(addToFavorite(favorites));
    }
}
