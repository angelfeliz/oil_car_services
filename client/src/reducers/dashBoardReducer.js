import { REQUEST_GET, RECEIVE_POST } from '../actions/action';
import * as dashBoardActionType from '../actions/dashBoardAction';

const stateDefault = {
  oilChangeSellDayCount: 0,
  oilCount: 0,
  customerAsisted: 0,
  topOilSellArray: [],

  daySellCount: '',
  countOilSellDay:'',
  topAttendedCustomerArray:[],

}

export const dashBoard = (state=stateDefault, action) => {
   switch(action.type) {
     case dashBoardActionType.TOP_SELL_OIL_CHANGE_DAY:
       return {
         ...state,
         oilChangeSellDayCount: action.oilChangeSellDayCount,
         oilCount: action.oilCount,
         customerAsisted: action.customerAsisted.map(item => item),
         topOilSellArray: action.oilSell.map(item => item),
       }
    case dashBoardActionType.TOP_TEN_OIL_SELL_DAY:
      return {
        ...state,
        topOilSellArray: action.topOilSellArray.map(item => item)
      }
      case dashBoardActionType.SELL_DAY_COUNT:
        return {
        ...state,
        daySellCount: action.daySellCount
      }
      case dashBoardActionType.TOP_ATTENDED_CUSTOMER:
      return {
        ...state,
        topAttendedCustomerArray: action.topAttendedCustomerArray.map(item => item)
      }
      case dashBoardActionType.COUNT_OIL_SELL_DAY:
        return {
          ...state,
          countOilSellDay: action.countOilSellDay
        }
       default:
         return state;
   }
}
