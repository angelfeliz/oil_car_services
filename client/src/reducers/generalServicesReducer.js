import * as  generalServicesActionType from '../actions/generalServicesAction';

let initialState = {
  totalBruto,
  totalNeto,
  totalItebis,
  totalDesc,
  products:[],
  customer:{},
  item_select_price: '',
  item_select_id: '',
  item_select_quantity: '',
  item_select_name: 'seleccione producto',
  item_type_select: '',
  isRedirect: false,
}
export const generalServices = (state = initialState, action) => {
  switch(action.type) {
    case generalServicesActionType.TOGGLE_IS_REDIRECT:
      return {
        ...state,
        isRedirect: !state.isRedirect
      }
    case generalServicesActionType.SET_ITEM_QUANTITY:
      return {
        ...state,
          item_select_quantity: action.quantity
      }
    case generalServicesActionType.SET_SELECT_ITEM:
      return {
        ...state,
        item_select_price: action.item_select_price,
        item_select_id: action.item_select_id,
        item_select_name: action.item_select_name,
      }
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
          totalProduct: action.product.totalProduct,
        ],
        item_select_price: '',
        item_select_id: '',
        item_select_quantity: '',
        item_select_name: 'seleccione producto',
        item_type_select: '',
      }
    case generalServicesActionType.ADD_CUSTOMER_PROPERTY:
      return {
        ...state,
        customer:{
          ...state.customer,
          [action.customer.property]: action.customer.value
        }
      }
    case generalServicesActionType.SET_TOTALS:
      return {
        ...state,
        totalBruto: action.totalBruto,
        totalNeto: action.totalNeto,
        totalItebis: action.totalItebis,
        totalDesc: action.totalDesc,
      }
    default: return state;
  }
}
