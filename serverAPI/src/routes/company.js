import express from 'express';
import companyModel from '../models/companyModel';
import * as handlers from  '../utils/handler';

var router = express.Router();

router.post('/', function(req, res, next) {
  //let company = { ...req.body, _id: 1 };
  let company = {
    _id: 1,
    companyName: "Lubriserv",
    group: 1,
    branch: 1,
    NCF: "A123345543",
    actualNCF: "0",
    inicialNCF: "1",
    finalNCF: "20",
    eneable: true
  }

let companyDb = new companyModel(company);
    companyDb.save()
    .then((response)=>{
      res.status(200).json(response);
    },
     (errors)=>{ handlers.validateError(res, errors); })
});



module.exports = router;
