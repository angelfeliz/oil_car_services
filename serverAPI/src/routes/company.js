import express from 'express';
import companyModel from '../models/companyModel';
import NCFCompanyModel from '../models/NCFCompanyModel';
import * as handlers from  '../utils/handler';

var router = express.Router();

router.post('/', function(req, res, next) {
  //let company = { ...req.body, _id: 1 };
  console.log('No puede entrar');
  let company = {
    _id: 1,
    companyName: "Lubriserv",
    group: 1,
    branch: 1,
    eneable: true
  }

    let companyDb = new companyModel(company);
      companyDb.save()
      .then((response)=>{
       res.status(200).json(response);
     },
      (errors)=>{ handlers.validateError(res, errors); })
});

router.post('/ncfset', function(req, res, next) {
  //let company = { ...req.body, _id: 1 };
  console.log('entro a');
  let ncf_emp = {
    _id: 6,
    companyId: 1,
    NCFType: 1,
    Description: "Empresarial",
    NCF: "A123",
    actualNCF: 0,
    inicialNCF: 1,
    finalNCF: 20,
    eneable: true
  }

  let ncf_gov = {
    _id: 6,
    companyId: 1,
    NCFType: 2,
    Description: "Gubernamental",
    NCF: "A456",
    actualNCF: 0,
    inicialNCF: 1,
    finalNCF: 5,
    eneable: true
  }

  let ncf_consumidor = {
    _id: 6,
    companyId: 1,
    NCFType: 3,
    Description: "Consumidor final",
    NCF: "A997",
    actualNCF: 0,
    inicialNCF: 1,
    finalNCF: 5,
    eneable: true
  }

let ncfDb = new NCFCompanyModel(ncf_emp);
    ncfDb.save()
    .then((response)=>{
      res.status(200).json(response);
    },
     (errors)=>{ handlers.validateError(res, errors); });

let ncfDbGov = new NCFCompanyModel(ncf_gov);
         ncfDbGov.save()
         .then((response)=>{
           res.status(200).json(response);
         },
          (errors)=>{ handlers.validateError(res, errors); });

let ncfDbConsumidor = new NCFCompanyModel(ncf_consumidor);
                   ncfDbConsumidor.save()
                   .then((response)=>{
                     res.status(200).json(response);
                   },
                    (errors)=>{ handlers.validateError(res, errors); });

});


module.exports = router;
