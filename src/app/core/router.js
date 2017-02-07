//Decrypt/encrypt from the intercept
var decrypt = require('../utils/jsonDecrypt.js');
//Body Parser
var bodyParser = require("body-parser");


module.exports = function (app) {
    //Body Parsing

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(function(req, res, next) {
        //if the data coming is not for encrypting, decrypt it
        if( req.originalUrl == '/encrypt' ){
        }else{
            req.body.data = decrypt(req.body.data);
        }
        next();
    });
	//Routes for user
    app.use('/user', require('../user/user.controller.js'));
	//Routes for encrypting
    app.use('/encrypt', require('../encrypt/encrypt.controller.js'))
};
