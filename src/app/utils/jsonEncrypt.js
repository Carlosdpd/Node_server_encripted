'use strict';
//Used for file system reading
var fs = require('fs');
//Ursa for encrypting
var ursa = require('ursa');
var crt, key, msg;
//Creation of the public key
crt = ursa.createPublicKey(fs.readFileSync('./utils/keys/my-server.pub'));
//This functions takes a JSON, makes it a String and then encrypts it.
var jsonEncrypt = function(object){
    var toText = JSON.stringify(object); // js object to json string
    var encText =  crt.encrypt(toText, 'utf8','base64');
    return encText;
}

module.exports = jsonEncrypt;
