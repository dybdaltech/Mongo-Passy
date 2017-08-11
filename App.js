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
console.log(config.welcome);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', config.vengine);

//Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }))


//Query function. Finds the password:
var findPassword = function (db, query, callback){
  db.collection(config.mongoCollection, function(err, collection){
    collection.findOne({"sha1-id":query}, function (err, result){
      if(result === null){
        console.log('Found none');
        if(config.saveFailed == true){
          db.collection(config.mongoCollection).insertOne( {
            "sha1-id" : query
           }), function (err, result){
              assert.equal(err, null);
              console.log('Success....');
              callback();
            }            
        }
        //Return nothing..
        return;
      } else {
        //Find the password, console.log the SHA1 and _ID 
        //TODO: return string to show on the website.
          collection.find({"_id":result._id}, function (err, cursor){
          cursor.toArray( function (err, docs){
            password = docs;
            console.log(password);
          });
        });
      }
    });
  });
}

//Set the public folder (Not needed?)
app.use(express.static('public'));
//Render the site, index.pug (change engine in config.js, might need changes)
app.get('/', function (req, res) {
  console.log('Connection from '+req.ip)
  res.render('index',{
    title:config.pageTitle
  });
});


app.post('/', function (req, res){
  var postReq = req.body.Passord;
  console.log('Querrying: ')
  console.log("|"+postReq+"|");
  console.log('|----------------------------------------|');
  var sharded = sha1(postReq).toLocaleUpperCase();
  console.log("|"+sharded+"|");
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    //Use findPassword function to find the function
    findPassword(db, sharded, function() {
      db.close; //Close connection, //TODO: change to a stream
    });
  });
  //Redir to index.pug
  res.redirect("/");
});


app.listen(port)