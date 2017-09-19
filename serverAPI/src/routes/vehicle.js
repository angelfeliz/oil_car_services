import express from 'express';
import vehicleModel from '../models/vehicleModel';
import * as handlers from  '../utils/handler';
import validateVehicle from '../validators/validateVehicle';


var router = express.Router();

router.put('/update', function(req, res) {

    let vehicle = { ...req.body }
    validateVehicle(vehicle)
    .then((vehicle) => {
      vehicleModel.update({ _id: vehicle._id }, { $set: vehicle },
      function(err, done) {
        if(err) {
          handlers.validateError(res, err);
        }
        res.end();
      })
    }, (err) => console.log('error de promise', err))
});

router.get('/vehicleList', function(req, res){
  vehicleModel.find({},function(err, data){
    if(err) {
      res.status(500).send('Hubo un error buscando la lista de vehicle');
    }
    res.status(200).json(data);
  })
});

router.post('/', function(req, res, next) {
  let vehicle = { ...req.body, _id: 2 };  
  validateVehicle(vehicle)
  .then((vehicle) => {
    new vehicleModel(vehicle)
     .save()
     .then((response) => {
     res.json(response);
    },
        (errors) => { handlers.validateError(res, errors); }
    )
  },
  (errors) => { handlers.validateError(res, errors); } );
});

router.get('/vehicleCustomerId/:id', function(req, res){
  vehicleModel.find({customer_id:req.params.id},function(err, data){
    if(err) {
      handlers.validateError(res,error);
      console.log('Hubo un error buscando la lista de vehicle');
    }
    res.status(200).json(data);
  })
});



module.exports = router;
