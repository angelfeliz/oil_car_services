"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  database: process.env.MONGODB_URI || "mongodb://puser:Am29311981@svr-01-shard-00-00-byr5i.mongodb.net:27017,svr-01-shard-00-01-byr5i.mongodb.net:27017,svr-01-shard-00-02-byr5i.mongodb.net:27017/ServOil?ssl=true&replicaSet=svr-01-shard-0&authSource=admin"
  /* dev-online*/
  //"mongodb://puser:Am29311981@svr-01-shard-00-00-byr5i.mongodb.net:27017,svr-01-shard-00-01-byr5i.mongodb.net:27017,svr-01-shard-00-02-byr5i.mongodb.net:27017/ServOil?ssl=true&replicaSet=svr-01-shard-0&authSource=admin"
  /* dev-offline db*/
  //'mongodb://localhost:27017/servoil',
  //endPoint: "https://serv-oil-app-kaqqmzgokr.now.sh"
};