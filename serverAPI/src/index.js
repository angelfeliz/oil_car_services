import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import config from './config';
import api from './routes';

//Mongoose config
mongoose.Promise = Promise;
mongoose.connect(config.database);

var app = express();
app.use(bodyParser.json());

//Routes
app.use('/api', api);
app.use(express.static(path.resolve(__dirname, 'static')));
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'static', 'index.html')));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Serving on http://localhost:${PORT}`));
