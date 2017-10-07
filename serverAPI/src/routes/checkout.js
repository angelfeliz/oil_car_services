import express from 'express';
import checkoutModel from '../models/checkoutModel';
import customerServerModel from '../models/customerServerModel';
import generalServerModel from '../models/checkoutModel';
import NCFCompany from '../models/NCFCompanyModel';
import * as handlers from  '../utils/handler';

var router = express.Router();

router.use('/save', function(req, res, next){
  console.log('entro al middleware');
  if(req.method === 'POST') {
    if(req.body.customer.rnc == '' && req.body.consumidorFinal) {
    let ncfObj = NCFCompany.find({companyId: 1, NCFType: req.body.ncfType}, { NCF: 1, inicialNCF: 1, finalNCF: 1});
    ncfObj.exec(function(err, ncf) {
      if((Number.parseInt(ncf.inicialNCF) + 1) > Number.parseInt(ncf.finalNCF)) {
        let err = {
          msg: 'La factura no fue guardada como consumidor final debido aque ya no tiene mas comprobantes'
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
  let checkout = { ...req.body, _id: 6};
    let checkoutDb = new checkoutModel(checkout);
      checkoutDb.save()
      .then((response)=>{
         res.status(200).json(response);
     },
      (err)=>{
        console.log(err)
         handlers.validateError(res, err); })
});

router.post('/deleteServices', function(req, res, next) {
   let services = {...req.body}
    checkoutModel.update({services_id:services.services_id}, {statu:"delete"},{upsert: true}, function(err, done) {
      if(err) {
        res.status(200).json(err);
      }
      if(services.services === "cambio aceite") {
          customerServerModel.update({_id:services.services_id}, {statu:"delete"},{upsert: true}, function(err, done) {
            if(err) {
              res.status(200).json(err);
            }
            res.status(200).end();
          });
      }
      else if (services.services === "general") {
          generalServerModel.update({_id:services.services_id}, {statu:"delete"},{upsert: true}, function(err, done) {
            if(err) {
              res.status(200).json(err);
            }
            res.status(200).end();
         });
      }
    })

});

module.exports = router;
