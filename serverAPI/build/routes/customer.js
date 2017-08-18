'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _customerModel = require('../models/customerModel');

var _customerModel2 = _interopRequireDefault(_customerModel);

var _handler = require('../utils/handler');

var handlers = _interopRequireWildcard(_handler);

var _validateCustomer = require('../validators/validateCustomer');

var _validateCustomer2 = _interopRequireDefault(_validateCustomer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import validateCustomerServer from '../validators/validateCustomerServer';

var router = _express2.default.Router();

router.post('/', function (req, res, next) {
  var customer = _extends({}, req.body, { _id: 1 });
  (0, _validateCustomer2.default)(customer).then(function (customer) {
    new _customerModel2.default(customer).save().then(function (response) {
      res.status(200).json(response);
    }, function (errors) {
      handlers.validateError(res, errors);
    });
  }, function (errors) {
    handlers.validateError(res, errors);
  });
});

router.get('/customerList', function (req, res) {
  _customerModel2.default.find({}, function (err, data) {
    if (err) {
      res.status(500).send('Hubo un error buscando la lista de customer');
    }
    res.status(200).json(data);
  });
});

router.get('/:id', function (req, res) {
  _customerModel2.default.find({ _id: req.params.id }, function (err, data) {
    if (err) {
      return handlers.validateError(res, err);
      console.log('Hubo un error buscando the customer');
    }
    return res.status(200).json(data);
  });
});

module.exports = router;