global.express = require( 'express' );
global.mysql = require( 'mysql' );
global.bodyParser = require( 'body-parser' );
global.sessions = require( 'express-session' );

// Constants
global.app = express();
global.scope = {
    vars: {},
    functions: {}
}

// Variables
global.scope.vars.port = 8080;

global.scope.vars.connAuth = {
  host: '192.168.1.4',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'webapp',
  debug: true
}

// Functions
global.scope.functions.queryDB = function(query) {
    var res = {};
    var conn = mysql.createConnection(scope.vars.connAuth);
    conn.query(query, function(err, rows, fields) {
      if (err) {
        throw err
      }
      res.rows = rows;
    });
    conn.end();
    return res;
}

global.scope.functions.waitForVar = function(object, varName, callback, onError, timeout) {
  timeout = (typeof timeout !== 'undefined') ? timeout : 3000;
  onError = (typeof onError !== 'undefined') ? onError : function(){};
  var tracker = 0;
  var interval = 50;
  var int = setInterval(function() {
    tracker += interval;
    if (!object.hasOwnProperty(varName) && (tracker < timeout)) return;
    clearInterval(int);
    if (tracker >= timeout) {
      onError();
    }
    else {
      callback();
    }
  }, interval)
}
