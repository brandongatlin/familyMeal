$( document ).ready( function () {
  console.log( "profile js is ready!" );

  $.get( "/profile", function ( res ) {
    if ( res ) {
      console.log( 'profile get request' );

    } else {
      console.log( error );
    }
  } )
} );