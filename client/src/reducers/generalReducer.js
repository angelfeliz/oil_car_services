import { REQUEST_GET, RECEIVE_POST, END_TRANSATION } from '../actions/action';

export const posts = (
  state = {
    isFetching: false,
    didInvalidate: false,
    doneAndRedirect: false,
  },
  action
) => {
  switch (action.type) {
    case REQUEST_GET:

      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
        doneAndRedirect: false,
      }
    case RECEIVE_POST:
        return Object.assign({}, state, {
          isFetching : false,
          didInvalidate : false,
          doneAndRedirect: false,
        })
    case END_TRANSATION:
      return {
        ...state,
        isFetching : false,
        didInvalidate : false,
        doneAndRedirect: true,
      }
      default: return state;
  }
}


export const generalRequestFetch = () => {


}
