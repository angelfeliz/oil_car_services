import express from 'express';
import customerServerModel from '../models/customerServerModel';
import * as handlers from '../utils/handler';
import validateCustomerServer from '../validators/validateCustomerServer';
import NCFCompany from '../models/NCFCompanyModel';

var router = express.Router();

router.use('/save', function(req, res, next){
   console.log('no debe entrar ',req.method);
  if(req.method === 'POST') {
    if(req.body.customer.rnc) {
    let ncfObj = NCFCompany.find({companyId: 1, NCFType: req.body.ncfType}, { NCF: 1, inicialNCF: 1, finalNCF: 1});
    ncfObj.exec(function(err, ncf) {
      if((Number.parseInt(ncf.inicialNCF) + 1) > Number.parseInt(ncf.finalNCF)) {
        let err = {
          msg: 'La factura no fue guardada debido aque ya no tiene comprobante restantes'
        }
         res.json(err);
      }
      else {        
        req.ncf = ncf[0].NCF + ncf[0].inicialNCF;
        let newNCF = (Number.parseInt(ncf[0].inicialNCF) + 1);
        NCFCompany.update({companyId: 1, NCFType: req.body.ncfType}, {inicialNCF: newNCF}, function(err, done) {
          next();
        })
      }
    });
}
  else{
    req.ncf = null;
    next();
  }
}


});

router.post('/save', function(req, res, next) {
  let servicesCustomer = {
    ...req.body,
    _id: 3,
    ncf: req.ncf
  };

  console.log('llego ', servicesCustomer );
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
  customerServerModel
  .aggregate(
  { $unwind: "$products" },
  {
    $group: {
      _id: null,
      countAllOil: { $sum: "$products.quantity"  }
    }
  },
   function(err, responses) {
      if (err) {
       return res.status(200).json(err);
     }
     return res.status(200).json(responses);
   });
});

router.get('/oilChangeUnPay', function(req, res) {
    var pending = customerServerModel.find({statu:"pending"});
    pending.exec(function(err, sell){
      console.log(sell);
        if(err) {
          return res.status(500).json(err);
        }
        return res.status(200).json(sell);
    });
})

module.exports = router;
