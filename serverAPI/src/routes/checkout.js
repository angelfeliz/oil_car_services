import express from 'express';
import checkoutModel from '../models/checkoutModel';
import customerServerModel from '../models/customerServerModel';
import generalServerModel from '../models/checkoutModel';
import * as handlers from  '../utils/handler';

var router = express.Router();

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
