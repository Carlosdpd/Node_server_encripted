//Use of express
var express = require('express');
var app = express();

app.use(function(req, res, next) {
res.header('Access-Control-Allow-Credentials', true);
res.header('Access-Control-Allow-Origin', req.headers.origin);
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
if ('OPTIONS' == req.method) {
     res.sendStatus(200);
 } else {
     next();
 }
});

//Port
var port = require ('./config/port.js')

//Router
var router = require("./core/router.js")(app);

//Use of cron activities
var cron = require('./utils/token.cron.js');

app.listen(port);
