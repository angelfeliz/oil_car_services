import api from '../api';

export const TOGGLE_CHECK_FOR_CHECKOUT = 'TOGGLE_CHECK_FOR_CHECKOUT';
export const PROCESS_CHECKOUT = 'PROCESS_CHECKOUT';
export const CONFIRMED_CHECKOUT = 'CONFIRMEDCHECKOUT';
export const ABORT_CHECKOUT_SYSTEM = 'ABORT_CHECKOUT_SYSTEM';
export const STOP_ABORT_CHECKOUT_SYSTEM = 'STOP_ABORT_CHECKOUT_SYSTEM';
export const PAYMENT_TYPE = 'PAYMENT_TYPE';
export const SET_SELL = 'SET_SELL';
export const FIND_SELL_CHECKOUT = 'FIND_SELL_CHECKOUT';
export const DESC_CHEKOUT = 'DESC_CHEKOUT';
export const PRINT_CHECKOUT = 'PRINT_CHECKOUT';


export const printCheckout = () => ({
  type: PRINT_CHECKOUT,
  isPrinting: true,
})
export const doDesc = (desc) => ({
  type: DESC_CHEKOUT,
  desc
})
export const findSell = (word) => ({
  type: FIND_SELL_CHECKOUT,
  word
})
export const paymentTypeChange = (paymentType) => ({
  type: PAYMENT_TYPE,
  paymentType
})
export const processCheckout = (checkoutObj) => {
  return {
    type: PROCESS_CHECKOUT,
    checkoutObj,
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
export const ReceiveConfirmedCheckout = () => {
  return {
    type: CONFIRMED_CHECKOUT,
    isModalVisible: false,
    isRidrectToReceipt: true,
  }
}
export const setSell = (sell, sellType) => ({
  type: SET_SELL,
  sellType,
  sell: sell.map(item => item),
})
export const confirmedCheckout = (checkout) => {
  return (dispatch) => {
     dispatch(printCheckout());
  }
}

export const loadAllSells = () => {
  return (dispatch) => {
    api.get("/customerServices/oilChangeUnPay")
    .then(
      (responses)=>{
          return responses.data;
       },
      (err) => {
        //TODO handler errror
        throw err;
      }
    )
    .then(
      (data) => {
        if(data.length > 0) {
            dispatch(setSell(data, "cambio aceite"));
        }
      },
      (err) => {}
   )
    .then(()=>{
      api.get("/generalServices/generalUnPay")
      .then(
        (responses) => {
          return responses.data;
        },
        (err) => {
          //TODO handler errror
          throw err;
        }
      )
      .then(
        (data) => {
          if(data.length > 0) {
           dispatch(setSell(data, "general"));
          }
        },
      (err) => {

      })
    },
    (err) => {
      //TODO handler error
      throw err;
    }
  )
  }
}

export const saveCheckout = (checkout) => {
  return (dispatch) => {
    api.post('/checkout/save', checkout)
    .then((responses)=>{
      var  check = {
        id: checkout.services_id,
        statu: "complete"
      }
      if(checkout.services == "cambio aceite") {
        api.post('/customerServices/updateState',check)
         .then(
           (responses) => {
              dispatch(cancelModalViewCheckout());
           },
           (err) => {
             console.log('err in checkout ', err);
             throw err;
           }
         )
         .then((responses) => {
           dispatch(loadAllSells());
         },
         (err) => {
           console.log('err in checkout ', err);
           throw err;
         });
      }
      else if(checkout.services == "general") {
        api.post('/generalServices/updateState',check)
         .then(
           (responses) => {
              dispatch(cancelModalViewCheckout());
           },
           (err) => {
             console.log('err in checkout ', err);
             throw err;
           }
         )
         .then((responses) => {
           dispatch(loadAllSells());
         },
         (err) => {
           console.log('err in checkout ', err);
           throw err;
         });
      }

    },
  (err)=>{

  })
  }
}
