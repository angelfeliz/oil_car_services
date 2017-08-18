import  express from 'express';
import ProductModels from '../models/productsmodel';
import validateProduct from '../validators/validateProduct';
import * as handlers from  '../utils/handler';
var router = express.Router();

router.get('/', function(req, res, next) {
  ProductModels
  .find({ eneable:true })
  .sort({ name_: -1 })
  .exec( function(err, data) {
  if(err) {
    res.status(500).send('Hubo un error buscando la lista de productos');
  }
  res.json(data);
   });
 });

router.post('/', function(req, res, next) {
  let product = { ...req.body, _id: 4 };
  console.log('before save', product);
  validateProduct(product).then(
    (product) => {
      new ProductModels(product)
        .save()
        .then(
             () => {
                res.end();
             },
             (errors) => handlers.validateError(res, errors)
           )
         }, errors => handlers.validateError(res, errors)
       )
});

router.put('/disabled', function(req, res, next){
  let product = { ...req.body };
   ProductModels.update({_id: product._id},{$set: {"eneable": false }},
     function(err,done){
       if(err){
         res.status(200).json(err);
       }
       res.end();
     });
});

router.put('/update', function(req, res, next){
  let product = { ...req.body };
   ProductModels.update({ _id: product._id }, { $set: product },
     function(err,done) {
       if(err) {
         handler.validateError(res, err);
       }
       res.end();
     });
});

module.exports = router;
