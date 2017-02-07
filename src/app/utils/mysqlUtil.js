"use strict";
//Library for Mysql
var mysql = require('mysql');

//DB class
class mysqlDB {
    init(host, user, password, port, database){
        var connection = mysql.createConnection({
           host: host,
           user: user,
           password: password,
           database: database,
        });
        //Connect to the database
        connection.connect(function(error){
           if(error){
              throw error;
           }else{
              console.log('Connected to Mysql');
           }
        });
    }
    //Close connection
    closeConnection(){
        connection.end();
    }
    //Make a query.
    doQuery(query){
        //do the query
    }

};

module.exports = mysqlDB;
