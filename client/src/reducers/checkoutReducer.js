import * as checkoutActionType from '../actions/checkoutAction';

let stateDefault = {
  _id: '',
  sell: [/*{
    services_id: '',
    paymentType: '',
    firstName: '',
    lastName: '',
    services: '',
    products:[],
    placeNumber: '',
    total: ''}*/
  ],
  isModalVisible: true,
  isRidirectToInvoice: false,
  isAbortBySystem: false,
}

export const checkoutMaching = (state = stateDefault, action) => {
  switch (action.type) {
   case checkoutActionType.SET_SELL:
   console.log('action ',action);
     return {
       ...state,
       sell:[
         ...state.sell,
         ...action.sell.map((item) => {
             return {
               services_id: item._id,
               paymentType: '',
               services: action.sellType,
               firstName: item.customer.firstName,
               lastName: item.customer.lastName,
               totalNeto: item.totalNeto,
               podructs: [
                 ...item.products.map(pro => pro)
               ]
             }
         })
       ]
     }
   case checkoutActionType.PROCESS_CHECKOUT:
      return {
        ...state,
        _id: action._id,
        firstName: action.firstName,
        lastName: action.lastName,
        services: action.services,
        placeNumber: action.placeNumber,
        total: action.total,
        isModalVisible: true,
        isRidirectToInvoice: false,
        isAbortBySystem: false,
      }
   case checkoutActionType.TOGGLE_CHECK_FOR_CHECKOUT:
      return {
        ...state,
        isModalVisible: !state.isModalVisible,
      }
   case checkoutActionType.ABORT_CHECKOUT_SYSTEM:
     return {
       ...state,
       isAbortBySystem: true,
       isModalVisible: false,
     }
    case checkoutActionType.STOP_ABORT_CHECKOUT_SYSTEM:
       return {
         ...state,
         isAbortBySystem: false,
         isModalVisible: false,
       }
   case checkoutActionType.CONFIRMED_CHECKOUT:
     return {
       isModalVisible: true,
       isRidirectToInvoice: false,
     }
   default:
      return state;
  }
}
