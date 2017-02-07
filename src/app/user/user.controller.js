var express = require('express');
var router = express.Router();

//Decrypt/encrypt from the intercept
var decrypt = require('../utils/jsonDecrypt.js');

//Models used in Mongoose (located in core)
var mongoose = require('mongoose');
var User = require('./user.model.js');
var Token = require('../user_token/user_token.model.js');

//Body Parser
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Encrypting key
var key = ('Roxanne, you dont have to put on the red encrypting key');
var encryptor = require('simple-encryptor')(key);

//Uuid for token generation
var uuid = require('uuid');

//Basic login with encrypted password
router.post('/login', function (req, res) {
    var username = req.body.data.username;
    var password = req.body.data.password;
    var currentUser;
    //Finding the user by username
    User.findUser(username, function(result) {
        currentUser = result;
        if(currentUser == undefined){
            var newResponse = {};
            newResponse.message = 'Error in username';
            res.send(newResponse);
        }else{
            if (currentUser.username == username) {
                var decryptedPassword = encryptor.decrypt(currentUser.password);
                if(password == decryptedPassword){
                    //Here we create the token object
                    var tokenObject = {};
                    tokenObject.user_id = username;
                    tokenObject.token = uuid.v1();
                    tokenObject.created = Date();
                    tokenObject.last_active = Date();
                    Token.createToken(tokenObject);
                    //Showing user info
                    var newResponse = {};
                    newResponse.first_name = currentUser.first_name;
                    newResponse.last_name = currentUser.last_name;
                    newResponse.address = currentUser.address;
                    newResponse.email = currentUser.email;
                    newResponse.message = 'Welcome';
                    res.send(newResponse)
                }else{
                    var newResponse = {};
                    newResponse.message = 'Error in password';
                    res.send(newResponse);
                }

            }
        }
    });
});


//Change password route
router.put('/changepassword', function (req, res) {
  var username = req.body.data.username;
  var password = req.body.data.password;
  var newPassword = req.body.data.newPassword;
  //Encrypting new password
  newPassword = encryptor.encrypt(newPassword);
  //Saving the new password
  User.updateFields(username, {'password':newPassword});
  //Update token
  Token.updateTokenDate(username);
  //Response
  var newResponse = {};
  newResponse.message = 'Password Changed';
  res.send(newResponse);

});

//Change user info route
router.put('/updateprofile', function (req, res) {
    //This is the object creation wich we use in the update of the user
    object = {};
    var username = req.body.data.username;
    object.firstName = req.body.data.first_name;
    object.lastName = req.body.data.last_name;
    object.address = req.body.data.address;
    object.gender = req.body.data.gender;
    object.email = req.body.data.email;
    User.updateFields(username, object);
    //Update token
    Token.updateTokenDate(username);
});

// Creating user route
router.post('/createuser', function (req, res) {
    //Creation of the object for the new user
    var object = {};
    object.username = req.body.data.username;
    object.password = req.body.data.password;
    object.firstName = req.body.data.first_name;
    object.lastName = req.body.data.last_name;
    object.address = req.body.data.address;
    object.gender = req.body.data.gender;
    object.email = req.body.data.email;
    User.findUser(req.body.data.username, function(result) {
        currentUser = result;
        if(currentUser == undefined){
            object.password = encryptor.encrypt(object.password);
            User.createUser(object);
            var newResponse = {};
            newResponse.message = 'User created succesfully ';
            res.send(newResponse);
        }else{
            var newResponse = {};
            newResponse.message = 'User already exists';
            res.send(newResponse);
        }
    });
});


module.exports = router;
