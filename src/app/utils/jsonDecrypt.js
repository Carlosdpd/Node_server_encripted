'use strict';
//Used for file system reading
var fs = require('fs');
//Ursa for encrypting
var ursa = require('ursa');
var crt, key, msg;
//Creation of the private key
key = ursa.createPrivateKey(fs.readFileSync('utils/keys/private_key.pem'));
//this function takes an encrypted string, decrypts it, and creates a JSON.
var jsonDecrypt = function(encString){
    var toObject = key.decrypt(encString, 'base64', 'utf8');
    var finalObject = JSON.parse(toObject); // from json string to js object
    return finalObject;
}

module.exports = jsonDecrypt;
