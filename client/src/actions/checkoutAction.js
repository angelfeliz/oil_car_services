import api from '../api';

export const TOGGLE_CHECK_FOR_CHECKOUT = 'TOGGLE_CHECK_FOR_CHECKOUT';
export const PROCESS_CHECKOUT = 'PROCESS_CHECKOUT';
export const CONFIRMED_CHECKOUT = 'CONFIRMEDCHECKOUT';
export const ABORT_CHECKOUT_SYSTEM = 'ABORT_CHECKOUT_SYSTEM';
export const STOP_ABORT_CHECKOUT_SYSTEM = 'STOP_ABORT_CHECKOUT_SYSTEM';


export const processCheckout = (checkoutObj) => {
  return {
    type: PROCESS_CHECKOUT,
    _id: checkoutObj._id,
    firstName: checkoutObj.firstName,
    lastName: checkoutObj.lastName,
    services: checkoutObj.services,
    placeNumber: checkoutObj.placeNumber,
    total: checkoutObj.total,
    isModalVisible: true,
    isRidirectToInvoice: false,
    isAbortBySystem: false,
  }
}

export const cancelModalViewCheckout = () => {
  return {
    type: TOGGLE_CHECK_FOR_CHECKOUT,
  }
}

export const abortCheckoutBySystem = () => {
  return {
    type: ABORT_CHECKOUT_SYSTEM,

  }
}

export const stopAbortCheckoutBySystem = () => {
  return {
    type: STOP_ABORT_CHECKOUT_SYSTEM,
  }
}

export const ReceivekConfirmedCheckout = () => {
  return {
    type: CONFIRMED_CHECKOUT,
    isModalVisible: false,
    isRidrectToReceipt: true,
  }
}

export const confirmedCheckout = (checkout) => {
  return (dispatch) => {
    api.put('customerServices/checkout/',checkout)
      .then((responses) => {
        return  responses.data;
      },
    (error) => {
      console.log('error message');
      throw error;
    })
    .then((data) => {
      if(data.isPaid) {
        dispatch(ReceivekConfirmedCheckout);
      }
      else{
        dispatch(abortCheckoutBySystem);
      }
    },
    (error) => {
       dispatch(abortCheckoutBySystem);
       window.setTimeout(dispatch(stopAbortCheckoutBySystem()), 1500);
  })
  }
}
