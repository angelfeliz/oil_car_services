'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _customerServerModel = require('../models/customerServerModel');

var _customerServerModel2 = _interopRequireDefault(_customerServerModel);

var _handler = require('../utils/handler');

var handlers = _interopRequireWildcard(_handler);

var _validateCustomerServer = require('../validators/validateCustomerServer');

var _validateCustomerServer2 = _interopRequireDefault(_validateCustomerServer);

var _NCFCompanyModel = require('../models/NCFCompanyModel');

var _NCFCompanyModel2 = _interopRequireDefault(_NCFCompanyModel);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/save', function (req, res, next) {
  console.log('no debe entrar ', req.method);
  if (req.method === 'POST') {
    if (req.body.customer.rnc) {
      var ncfObj = _NCFCompanyModel2.default.find({ companyId: 1, NCFType: req.body.ncfType }, { NCF: 1, inicialNCF: 1, finalNCF: 1 });
      ncfObj.exec(function (err, ncf) {
        if (Number.parseInt(ncf.inicialNCF) + 1 > Number.parseInt(ncf.finalNCF)) {
          var _err = {
            msg: 'La factura no fue guardada debido aque ya no tiene comprobante restantes'
          };
          res.json(_err);
        } else {
          req.ncf = ncf[0].NCF + ncf[0].inicialNCF;
          var newNCF = Number.parseInt(ncf[0].inicialNCF) + 1;
          _NCFCompanyModel2.default.update({ companyId: 1, NCFType: req.body.ncfType }, { inicialNCF: newNCF }, function (err, done) {
            next();
          });
        }
      });
    } else {
      req.ncf = null;
      next();
    }
  }
});

router.post('/save', function (req, res, next) {
  var servicesCustomer = _extends({}, req.body, {
    _id: 3,
    ncf: req.ncf
  });
  var servicesCustomerDb = new _customerServerModel2.default(servicesCustomer);
  servicesCustomerDb.save().then(function (response) {
    return res.json(response);
  }, function (err) {
    console.log('this is a err ', err);
    return res.status(200).json(err);
  });
});

router.post('/updateState', function (req, res, next) {
  _customerServerModel2.default.update({ _id: req.body.id }, { statu: req.body.statu }, { upsert: true }, function (err, done) {
    if (err) {
      return res.status(200).json();
    }
    return res.status(200).end();
  });
});

router.get('/topLastCustomer', function (req, res) {

  var customer = _customerServerModel2.default.find({}, ["customer.firstName", "customer.lastName"]).sort({ createdAt: -1 }).limit(10);

  customer.exec(function (err, cust) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(cust);
  });
});

router.get('/countSellofDay', function (req, res) {
  var date = Date.now();
  _customerServerModel2.default.find({ createdAt: { $gte: Date.now() } }).count({}, function (err, count) {
    if (err) {
      return res.status(200).json(err);
    }
    return res.status(200).json(count);
  });
});

router.get('/topSell', function (req, res) {
  _customerServerModel2.default.aggregate({
    $unwind: "$products"
  }, {
    $group: {
      _id: {
        product_id: "$products.product_id",
        product_name: "$products.name_"
      },
      count: {
        $sum: 1
      }
    }
  }, { $sort: { "count": -1 } }, { $limit: 10 }, function (err, responses) {
    if (err) {
      return res.status(200).json(err);
    }
    return res.status(200).json(responses);
  });
});

router.get('/countOilSellOfDay', function (req, res) {
  var today = Date.now();
  _customerServerModel2.default.aggregate({ $unwind: "$products" }, {
    $group: {
      _id: null,
      countAllOil: { $sum: "$products.quantity" }
    }
  }, function (err, responses) {
    if (err) {
      return res.status(200).json(err);
    }
    return res.status(200).json(responses);
  });
});

router.post('/oilChangeUnPay', function (req, res) {
  var pending = _customerServerModel2.default.find({ statu: req.body.statu });
  pending.exec(function (err, sell) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(sell);
  });
});

module.exports = router;