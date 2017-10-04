import * as actionOilChangeServicesType  from '../actions/oilChangeServicesAction';
import { REQUEST_GET, RECEIVE_POST } from '../actions/action';
import { posts } from './generalReducer';

let stateDefault = {
  totalDesc: 0,
  totalBruto: 0.00,
  totalItebis: 0.00,
  totalNeto: 0.00,
  totalNetoClone:0.00,
  labor:'',
  supervisor: '',
  mechanic: '',
  paymentType: 'cash',
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
    typeFuel:'',
  },
  services:{},
  products: [
    /*{
      product_id:'',
      typeProduct: '',
      name_: '',
      price: '',
      quantity: '',
      itebis: '',
      totalProduct: '',
    }*/
  ],
  vehicleArray:[],
  isModalListVehicle:false,
  didSaved: false,
  doneAndRedirect: false,
  oilChangeErrors: [],
}

export const oilChangeServices = (state=stateDefault, action) => {

  switch(action.type) {
    case actionOilChangeServicesType.NEW_NETO_OIL_CHANGE:
      return {
        ...state,
        totalNeto: action.neto,
        labor:action.labor
      }
    case actionOilChangeServicesType.CLEAR_OIL_CHANGE:
      return stateDefault

    case actionOilChangeServicesType.ADD_OIL_CHANGE_ERRORS:
      return {
        ...state,
        oilChangeErrors:[
          ...state.oilChangeErrors,
           action.errors.map(item => item)
        ]
      }
    case actionOilChangeServicesType.TOGGLE_REDIRECT:
      return {
        ...state,
        doneAndRedirect: true,
      }
    case actionOilChangeServicesType.TOGGLE_IS_SAVED:
      return {
        ...state,
       didSaved: !state.didSaved,
      }
    case actionOilChangeServicesType.TOGGLE_MODAL_LIST_VEHICLE:
      return {
        ...state,
        isModalListVehicle: !state.isModalListVehicle,
      }
    case actionOilChangeServicesType.STAGE_VEHICLE_CHANGE_OIL:
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
    case actionOilChangeServicesType.RECEIVE_VEHICLE_ARRAY:
      return {
        ...state,
        vehicleArray: action.vehicles.map(item => item),
      }
    case actionOilChangeServicesType.ADD_CUSTOMER_SERVER_SERVICES:
      return {
        ...state,
        services:  { ...state.services, [action.property] : action.value },
      }
    case actionOilChangeServicesType.ADD_CUSTOMER_SERVER_PRODUCTS:
      return {
        ...state,
        products:[
        ...state.products,
         {
           product_id: action.product_id,
           productType: action.productType,
           name_: action.name_,
           price: action.price,
           quantity: action.quantity,
           itebis: action.itebis,
           totalProduct: action.totalProduct,
        }
       ]
     }
    case actionOilChangeServicesType.GET_CUSTOMER_SERVER_CUSTOMER:
      return {
        ...state,
      }
    case actionOilChangeServicesType.GENERAL_TOTAL_PROPERTY:
      return {
        ...state,
        totalBruto: action.totalBruto,
        totalNeto: action.totalNeto,
        totalNetoClone: action.totalNeto,
        totalItebis: action.totalItebis,
        totalDesc: action.totalDesc,
      }
    case actionOilChangeServicesType.ADD_CUSTOMER_SERVER_CUSTOMER:
        return {
          ...state,
          customer: {
            ...state.customer,
            [action.property]: action.value,
            }
          }
    case actionOilChangeServicesType.ADD_CUSTOMER_SERVER_VEHICLE:
          return {
                ...state,
                vehicle: {
                  ...state.vehicle,
                   [action.property]: action.value,
                  }
              }
     case actionOilChangeServicesType.ADD_GENERAL_PROPERTY:
          return {
                  ...state,
                   [action.property]: action.value,
                  }
    case actionOilChangeServicesType.STAGE_CUSTOMER_CHANGE_OIL:
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
