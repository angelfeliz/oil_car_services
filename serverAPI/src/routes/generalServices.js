import express from 'express';
import generalServicesModel from '../models/generalServicesModel';
import * as handlers from '../utils/handler';
import validateGeneralServices from '../validators/validateCustomerServer';
import NCFCompany from '../models/NCFCompanyModel';

var router = express.Router();

router.use('/save', function(req, res, next){
  if(req.method === 'POST') {
     if(req.body.customer.rnc) {
    let ncfObj = NCFCompany.find({companyId:1, NCFType: req.body.ncfType}, { NCF: 1, inicialNCF: 1, finalNCF: 1});
    ncfObj.exec(function(err, ncf) {
      if((Number.parseInt(ncf.inicialNCF) + 1) > Number.parseInt(ncf.finalNCF)) {
        let err = {
          msg: 'La factura no fue guardada debido aque ya no tiene comprobante restantes'
        }
        console.log("tiene ncf err", err);
         res.json(err);
      }
      else {
        let ncfFull = ncf[0].NCF + ncf[0].inicialNCF;
        req.ncf = ncfFull;
        let newNCF = (Number.parseInt(ncf[0].inicialNCF) + 1);
        NCFCompany.update({companyId:1, NCFType: req.body.ncfType}, {inicialNCF: newNCF}, function(err, done){
            next();
        });
      }
    });
   }
   else{
     console.log("entro sin ncf");
      req.ncf = null;
      next();}
}

});
router.post('/save', function(req, res, next) {
  let generalServices = {
    ...req.body,
    _id: 5,
    ncf: req.ncf
  };
  let generalServicesDb = new generalServicesModel(generalServices);
  generalServicesDb.save().then((response) => {
    return res.json(response);
  },
  (err) => {
      console.log('this is a err', err);
      return res.status(200).json(err);
  })
});

router.get('/generalUnPay', function(req, res, next) {
  var generalUnpay = generalServicesModel.find({statu: req.body.statu});
  generalUnpay.exec((err, sell) => {
    if(err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(sell);
  })
});

router.post('/updateState', function(req, res, next) {
   generalServicesModel.update({_id: req.body.id},{statu:req.body.statu},{upsert: true},function(err,done) {
     if(err) {
       return res.status(200).json();
     }
     return res.status(200).end();
   });
})
module.exports = router;
