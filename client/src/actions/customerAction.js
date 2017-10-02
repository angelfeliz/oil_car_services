import api from '../api';
import generalRequestFetch, { requestFetch, responsesFetch }  from './action';

export const TOGGLE_CUSTOMER_FORM = "TOGGLE_CUSTOMER_FORM";
export const RECEIVED_CUSTOMERS = "RECEIVED_CUSTOMERS_DASHBOARD";
export const FILTER_CUSTOMER = "FILTER_CUSTOMER";
export const FILTER_CUSTOMER_BY_ID = "FILTER_CUSTOMER_BY_ID";
export const RESET_STAGE_CUSTOMER = "RESET_STAGE_CUSTOMER";
export const STAGE_CUSTOMER = "STAGE_CUSTOMER";
export const ADD_CUSTOMER_ERRORS = "ADD_CUSTOMER_ERRORS";
export const ADD_CUSTOMER_ITEM = "ADD_CUSTOMER_ITEM";
export const FOR_UPDATE_CUSTOMER = "FOR_UPDATE_CUSTOMER";
export const CUTOMER_SAVED = "CUTOMER_SAVED";
export const CLEAN_CUSTOMERS_STATE = 'CLEAN_CUSTOMERS_STATE';
export const SEARCH_PLACE_NUMBER_TO_CUSTOMER = "SEARCH_PLACE_NUMBER_TO_CUSTOMER";

export const filterPlaceNumberToCustomer = (customersIdArray) => ({
  type: SEARCH_PLACE_NUMBER_TO_CUSTOMER,
  customersIdArray
})
export const cleanCustomerStateDefault = () => ({
  type: CLEAN_CUSTOMERS_STATE
})
export const didSavedCustomer = (didSaved) => ({
  type: CUTOMER_SAVED,
  didSaved: didSaved,
})
export const filterCustomer = (filter) => {
  return {
    type: FILTER_CUSTOMER,
    filter,
  }
}
export const filterCustomerById = (filter) => {
  return {
    type: FILTER_CUSTOMER_BY_ID,
    filter,
  }
}
export const setForUpdateCustomer = (createdAt) => {
  return {
    type: FOR_UPDATE_CUSTOMER,
    createdAt: createdAt,
  }
}
export const showCustomerForm = () => {
  return {
     type: TOGGLE_CUSTOMER_FORM,
   }
 }
export const resetStageCustomer = () => {
  return {
    type: RESET_STAGE_CUSTOMER,
  }
}
export const stageCustomer = (customer) => {
  return {
    type: STAGE_CUSTOMER,
    _id: customer._id,
    firstName: customer.firstName,
    lastName: customer.lastName,
    phoneNumber: customer.phoneNumber,
    rnc:customer.rnc,
    email: customer.email,
    createdAt: customer.createAt,
  }
}
export const getCutomers = () => {
  return (dispatch) => {
      //dispatch(requestFetch());
      api.get("customer/customerList")
        .then(
          (responses) => { return responses.data; },
          (error) => {
            console.log('error in loadCustomerList', error);
            throw error
          }
        )
        .then(
          (data) => { dispatch(receiveCustomers(data)); },
          (err) => {
            console.log('error in cusotmerlist', err);
            throw err;
        }

        )
  }
}
export const receiveCustomers = (data) => {
  return {
    type: RECEIVED_CUSTOMERS,
    customers: data.map(item => item),
  }
}
export const saveCustomer = (state ) => {
  return (dispatch) => {
    api.post("/customer", state)
      .then(
         (responses) => { return responses.data },
         (error) => {
           console.log(error);
           throw error;
         }
      )
      .then(
      (data) =>  {
        dispatch(getCutomers());
      },
      (error) => {
        console.log('error in customer', error);
        throw error;
      }
    )
    .then(
      () => dispatch(resetStageCustomer()),
      (error) => {
        console.log(error);
        throw error;
      }
    )
    .then(
      () => dispatch(showCustomerForm()),
      (error) => {
        console.log(error);
        throw error;
      }
    )
    .then( () => {
      dispatch(didSavedCustomer(true));
      window.setTimeout(()=>{dispatch(didSavedCustomer(false))},1000);
    },
    (error) => {
      console.log(error);
      throw error;
    }
  )
  }
}
export const updateCustomer = (state) => {
  return (dispatch) => {
      api.get('/customerUpdate', state)
        .then(
          (responses) => { responses.data; },
          (error) => {
            console.log('customerUpadate', error);
            throw error;
         }
        )
        .then(
          (data) => {
            dispatch(getCutomers());
          },
          (error) => {
            console.log('customerUpadate', error);
            throw error;
          }
        )
        .then(
          (state) => { dispatch(resetStageCustomer()); }
        )
  }
}
export const addCustomerErrors = (errors) => {
  return {
    type: ADD_CUSTOMER_ERRORS,
    errors: errors.map(item => item)
  }
}
export const addCustomerItem = (customer) => {
  return {
    type: ADD_CUSTOMER_ITEM,
    property: customer.property,
    value: customer.value
  }
}

export const getCustomerById = (state) => {
  return (dispatch) => {
      api.get('/customer:id', state)
        .then(
          (responses) => { responses.data; },
          (error) => {
            console.log('error getCustomerByID',error);
            throw error;
           }
        )
        .then(
          (data) => {
            console.log('when getting customer by id', data);
            dispatch(stageCustomer(data));
          },
          (error) => {
            console.log('error getCustomerByID',error);
            throw error;
          }
        )
  }
}
