'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _productsmodel = require('../models/productsmodel');

var _productsmodel2 = _interopRequireDefault(_productsmodel);

var _validateProduct = require('../validators/validateProduct');

var _validateProduct2 = _interopRequireDefault(_validateProduct);

var _handler = require('../utils/handler');

var handlers = _interopRequireWildcard(_handler);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res, next) {
  _productsmodel2.default.find({ eneable: true }).sort({ name_: -1 }).exec(function (err, data) {
    if (err) {
      res.status(500).send('Hubo un error buscando la lista de productos');
    }
    res.json(data);
  });
});

router.post('/', function (req, res, next) {
  var product = _extends({}, req.body, { _id: 4 });
  console.log('before save', product);
  (0, _validateProduct2.default)(product).then(function (product) {
    new _productsmodel2.default(product).save().then(function () {
      res.end();
    }, function (errors) {
      return handlers.validateError(res, errors);
    });
  }, function (errors) {
    return handlers.validateError(res, errors);
  });
});

router.put('/disabled', function (req, res, next) {
  var product = _extends({}, req.body);
  _productsmodel2.default.update({ _id: product._id }, { $set: { "eneable": false } }, function (err, done) {
    if (err) {
      res.status(200).json(err);
    }
    res.end();
  });
});

router.put('/update', function (req, res, next) {
  var product = _extends({}, req.body);
  _productsmodel2.default.update({ _id: product._id }, { $set: product }, function (err, done) {
    if (err) {
      handler.validateError(res, err);
    }
    res.end();
  });
});

module.exports = router;