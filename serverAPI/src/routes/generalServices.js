import express from 'express';
import generalServicesModel from '../models/generalServicesModel';
import * as handlers from '../utils/handler';
import validateGeneralServices from '../validators/validateCustomerServer';
import company from '../models/companyModel';

var router = express.Router();

router.use('/save', function(req, res, next){
  if(req.method === 'POST' && req.customer.rnc) {
    let oilChange = {...req.body};
    let ncfObj = company.find({}, { inicialNCF: 1, finalNCF: 1});
    ncfObj.exec(function(err, ncf) {
      if((Number.parseInt(ncf.inicialNCF) + 1) > Number.parseInt(ncf.finalNCF)) {
        let err = {
          msg: 'La factura no fue guardada debido aque ya no tiene comprobante restantes'
        }
         res.json(err);
      }
      else {
        req.ncf = ncf[0].inicialNFC;
        let newNCF = (Number.parseInt(ncf[0].inicialNCF) + 1);
        company.update({branch: 1}, {inicialNCF: newNCF}).exec();
      }
    });
}
  next();
});
router.post('/save', function(req, res, next) {
  let generalServices = {
    ...req.body,
    _id: 5
  };
console.log(req.ncf);
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
  var generalUnpay = generalServicesModel.find({statu: "pending"});
  generalUnpay.exec((err, sell) => {
    if(err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(sell);
  })
});
module.exports = router;
