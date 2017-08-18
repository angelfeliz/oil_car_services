'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _vehicleModel = require('../models/vehicleModel');

var _vehicleModel2 = _interopRequireDefault(_vehicleModel);

var _handler = require('../utils/handler');

var handlers = _interopRequireWildcard(_handler);

var _validateVehicle = require('../validators/validateVehicle');

var _validateVehicle2 = _interopRequireDefault(_validateVehicle);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.put('/update', function (req, res) {

  var vehicle = _extends({}, req.body);
  (0, _validateVehicle2.default)(vehicle).then(function (vehicle) {
    _vehicleModel2.default.update({ _id: vehicle._id }, { $set: vehicle }, function (err, done) {
      if (err) {
        handlers.validateError(res, err);
      }
      res.end();
    });
  }, function (err) {
    return console.log('error de promise', err);
  });
});

router.get('/vehicleList', function (req, res) {
  _vehicleModel2.default.find({}, function (err, data) {
    if (err) {
      res.status(500).send('Hubo un error buscando la lista de vehicle');
    }
    res.status(200).json(data);
  });
});

router.post('/', function (req, res, next) {
  var vehicle = _extends({}, req.body, { _id: 2 });
  (0, _validateVehicle2.default)(vehicle).then(function (vehicle) {
    new _vehicleModel2.default(vehicle).save().then(function (response) {
      res.json(response);
    }, function (errors) {
      handlers.validateError(res, errors);
    });
  }, function (errors) {
    handlers.validateError(res, errors);
  });
});

router.get('/vehicleCustomerId/:id', function (req, res) {
  _vehicleModel2.default.find({ customer_id: req.params.id }, function (err, data) {
    if (err) {
      handlers.validateError(res, error);
      console.log('Hubo un error buscando la lista de vehicle');
    }
    res.status(200).json(data);
  });
});

module.exports = router;