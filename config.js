var config = {};

config.welcome = "Starting application";

//Express configuration:
config.port = 3333; //Port to run web-service on.

//View engine settings:
config.vengine = "pug";
//mongo configuration:
config.mongoURL = 'mongodb://localhost:27017/hashStorage'; 
config.mongoCollection = 'shaOne';
config.secretCookie = 'keyboard cat'; //Cookie secret

//Application settings
config.saveFailed = false; //Save failed attempts to database, soon we will have the biggest collection!
config.pageTitle = "Passord check"; //Page title..

module.exports = config;