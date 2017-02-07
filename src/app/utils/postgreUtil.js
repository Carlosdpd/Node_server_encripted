"use strict";
//Library for Postgre
var pg = require('pg');

//DB class
class postgreDB{
    init(host, user, password, port, database){
        var connectionString = "postgres://" + user + ":" + password+ "@" + host + ":" + port + "/" + database;
        var client = new pg.Client(connectionString);
        client.connect();
    }
    //Close connection
    closeConnection(){
        client.end(function (err) {
            if (err) throw err;
        });
    }
    //Make Query
    doQuery(query){
        //do the query
    }
}

module.exports = postgreDB;
