import api from '../api';

export const ADD_ITEM = 'ADD_PRODUCT';
export const ADD_CUSTOMER_PROPERTY = 'ADD_CUSTOMER_PROPERTY';
export const SET_TOTALS = 'SET_TOTALS';
export const SET_SELECT_ITEM = 'SET_SELECT_ITEM';
export const SET_ITEM_QUANTITY = 'SET_ITEM_QUANTITY';
export const TOGGLE_IS_REDIRECT = 'TOGGLE_IS_REDIRECT';
export const ADD_PRODUCT_TO_GENERAL_SERVICES = 'ADD_PRODUCT_TO_GENERAL_SERVICES';
export const ADD_GENERALS_ITEM = 'ADD_GENERALS_ITEM';
export const ADD_ERRORS = 'ADD_ERRORS';

export const addErrors = (errors) => ({
  type:ADD_ERRORS,
  errors: errors.map(item => item)
})

export const addGeneralProperty = (general) => ({
  type: ADD_GENERALS_ITEM,
  property: general.property,
  value: general.value
})
export const addProduct = (product) => ({
  type: ADD_ITEM,
  product_id: product.product_id,
  name_: product.name_,
  price: product.price,
  quantity: product.quantity,
  itebis: product.itebis,
  productType: product.productType,
  totalProduct: product.totalProduct
})

export const toggleRedirect = () => ({
  type:TOGGLE_IS_REDIRECT,
})

export const addCustomerProperty = (customer) => ({
  type: ADD_CUSTOMER_PROPERTY,
  customer
});

export const setTotalGeneralProperty = ({ totalBruto, totalNeto, totalItebis, totalDesc }) => ({
  type: SET_TOTALS,
  totalBruto,
  totalNeto,
  totalItebis,
  totalDesc,
})

export const selectItem = (item) => ({
  type:  SET_SELECT_ITEM,
  item_select_price: item.item_select_price,
  item_select_id: item.item_select_id,
  item_select_name: item.item_select_name,
  item_type_select: item.item_type_select
})

export const setItemQuantity = (quantity) => ({
  type: SET_ITEM_QUANTITY,
  quantity
})

export const saveGeneralServices = (state) => {
  return (dispatch) => {
    if(state.customer.customer_id) {
      api.post("/customer", state)
        .then(
           (responses) => { return responses.data },
           (error) => {
             //TODO handle errors
             console.log(error);
             throw error;
           }
        )
       .then((data) => {
         let general = {...state, customer:{...state.customer, customer_id : data._id}};
         api.post('generalServices/save',general).then(
           (responses) => {
             dispatch(toggleRedirect());
           },
           (error) => {
             //TODO handle errors
             console.log(error);
             throw error;
           }
         )
       },
       //TODO handle errors
       (error) => {

       })
    }
    else
    {
      api.post('generalServices/save',state)
      .then((responses) => {
        dispatch(toggleRedirect());
      },
       (error) => {
         console.log(error);
         throw error;
       }
     )
  }}}
