import fetch from 'isomorphic-fetch';
import api from '../api';

export const REQUEST_GET = 'REQUEST_GET';
export const RECEIVE_POST = 'RECEIVE_POST';
export const END_TRANSATION = 'END_TRANSACCION';

export const endAndRideract = () => {
  return {
    type: END_TRANSATION,
  }
}
export const requestFetch = (state) => {
  return {
    type: REQUEST_GET,
    state
  }
}

export const responsesFetch = (state) => {
  return {
    type: RECEIVE_POST,
    state
  }
}

export const generalRequestFetch = () => {
  return {
    type: REQUEST_GET,
  }
}

export default requestFetch
