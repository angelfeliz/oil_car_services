import express from 'express';
import generalServicesModel from '../models/generalServicesModel';
import * as handlers from '../utils/handler';
import validateGeneralServices from '../validators/validateCustomerServer';

var router = express.Router();

router.post('/save', function(req, res, next) {
  let generalServices = {
    ...req.body,
    _id: 5
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
  var generalUnpay = generalServicesModel.find({statu: "pending"});
  generalUnpay.exec((err, sell) => {
    if(err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(sell);
  })
});
module.exports = router;
