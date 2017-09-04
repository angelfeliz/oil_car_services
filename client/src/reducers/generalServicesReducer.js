import * as  generalServicesActionType from '../actions/generalServicesAction';

let initialState = {
  paymentType:'cash',
  totalBruto:'',
  totalNeto:'',
  totalItebis:'',
  totalDesc:'',
  products:[],
  customer:{
    customer_id:'',
  },
  item_select_price: '',
  item_select_id: '',
  item_select_quantity: '',
  item_select_name: 'seleccione producto',
  item_type_select: '',
  isRedirect: false,
  generalServerErrors:[]
}
export const generalServices = (state = initialState, action) => {
  switch(action.type) {
    case generalServicesActionType.ADD_GENERAL_SERVICES_ERRORS:
      return {
        ...state,
        generalServerErrors: [
          ...state.generalServerErrors,
          action.errors_.map(item => item)
        ]

      }
    case generalServicesActionType.ADD_GENERALS_ITEM:
      return {
        ...state,
        [action.property]: action.value
      }
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
        item_type_select: action.item_type_select
      }
    case generalServicesActionType.ADD_ITEM:
      return {
        ...state,
        products: [
          ...state.products,
          {
            product_id: action.product_id,
            name_: action.name_,
            price: action.price,
            itebis: action.itebis,
            quantity: action.quantity,
            productType: action.productType,
            totalProduct: action.totalProduct
          }
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
