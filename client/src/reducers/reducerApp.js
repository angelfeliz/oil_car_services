import { combineReducers } from 'redux';
import products, { errors } from './productReducer';
import { posts }  from './generalReducer';
import { customers } from './customerReducer';
import { customerServer } from './customerServiceReducer';
import { dashBoard } from './dashBoardReducer';
import { vehicles } from './vehicleReducer';
import { checkoutMaching } from './checkoutReducer';

const reducerApp = combineReducers({
  products,
  posts,
  customers,
  customerServer,
  dashBoard,
  vehicles,
  checkoutMaching
});

export default reducerApp
