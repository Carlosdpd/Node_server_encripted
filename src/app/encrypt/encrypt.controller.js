var express = require('express');
var router = express.Router();

//encryptor
var encrypt = require('../utils/jsonEncrypt.js');

//Body Parser
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//encrypting
router.post('/', function (req, res) {
    var data = encrypt(req.body);
    var data = {data};
    res.send(data);

});



module.exports = router;
