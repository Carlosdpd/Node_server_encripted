"use strict";
var dirDB = require('../config/db.dir.js');
//Username for BD
var usernameDB = require('../config/db.username.js');
//Password for BD
var passwordDB = require('../config/db.password.js');
//Mongo Plugin
var mongoose = require("mongoose");
//Connection to database
mongoose.connect("mongodb://" + usernameDB + ":" + passwordDB + "" + dirDB);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function() {
    console.log("Connection Succeeded.");
});

//Definition of the model
class Model {
    //Defining the crud operations on the database
    //Basic find operation
    find (property, propertyValue, callback) {
            var object = {};
            object[property] = propertyValue;
            //Finding the username
            this.model.findOne(object, function(err, result) {
                if (err) throw err;

                callback(result);
            });
        };
    //Function for updating the document in the database
    update (property, propertyValue, propertyToModify, propertyNewValue) {
                var object = {};
                object[property] = propertyValue;
                var objectReplace = {};
                objectReplace[propertyToModify] = propertyNewValue;
                this.model.update(object, objectReplace, function(err, user) {
                    if (err) throw err;
                });
            };
    //Erasing a document in the database
    erase (property, propertyValue) {
                var object = {};
                object[property] = propertyValue;
                this.model.remove(object, function(err, result) {
                    if (err) throw err;
                });
            };
};

//Exporting the main Model
module.exports = Model;
