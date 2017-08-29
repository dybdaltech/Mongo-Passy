var config = {};
let version = "0.1.0";
/*
Hello! In order to use this web-app you need the following:
Install the required packages
Have a mongodb ready to be used. (Either locally or externally)

You must then configure the application below.
Here's a blank configuration:

config.welcome = "Starting application..";

//Express configuration:
config.port = 3333; //Port to run web-service on.

//View engine settings:
config.vengine = "pug";
//mongo configuration:
config.mongoURL = ''; 
config.mongoCollection = '';
config.secretCookie = 'keyboard cat'; //Cookie secret - not used yet

//Application settings
config.saveFailed = false; //Save failed attempts to database, soon we will have the biggest collection!
config.pageTitle = "Password Check"; //Page title..

module.exports = config;

*/

//I've used my settings here, change appropiatly or use the blank found above:
config.welcome = `%c ________________________________________
< mooooooooooooooooooooooooooooooooooooo >
 ----------------------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`+"Version: "+version;

//Express configuration:
config.port = 3333; //Port to run web-service on.

//View engine settings:
config.vengine = "pug";
//mongo configuration:
config.mongoURL = 'mongodb://172.19.20.138:27017/hashStorage'; 
config.mongoCollection = 'sha1-hash';
config.secretCookie = 'keyboard cat'; //Cookie secret - not used yet

//Application settings
config.saveFailed = false; //Save failed attempts to database, soon we will have the biggest collection!
config.pageTitle = "Passord check"; //Page title..

module.exports = config;