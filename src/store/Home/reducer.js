import {
  SEARCH_RESULTS_FETCH,
  SEARCH_RESULTS_SUCCESS,
  SEARCH_RESULTS_FAILURE,
  ADD_RECENT_SEARCHES,
  ADD_FAVORITE
} from './actions';

export function search(state = {
    isFetching: false,
    result: null,
    message: null,
    searches: [],
    favorites: []
}, action) {
    switch (action.type) {
        case SEARCH_RESULTS_FETCH:
            return Object.assign({}, state, {
            isFetching: true,
            message: null,
            result: null
        })
        case SEARCH_RESULTS_SUCCESS:
            return Object.assign({}, state, {
            isFetching: false,
            result: action.results
        })
        case SEARCH_RESULTS_FAILURE:
            return Object.assign({}, state, {
            isFetching: false,
            result: null,
            message: action.message
        })
        case ADD_RECENT_SEARCHES:
            return Object.assign({}, state, {
            searches: action.data
        })
        case ADD_FAVORITE:
            return Object.assign({}, state, {
            favorites: action.data
        })

        default:
            return state
    }
}
