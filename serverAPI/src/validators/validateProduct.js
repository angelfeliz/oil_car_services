import { validateAsync } from '../utils/functions';

 const validateProduct = validateAsync({
   _id:{
     presence:false
   },
  name_: {
    presence: true,
  },
  productType: {
    presence: true,
    length: {
      minimum: 1,
      message: 'debe de escribir algo en typo de producto'
    }
  },
  materialType: {
    presence: false,
  },
  model: {
    presence: false,
    length: {
      minimum: 1,
      message: 'debe de escribir algo en model'
    }
  },
  api: {
    presence: false,
  },
  cost: {
    presence: true,
  },
  itebis: {
    presence: true,
  },
  price: {
    presence: true,
  },
  eneable: {
    presence: false
  }
});
export default validateProduct;
