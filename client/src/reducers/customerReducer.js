import  * as customerActionType from '../actions/customerAction';

const stateDefault = {
  customer: {
    _id:'',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    rnc: '',
    createdAt: null,
  },
  isFilterVehicle: false,
  customerList:[],
  customerListClone:[],
  isShowCustomerForm: false,
  errors:[],
  didSaved: false,
  noMachFilter: false,
};


export const customers = (state=stateDefault, action) => {
  switch(action.type) {
    case customerActionType.CLEAN_CUSTOMERS_STATE:
      return {
        ...stateDefault
      }
    case customerActionType.CUTOMER_SAVED:
      return {
        ...state,
        didSaved: action.didSaved,
      }
    case customerActionType.STAGE_CUSTOMER:
      return {
       ...state,
       customer:{
         _id: action._id,
         firstName: action.firstName,
         lastName: action.lastName,
         phoneNumber: action.phoneNumber,
         email: action.email,
         rnc: action.rnc,
         createdAt: action.createdAt,
       },
       isShowCustomerForm: true,
      }
    case customerActionType.RESET_STAGE_CUSTOMER:
      return {
          ...state,
          customer: {
            _id: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            rnc: '',
            createdAt: '',
          }
      }
    case customerActionType.TOGGLE_CUSTOMER_FORM:
      return {
        ...state,
        isShowCustomerForm: !state.isShowCustomerForm,
      }
    case customerActionType.FILTER_CUSTOMER:
           let filterCustomer = state.customerListClone.filter((item) => {
             let fullName = item.firstName +' '+item.lastName;
             if(fullName.toLocaleLowerCase().includes(action.filter.toLocaleLowerCase())) {
               return item;
             }
             else if(item.phoneNumber === action.filter){
               return item;
             }
           });
           let machFilter = false;
           filterCustomer.length == 0 ? machFilter = true: machFilter = false;

           return {
              ...state,
              isFilterVehicle: false,
              customerList: filterCustomer.map(item => item),
              noMachFilter: machFilter,
           }
    case customerActionType.FILTER_CUSTOMER_BY_ID:
          let filterCustomerById = state.customerListClone.filter((item) => {
              if(item._id == action.filter) {
                return item;
              }
            });
            return {
             ...state,
             isFilterVehicle: true,
             customerList: filterCustomerById.map(item => item),
           }
    case customerActionType.FOR_UPDATE_CUSTOMER:
           return {
             ...state,
             customer: {
             ...state.customer,
             createdAt: action.createdAt,
               }
             }
    case customerActionType.RECEIVED_CUSTOMERS:
         return {
           ...state,
           customerList: action.customers.map(item => item),
           customerListClone: action.customers.map(item => item),
         }
    case customerActionType.ADD_CUSTOMER_ERRORS:
      return {
        ...state,
        errors: [
          ...state.errors,
          action.errors,
        ]
      }
    case customerActionType.ADD_CUSTOMER_ITEM:
      return {
             ...state,
             customer:{
               ...state.customer,
               [action.property]: action.value,
             }
           }
    default:
     return state;
  }
}
