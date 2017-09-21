import express from 'express';
import checkoutModel from '../models/checkoutModel';
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

module.exports = router;
