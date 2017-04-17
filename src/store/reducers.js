import { combineReducers } from 'redux'
import { search } from './Home/reducer';
import { toaster } from './Toaster/reducer';

const rootReducer = combineReducers({
    search,
    toaster
})

export default rootReducer
