//Models used in Mongoose (located in core)
var mongoose = require('mongoose');
var Token = require('../user_token/user_token.model.js');

//Number of minutes for erasing database
var mins = require('../config/time.interval.js');

//Use of cron
var cron = require('node-cron');

var cronMins = '*/' + mins.toString() + ' * * * *';

cron.schedule(cronMins , function(){
    Token.eraseCollection();
});

module.exports = cron;
