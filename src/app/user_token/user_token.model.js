"use strict";
//Used for interaction with the database
var mongoose = require("mongoose");
//Used for the creating of schemas un mongoDB
var Schema = mongoose.Schema;
//Core model for our Token
var Model = require('../core/model.js')

//Inheritance from our Model object
class tokenModel extends Model {
    //Constructor of our tokenModel
    constructor(name, schema){
        super(); //This function is to inherit from the Model
        this.name = name;
        this.schema = schema;
        this.model = mongoose.model(this.name, this.schema);
    }
    //Function used in utils/token.cron.js for clearing the token database based on a time interval parameter -- clean every TimeInterval minutes
    eraseCollection (){
        this.erase();
        console.log('Token database cleared');
    }
    //Function called after every session operation so it can make track of the last active moment of a token
    updateTokenDate (username){
        this.update('user_id', username, 'last_active', Date());
    }
    //Function for creating tokens. It's called after every login
    createToken (object){
            var newToken = new this.model({
              user_id : object.user_id,
              token : object.token,
              created_date: object.created,
              last_active: object.last_active,
            });
            newToken.save(function (err, data) {
              if (err) console.log(err);
                console.log('Token created');
            });
        }
}
//Here we create the Token object, we give him the name of the model and the schema.
var Token = new tokenModel('Token', new Schema({
    user_id: String,
    token: String,
    created_date: String,
    last_active: String
}))
//Exporting the Token so we can use it in our controller
module.exports = Token;
