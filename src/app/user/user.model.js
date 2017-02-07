"use strict";
//Used for interaction with the database
var mongoose = require("mongoose");
//Used for the creating of schemas un mongoDB
var Schema = mongoose.Schema;
//Core model for our user
var Model = require('../core/model.js')


//Inheritance from our Model object
class userModel extends Model {
    //Constructor of our userModel
    constructor(name, schema){
        super(); //This function is to inherit from the Model
        this.name = name;
        this.schema = schema;
        this.model = mongoose.model(this.name, this.schema);
    }
    //Function for finding a user in the database
    findUser (usernameValue, callback) {
        var result;
        result = this.find('username', usernameValue, callback);
    }
    //Use this function to delete a user in the database
    deleteUser (usernameValue) {
            this.erase('username', usernameValue);
            console.log('User deleted');
    }
    //Function for updating the fields of a user un the database
    updateFields (usernameValue, object) {
            if (object.firstName != undefined) {
                this.update('username', usernameValue, 'first_name', object.firstName);
            }
            if (object.lastName != undefined) {
                this.update('username', usernameValue, 'last_name', object.lastName);
            }
            if (object.address != undefined) {
                this.update('username', usernameValue, 'address', object.address);
            }
            if (object.gender != undefined) {
                this.update('username', usernameValue, 'gender', object.gender);
            }
            if (object.email != undefined) {
                this.update('username', usernameValue, 'email', object.email);
            }
            if (object.password != undefined) {
                this.update('username', usernameValue, 'password', object.password);
            }
        }
    //Create a user function
    createUser (object) {
            var newUser = new this.model({
                first_name: object.firstName,
                last_name: object.lastName,
                gender: object.gender,
                address: object.address,
                username: object.username,
                password: object.password,
                email: object.email,
            });
            newUser.save(function(err, data) {
                if (err) console.log(err);
                console.log('User created');
            });
        }
}
//Here we create the User object, we give him the name of the model and the schema.
var User = new userModel('User', new Schema({
    first_name: String,
    last_name: String,
    gender: String,
    address: String,
    username: String,
    password: String,
    email: String,
    token: String,
}));
//Exporting the User so we can use it in our controller
module.exports = User;
