import { combineReducers } from 'redux';
import products, { errors } from './productReducer';
import { posts }  from './generalReducer';
import { customers } from './customerReducer';
import { oilChangeServices } from './oilChangeServicesReducer';
import { dashBoard } from './dashBoardReducer';
import { vehicles } from './vehicleReducer';
import { checkoutMaching } from './checkoutReducer';
import { generalServices } from './generalServicesReducer'

const reducerApp = combineReducers({
  products,
  posts,
  customers,
  oilChangeServices,
  dashBoard,
  vehicles,
  checkoutMaching,
  generalServices
});

export default reducerApp
