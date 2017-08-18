import * as productActionType from '../actions/productsAction';
import { posts } from './generalReducer';


const ProductsTree = {
    isFetching: '',
    didSaved: '',
    product:{
      name_: '',
      model: '',
      typeProduct: '',
      api: '',
      price: '',
      createdAt: null,
    },
    productList:[],
    productListClone:[],
    isShowProductForm: false,
    isDisabledModal: false,
    productErrors: [],
    isNoMatch: false,
}

const products = (state=ProductsTree, action) => {
  switch(action.type) {
    case productActionType.CLEAN_PRODUCTS_STATE:
      return {
        ...ProductsTree
      }
    case productActionType.STAGE_PRODUCT:
      return {
        ...state,
        product:{
          name_: action.name_,
          model: action.model,
          typeProduct: action.typeProduct,
          api: action.api,
          price: action.price,
          _id: action._id,
          eneable: action.eneable,
          createdAt: action.createAt,
        },
        isShowProductForm: true,
      }
    case productActionType.ADD_PRODUCT_ERRORS:
      return {
        ...state,
        productErrors: [
          ...state.productErrors,
          action.errors,
        ]
      }
    case productActionType.SHOW_PRODUCT_DISABLE_MODAL:
      return {
        ...state,
        isDisabledModal: !state.isDisabledModal,
      }
    case productActionType.SHOW_PRODUCT_FORM:
      return {
        ...state,
        isShowProductForm: !state.isShowProductForm,
      }
    case productActionType.FILTER_PRODUCTS:
      let filterProducts = state.productListClone.filter((item) => {
        if(item.name_.toLocaleLowerCase().includes(action.filter.toLocaleLowerCase())) {
          return item;
        }
        else if(item.productType.toLocaleLowerCase() === action.filter.toLocaleLowerCase()) {
          return item;
        }
      });
      let noMatch = false;
      filterProducts.length === 0 ? noMatch = true : noMatch = false;
      return {
        ...state,
        productList: filterProducts.map(item=>item),
        isNoMatch: noMatch,
      }
    case productActionType.ADD_PRODUCT_ITEM:
      return {
             ...state,
             product:{
               ...state.product,
               [action.property]: action.value,
             }
      }
    case productActionType.FOR_UPDATE_PRODUCT:
      return {
        ...state,
        product: {
          ...state.product,
          createdAt: action.createdAt,
        }
      }
    case productActionType.RESET_PRODUCT:
      return {
        ...state,
        product: {
          name_: '',
          model: '',
          typeProduct: '',
          api: '',
          price: '',
          createdAt: null,
        },
        productErrors:[]
      }
    case productActionType.RECEIVE_POST_PRODUCT:
         return {
           ...state,
           didSaved: action.didSaved,
         }
    case productActionType.RECEIVE_POST_PRODUCTS:
         return {
                 ...state,
                 productList: action.post.map(item => item),
                 productListClone: action.post.map(item => item),
         }
    default: return state;
      }
  }

export default  products;
