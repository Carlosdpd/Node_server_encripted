"use strict";
//Used for interaction with the database
var mongoose = require("mongoose");
//Used for the creating of schemas un mongoDB
var Schema = mongoose.Schema;
//Core model for our user
var Model = require('../core/model.js')

class serviceModel extends Model{

    //Create a service function
    createService (object) {
            var newService = new this.model({
                service: object.service,
                service_type: object.service_type,
                credential_user: object.credential_user,
                credential_password: object.credential_password,
            });
            newService.save(function(err, data) {
                if (err) console.log(err);
                console.log('Service created');
            });
        }
}

//Here we create the Service  object, we give him the name of the model and the schema.
var Service = new serviceModel('Service', new Schema({
    service: String,
    service_type: String,
    credential_user: String,
    credential_password: String,
}));
//Exporting the Service so we can use it in our controller
module.exports = Service;
