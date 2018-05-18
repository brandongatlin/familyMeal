$( document ).ready( function () {
  console.log( "dashboard.js loaded" );

  $.get( "/dashboard/comments", function ( res ) {
    console.log( "got /dashboard front end" );

    if ( res ) {
      console.log( res );
    }
  } )



} )