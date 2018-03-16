'use strict';

var config = require( './config.js' );

// App
app.set( 'view engine', 'pug' );//use pug for templating
app.set('trust proxy', 1) // trust first proxy
app.use( bodyParser.urlencoded( { extended: true } ) );//read POST body as urlencoded
app.use( bodyParser.json() );//turn POST data into json
app.use( express.static( __dirname + '/static' ) );//allow access to static files

app.get( '/', function( req, res ){
  var queryRes = scope.functions.queryDB( 'SELECT id, query FROM searches ORDER BY id DESC LIMIT 10;' );
  scope.functions.waitForVar(queryRes, 'rows', function() {
    var allPrev = "";
    queryRes.rows.forEach( function( prev ){
      allPrev = allPrev + prev.query + "<br />";
    });
    res.render(
      'index',
      {
        recent: allPrev
      }
    );
  }, function() {
    res.render(
      'index'
    );
  })
});

app.post( '/api', function( req, res ){
  var a = req.query.action;//GET param ?action
  var d = req.body;//POST body as json
  var api = require( './api.js' );

  var r = api.act( a, d );//api response
  res.send( r );
});

app.listen(scope.vars.port);
console.log('Running on http://localhost:' + scope.vars.port);
