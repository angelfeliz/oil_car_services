export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_CUSTOMER_PROPERTY = 'ADD_CUSTOMER_PROPERTY';

export const addProduct = (item) => ({
  type: ADD_PRODUCT,
  item,
});

export const addCustomerProperty = (customer) => ({
  type: ADD_CUSTOMER_PROPERTY,
  customer
});
