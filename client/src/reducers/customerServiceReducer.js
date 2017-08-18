import * as actionCustomerServices  from '../actions/customerServicesAction';
import { REQUEST_GET, RECEIVE_POST } from '../actions/action';
import { posts } from './generalReducer';

let stateDefault = {
  totalDesc: 0,
  totalBruto: 0.00,
  totalItebis: 0.00,
  totalNeto: 0.00,
  supervisor: '',
  mechanic: '',
  customer: {
    customer_id:'',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    rnc:'',
  },
  vehicle: {
    vehicle_id: '',
    brand: '',
    model: '',
    numberPlace: '',
    year: '',
    km: '',
    nextKm: '',
    createdAt:'',
  },
  services:{},
  products: [
    /*{
      product_id:'',
      typeProduct: '',
      name_: '',
      price: '',
      cuantity: '',
      itebis: '',
      totalProduct: '',
    }*/
  ],
  vehicleArray:[],
  isModalListVehicle:false,
  didSaved: false,
  doneAndRedirect: false,
}

export const customerServer = (state=stateDefault, action) => {

  switch(action.type) {
    case actionCustomerServices.TOGGLE_REDIRECT:
      return {
        ...state,
        doneAndRedirect: true,
      }
    case actionCustomerServices.TOGGLE_IS_SAVED:
      return {
        ...state,
        didSaved: !state.didSaved,
      }
    case actionCustomerServices.TOGGLE_MODAL_LIST_VEHICLE:
      return {
        ...state,
        isModalListVehicle: !state.isModalListVehicle,
      }
    case actionCustomerServices.STAGE_VEHICLE_CHANGE_OIL:
      return {
        ...state,
        vehicle: {
          ...state.vehicle,
          vehicle_id: action.vehicle_id,
          brand: action.brand,
          model: action.model,
          numberPlace: action.numberPlace,
          year: action.year,
          km: action.km,
          nextKm: action.nextKm,
          typeFuel: action.typeFuel,
          createdAt: action.createdAt,
        }
      }
    case actionCustomerServices.RECEIVE_VEHICLE_ARRAY:
      return {
        ...state,
        vehicleArray: action.vehicles.map(item => item),
      }
    case actionCustomerServices.ADD_CUSTOMER_SERVER_SERVICES:
      return {
        ...state,
        services:  { ...state.services, [action.property] : action.value },
      }
    case actionCustomerServices.ADD_CUSTOMER_SERVER_PRODUCTS:
      return {
        ...state,
        products:[
        ...state.products,
         {
           product_id: action.product_id,
           typeProduct: action.typeProduct,
           name_: action.name_,
           price: action.price,
           cuantity: action.cuantity,
           itebis: action.itebis,
           totalProduct: action.totalProduct,
        }
       ]
     }
    case actionCustomerServices.GET_CUSTOMER_SERVER_CUSTOMER:
      return {
        ...state,
      }
    case actionCustomerServices.GENERAL_TOTAL_PROPERTY:
      return {
        ...state,
        totalBruto: action.totalBruto,
        totalNeto: action.totalNeto,
        totalItebis: action.totalItebis,
        totalDesc: action.totalDesc,
      }
    case actionCustomerServices.ADD_CUSTOMER_SERVER_CUSTOMER:
        return {
          ...state,
          customer: {
            ...state.customer,
            [action.property]: action.value,
            }
          }
    case actionCustomerServices.ADD_CUSTOMER_SERVER_VEHICLE:
          return {
                ...state,
                vehicle: {
                  ...state.vehicle,
                   [action.property]: action.value,
                  }
              }
     case actionCustomerServices.ADD_GENERAL_PROPERTY:
          return {
                  ...state,
                   [action.property]: action.value,
                  }
    case actionCustomerServices.STAGE_CUSTOMER_CHANGE_OIL:
      return {
        ...state,
        customer: {
          customer_id: action.customer_id,
          firstName: action.firstName,
          lastName: action.lastName,
          phoneNumber: action.phoneNumber,
          email: action.email,
          rnc: action.rnc,
        }
      }
    default: return state;

  }
}
