import express from 'express';
import customerModel from '../models/customerModel';
import * as handlers from  '../utils/handler';
import validateCustomer from '../validators/validateCustomer';
//import validateCustomerServer from '../validators/validateCustomerServer';

var router = express.Router();

router.post('/', function(req, res, next) {
  let customer = { ...req.body, _id: 1 };
  
  validateCustomer(customer)
  .then(customer => {
    new customerModel(customer)
    .save()
    .then((response)=>{
      res.status(200).json(response);
    },
  (errors)=>{ handlers.validateError(res, errors); })
  },
  (errors) => { handlers.validateError(res, errors); })
});

router.get('/customerList', function(req, res){
  customerModel.find({},function(err, data){
    if(err) {
      res.status(500).send('Hubo un error buscando la lista de customer');
    }
    res.status(200).json(data);
  })
});

router.get('/:id', function(req, res) {
  customerModel.find({_id:req.params.id},function(err, data){
    if(err) {
      return handlers.validateError(res, err);
      console.log('Hubo un error buscando the customer');
    }
    return res.status(200).json(data);
  })
})

module.exports = router;
