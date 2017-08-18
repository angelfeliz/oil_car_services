import express from 'express';
import customerServerModel from '../models/customerServerModel';
import * as handlers from '../utils/handler';
import validateCustomerServer from '../validators/validateCustomerServer';

var router = express.Router();

router.post('/', function(req, res, next) {
  let servicesCustomer = {
    ...req.body,
    _id: 4
  };
  let servicesCustomerDb = new customerServerModel(servicesCustomer);
  servicesCustomerDb.save().then((response) => {
    return res.json(response);
  },
  (err) => {
      console.log('this is a err', err);
      return res.status(200).json(err);
  })
});

router.get('/topLastCustomer', function(req, res) {

  let customer = customerServerModel.find({},["customer.firstName", "customer.lastName"])
  .sort({createdAt:-1})
  .limit(10);

  customer.exec(function(err, cust){
    if(err){
      return res.status(500).json(err);
    }
    return res.status(200).json(cust);
  });
});

router.get('/countSellofDay', function(req, res) {
  let date = Date.now();
  customerServerModel.find({createdAt:{$gte:Date.now()}}).count({},function(err, count) {
    if(err){
        return res.status(200).json(err);
      }
       return res.status(200).json(count);
  });
});

router.get('/topSell', function(req, res) {
  customerServerModel.aggregate({
    $unwind: "$products"
  }, {
    $group: {
      _id: {
        product_id: "$products.product_id",
        product_name: "$products.name_"
      },
      count: {
        $sum: 1
      }
    }
  },
  {$sort: {"count": -1 }},
  {$limit: 10},
   function(err, responses) {
      if (err) {
       return res.status(200).json(err);
     }
     return res.status(200).json(responses);
   });
});

router.get('/countOilSellOfDay', function(req, res) {
  let today = Date.now();
  customerServerModel.aggregate(

  { $unwind: "$products" },
  {
    $group: {
      _id: null,
      countAllOil: { $sum: "$products.cuantity"  }
    }
  },
   function(err, responses) {
      if (err) {
       return res.status(200).json(err);
     }
     return res.status(200).json(responses);
   });
});

module.exports = router;
