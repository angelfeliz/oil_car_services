import * as  generalServicesActionType from '../actions/generalServicesAction';

export const generalServices = (state = {}, action) => {
  switch(action.type) {
    case generalServicesActionType.ADD_PRODUCT:
      return {
        ...state,
        products: [
          ...state.products,
          product_id: action.product._id,
          name_: action.product.name_,
          price: action.product.price,
          itebis: action.product.itebis,
          quantity: action.product.quantity,
          productType: action.product.productType,
        ]
      }
    case generalServicesActionType.ADD_CUSTOMER_PROPERTY:
      return {
        ...state,
        customer:{
          ...state.customer,
          [action.customer.property]: action.customer.value
        }
      }
    default: return state;
  }
}
