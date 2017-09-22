'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _products = require('./products');

var _products2 = _interopRequireDefault(_products);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _customerServer = require('./customerServer');

var _customerServer2 = _interopRequireDefault(_customerServer);

var _customer = require('./customer');

var _customer2 = _interopRequireDefault(_customer);

var _vehicle = require('./vehicle');

var _vehicle2 = _interopRequireDefault(_vehicle);

var _generalServices = require('./generalServices');

var _generalServices2 = _interopRequireDefault(_generalServices);

var _company = require('./company');

var _company2 = _interopRequireDefault(_company);

var _checkout = require('./checkout');

var _checkout2 = _interopRequireDefault(_checkout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


router.use('/company', _company2.default);
router.use('/customer', _customer2.default);
router.use('/vehicle', _vehicle2.default);
router.use('/customerServices', _customerServer2.default);
router.use('/product', _products2.default);
router.use('/user', _users2.default);
router.use('/generalServices', _generalServices2.default);
router.use('/checkout', _checkout2.default);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ message: 'Welcome to ServOil API :)' });
});

module.exports = router;