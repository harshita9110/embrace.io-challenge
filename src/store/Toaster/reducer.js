import {
    SHOW_TOASTER,
    HIDE_TOASTER
} from './actions';
export function toaster(state = {
    visible: false,
    message: '',
}, action) {
  switch (action.type) {
    case SHOW_TOASTER:
      return Object.assign({}, state, {
         visible: true,
         message: action.message
      })
    case  HIDE_TOASTER :
      return Object.assign({}, state, {
          visible: false,
          message: '',
      })
    default:
      return state
  }
}
