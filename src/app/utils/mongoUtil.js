"use strict";
//Library for mongo
var mongoose = require("mongoose");
//DB class
class mongoDB {
    init(host, user, password, port, database){
           mongoose.connect("mongodb://" + user + ":" + password + "" + host);
           var db = mongoose.connection;

           db.on("error", console.error.bind(console, "Connection error:"));
           db.once("open", function() {
               console.log("Connection Succeeded.");
           });
        });
    //Close connection
    closeConnection(){
        mongoose.connection.close();

    }
    //Make the query
    doQuery(query){
        //do the query
    }

}

module.exports = mongoDB;
