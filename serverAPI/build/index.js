'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Mongoose config
_mongoose2.default.Promise = Promise;
_mongoose2.default.connect(_config2.default.database);

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());

//Routes
app.use('/api', _routes2.default);
app.use(_express2.default.static(_path2.default.resolve(__dirname, 'static')));
app.get('*', function (req, res) {
  return res.sendFile(_path2.default.resolve(__dirname, 'static', 'index.html'));
});

var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  return console.log('Serving on http://localhost:' + PORT);
});