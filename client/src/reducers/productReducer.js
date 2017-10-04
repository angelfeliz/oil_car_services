import * as productActionType from '../actions/productsAction';
import { posts } from './generalReducer';


const ProductsTree = {
    isFetching: '',
    didSaved: '',
    product:{
      name_: '',
      model: '',
      productType: '',
      materialType: '',
      api: '',
      cost:'',
      itebis:'',
      price: '',
      createdAt: null,
    },
    productList:[],
    productListClone:[],
    isShowProductForm: false,
    isDisabledModal: false,
    productErrors: [],
    isNoMatch: false,
    byMaterial: false,
}

const products = (state=ProductsTree, action) => {
  switch(action.type) {
    case productActionType.ADD_PRICES:
      return {
        ...state,
        product:{
          ...state.product,
          cost: action.cost,
          itebis: action.itebis,
          price: action.total
        }
      }
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
          productType: action.productType,
          api: action.api,
          cost: action.cost,
          itebis: action.itebis,
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
    case productActionType.SEARCH_BY_MATERIAL_OIL:
      let filterProducts = state.productListClone.filter((item) => {
        if(item.materialType.toLowerCase().includes(action.filter.toLowerCase())) {
          return item;
        }
    });

    let noMatch = false;
    filterProducts.length === 0 ? noMatch = true : noMatch = false;
    return {
      ...state,
      productList: filterProducts.map(item=>item),
      byMaterial:true,
      isNoMatch: noMatch,
    }
    case productActionType.NOT_SEARCH_BY_MATERIAL_OIL:
      return {
        ...state,
        byMaterial: false,
      }
    case productActionType.FILTER_PRODUCTS:
    let filterProd;
    if(state.byMaterial) {
       filterProd = state.productList.filter((item) => {
        if(item.name_.toLowerCase().includes(action.filter.toLowerCase())) {
          return item;
        }
        else if(item.productType.toLowerCase().includes(action.filter.toLowerCase())) {
          return item;
        }
        else if (item.model.toLowerCase().includes(action.filter.toLowerCase())) {
          return item;
        }
      });
    }
       filterProd = state.productListClone.filter((item) => {
        if(item.name_.toLowerCase().includes(action.filter.toLowerCase())) {
          return item;
        }
        else if(item.productType.toLowerCase().includes(action.filter.toLowerCase())) {
          return item;
        }
        else if (item.model.toLowerCase().includes(action.filter.toLowerCase())) {
          return item;
        }
      });

      let noMatch_ = false;
      filterProd.length === 0 ? noMatch_ = true : noMatch_ = false;
      return {
        ...state,
        productList: filterProd.map(item=>item),

        isNoMatch: noMatch_,
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
          productType: '',
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
