import api from '../api';
import requestFetch, { responsesFetch } from './action';

export const RECEIVE_POST_PRODUCTS = 'RECEIVE_POST_PRODUCTS';
export const ADD_PRODUCT_ERRORS = 'ADD_PRODUCT_ERRORS';
export const RECEIVE_POST_PRODUCT = 'RECEIVE_POST_PRODUCT';
export const FILTER_PRODUCTS = 'FILTER_PRODUCTS';
export const ADD_PRODUCT_ITEM = 'ADD_PRODUCT_ITEM';
export const RESET_PRODUCT = 'RESET_PRODUCT';
export const SHOW_PRODUCT_FORM = 'SHOW_PRODUCT_FORM';
export const STAGE_PRODUCT = 'STAGE_PRODUCT';
export const DISABLED_PRODUCT = 'DISABLED_PRODUCT';
export const SHOW_PRODUCT_DISABLE_MODAL = 'SHOW_PRODUCT_DISABLE_MODAL';
export const FOR_UPDATE_PRODUCT = 'FOR_UPDATE_PRODUCT';
export const CLEAN_PRODUCTS_STATE = 'CLEAN_PRODUCTS_STATE';

export const cleanProductsState = () => {
  return {
    type: CLEAN_PRODUCTS_STATE,

  }
}
export const didSavedProduct = (didSaved) => {
  return {
     type: RECEIVE_POST_PRODUCT,
     didSaved: didSaved,
   }
}
export const filteringProduct = (filter) => {
  return {
    type: FILTER_PRODUCTS,
    filter,
  }
}
export const stageProduct = (product) => {
  return {
    type: STAGE_PRODUCT,
    typeProduct: product.typeProduct,
    name_: product.name_,
    model: product.model,
    api: product.api,
    price: product.price,
    _id: product._id,
    enable: product.enable,
    createdAt: product.createAt,
  }
}
export const setForUpdateProduct = (createdAt) => {
  return {
    type: FOR_UPDATE_PRODUCT,
    createdAt: createdAt,
  }
}
export const showProductDisabledModal = () => {
  return {
     type: SHOW_PRODUCT_DISABLE_MODAL,
   }
 }
export const showProductForm = () => {
  return {
     type: SHOW_PRODUCT_FORM,
   }
 }
export const receiveAllProducts = (data) => {
  return {
    type: RECEIVE_POST_PRODUCTS,
    post: data.map(item => item)
  }
}
export const addProductItem = (product) => {
  return {
    type: ADD_PRODUCT_ITEM,
    property: product.property,
    value: product.value
  }
}
export const resetStageProduct = () => {
  return {
    type: RESET_PRODUCT,
  }
}
export const addProductErrors = (errors) => {
  return {
    type: ADD_PRODUCT_ERRORS,
    errors: errors.map(item => item)
  }
}
export const GetAllProducts = () => {
  return (dispatch) => {
    return api.get('/product')
      .then(
        (response) => {
           return response.data
         },
        (error) => {
          console.log('An error ocurred. 1er', error);
        }
      )
      .then(
        (data) => {
           dispatch(receiveAllProducts(data));
        },
        (error) => {
          console.log('An error ocurred. 2do', error);
        }
      );
  }
};
export const saveProduct = (state) => {
  return (dispatch) => {
    dispatch(didSavedProduct(false));

    return api.post(`/product/`,state)
       .then(
         (response) => {
           if(response.data.error) {
             console.log('tiene error');
             throw response.data;
           }
           return response;
         },
         (error) => {
           console.log(error);
           console.log('An error ocurred saving product.', error);
           throw error;
         }
       )
       .then(
         (response) => {
           dispatch(GetAllProducts(null));
         },
         (error) => {
           console.log(error);
           console.log('Throw error on 2ed then');
           throw error;
         }
       )
       .then(
         () => dispatch(resetStageProduct()),
         (error) => {
           console.log(error);
           throw error;
         }
       )
       .then(
         () => dispatch(showProductForm()),
         (error) => {
           console.log(error);
           throw error;
         }
       )
       .then( () => {
         dispatch(didSavedProduct(true));
         window.setTimeout(()=>{dispatch(didSavedProduct(false))},1000);
       },
       (error) => {
         console.log(error);
         throw error;
       }
     )
  }
}
export const updateProduct = (state) => {
  return (dispatch) => {
    dispatch(didSavedProduct(false));
    return api.put(`/product/update`,state)
       .then(
         (response) => {
           if(response.data.error) {
             console.log('tiene error');
             throw response.data;
           }
           return response;
         },
         (error) => {
           console.log(error);
           console.log('An error ocurred saving product.', error);
           throw error;
         }
       )
       .then(
         (response) => {
           dispatch(GetAllProducts(null));
         },
         (error) => {
           console.log(error);
           console.log('Throw error on 2ed then');
           throw error;
         }
       )
       .then(
         () => dispatch(resetStageProduct()),
         (error) => {
           console.log(error);
           throw error;
         }
       )
       .then(
         () => dispatch(showProductForm()),
         (error) => {
           console.log(error);
           throw error;
         }
       )
       .then( () => {
         dispatch(didSavedProduct(true));
         window.setTimeout(()=>{dispatch(didSavedProduct(false))},1000);
       },
       (error) => {
         console.log(error);
         throw error;
       }
     )
  }
}
export const disabledProduct = (product) => {
  return (dispatch) => {
    return api.put('/product/disabled',product)
      .then(
        (response) => {
           return response.data
         },
        (error,response) => {
          console.log(response);
          console.log('An error ocurred.', error)
        }
      )
      .then(
        (data) => {
           dispatch(GetAllProducts());
        }
      );
  }
}

export default requestFetch
