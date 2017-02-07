//Library for executing commands from code.
var exec = require('child_process').exec;

var command = function(comm){
    function puts(error, stdout, stderr) { console.log(stdout); }
    exec(comm, puts);
}

command('node -v');
