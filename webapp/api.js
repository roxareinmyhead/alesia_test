require( './config.js' );

module.exports = {
  act: function( action, data ){
    switch( action ){
      case "search":
        scope.functions.queryDB( 'INSERT INTO searches (query) VALUES ("' + data.input + '");' );
        return "No results found for:<br />" + data.input;
        break;

      default:
        return "I don't know what you want me to do.";
        break;
    }
  }
}
