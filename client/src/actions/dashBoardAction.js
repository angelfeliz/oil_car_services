import api from '../api';
import generalRequestFetch, { requestFetch, responsesFetch }  from './action';

export const TOP_SELL_OIL_CHANGE_DAY = "TOP_SELL_OIL_CHANGE_DAY";
export const TOP_TEN_OIL_SELL_DAY = "TOP_TEN_OIL_SELL_DAY";
export const SELL_DAY_COUNT = "SELL_DAY_COUNT";
export const TOP_ATTENDED_CUSTOMER = "TOP_ATTENDED_CUSTOMER";
export const COUNT_OIL_SELL_DAY = "COUNT_OIL_SELL_DAY";

export const receiveTopOilChangeInfoSellDay = (sellsDayInfo) => {
  return {
    type: TOP_SELL_OIL_CHANGE_DAY,
    oilChangeSellDayCount: sellsDayInfo.countSellDay,
    oilCount: sellsDayInfo.oilCount,
    customerAsisted: sellsDayInfo.customerAsisted.map(item => item),
    topOilSellArray: sellsDayInfo.topOilSellArray,
  }
}

export const receiveSellDayCount = (sellCount) => {
  return {
    type: SELL_DAY_COUNT,
    daySellCount: sellCount,
  }
}

export const receiveTopTenOilSellDay = (topOils) => {
  return {
    type: TOP_TEN_OIL_SELL_DAY,
    topOilSellArray: topOils.map(item => item),
  }
}

export const receiveTopAttendedCustomer = (topAttendeCustomer) => {
  return {
    type: TOP_ATTENDED_CUSTOMER,
    topAttendedCustomerArray: topAttendeCustomer.map(item => item),
  }
}

export const receiveCountOilSellDay = (countOil) => {
  return {
    type:COUNT_OIL_SELL_DAY,
    countOilSellDay: countOil[0].countAllOil,
  }
}

export const getSellOfDayCount = () => {
  return (dispatch) => {
    api.get("/customerServices/countSellofDay")
    .then((responses) => {
      return responses.data;
    },
     (errors) => { console.log(errors); },
    )
    .then((data) => {
      dispatch(receiveSellDayCount(data));
    },
  (err) => { console.log(err); })
  }
}

export const getTopTenOilSellInfoDay = () => {
  return (dispatch) => {
    api.get("/customerServices/topSell")
    .then((responses) => {
      return responses.data;
    },
     (errors) => { console.log(errors); },
    )
    .then((data) => {
      if(data) {
        dispatch(receiveTopTenOilSellDay(data));
      }
      else {
        dispatch(receiveTopTenOilSellDay([]));
      }
    },
  (err) => { console.log(err); })
  }
}

export const getTopAttendedCustomer = () => {
  return (dispatch) => {
    api.get("/customerServices/topLastCustomer")
    .then((responses) => {
      return responses.data;
    },
     (errors) => { console.log(errors); },
    )
    .then((data) => {
      dispatch(receiveTopAttendedCustomer(data));
    },
  (err) => { console.log(err); })
  }
}

export const getCountOilSellDay = () => {
  return (dispatch) => {
    api.get("/customerServices/countOilSellOfDay")
    .then((responses) => {
      return responses.data;
    },
     (errors) => { console.log(errors); },
    )
    .then((data) => {
      if(data.length > 0){

        dispatch(receiveCountOilSellDay(data));
      }
      else{
        dispatch(receiveCountOilSellDay([{countAllOil: 0}]));
      }

    },
  (err) => { console.log(err); })
  }
}
