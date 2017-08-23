export const ADD_ITEM = 'ADD_PRODUCT';
export const ADD_CUSTOMER_ITEM = 'ADD_CUSTOMER_PROPERTY';
export const SET_TOTALS = 'SET_TOTALS';
export const SET_SELECT_ITEM = 'SET_SELECT_PRODUCT',
export const SET_ITEM_QUANTITY = 'SET_ITEM_QUANTITY';

export const addProduct = (item) => ({
  type: ADD_PRODUCT,
  item,
});

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
  item,
})

export const setItemQuantity = (quantity) => ({
  type: SET_ITEM_QUANTITY,
  quantity
})
