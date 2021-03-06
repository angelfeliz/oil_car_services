import express from 'express';
var router = express.Router();
import products from './products';
import users from './users';
import customerServer from './customerServer';
import customer from './customer';
import vehicle from './vehicle';
import generalServices from './generalServices';
import company from './company';
import checkout from './checkout';

router.use('/company', company);
router.use('/customer', customer);
router.use('/vehicle', vehicle);
router.use('/customerServices', customerServer);
router.use('/product', products);
router.use('/user', users);
router.use('/generalServices', generalServices);
router.use('/checkout', checkout);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'Welcome to ServOil API :)' });
});

module.exports = router;
