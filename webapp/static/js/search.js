$( document ).ready( function(){
  $( "#searchSubmit" ).click( function(){
    console.log( "search submitted" );
    $.post( "/api?action=search", { input: $( "#data" ).val() } ).done( function( r ){
      $( "#result" ).html( r );
    });
  });
});
