const MongoClient = require('mongodb').MongoClient
      , assert = require('assert');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sha1 = require('sha1');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
var config = require('./config');


//Some settings are defined in config.js:
let app = express();
let port = config.port;
let url = config.mongoURL;
let collection = config.mongoCollection;
console.log(config.welcome);

//Incase there's no DB service or failed to connect to the mongoDB:
MongoClient.connect(url, function(err, db) {
      assert.equal(null, err)
});

//Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }));

//Finn passord ved hjelp av client side kryptering!
var olePassord = function (db, query, res, callback){
  db.collection(config.mongoCollection, function(err, collection){
    collection.findOne({"sha1-id":query}, function(err, result){
      if (result === null){
        res.json({
          "mongo":"none..",
          "success":"no"
        });
      } else {
        collection.find({"_id":result._id}, function (err, cursor){
          cursor.toArray( function (err, docs){
            password = docs;
            res.json({
              "mongo":docs,
              "success":"yes"
            });
          });
        });
      }
    });
  });
}

//Nye post skjitn
app.post('/post', function (req, res){
  var postReq = req.body.Passord;
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    //
    olePassord(db, postReq, res, function() { 
      console.log("...POST");
      db.close;//
    });
  });
});

app.listen(port)