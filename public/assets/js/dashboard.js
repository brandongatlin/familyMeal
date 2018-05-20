$( document ).ready( function () {
  console.log( "dashboard.js loaded" );

  $.get( "/dashboard/comments", function ( res ) {
    console.log( "got /dashboard front end" );

    // if ( res ) {
    //   console.log( "front comments res is:", res );
    //
    //   // for ( var i = 0; i < res.length; i++ ) {}
    //
    // }
  } )

  // $.get( "/comments", function ( res ) {
  //   console.log( "hit new comment route on front end" );
  // } )

  $( "#submit-donation" ).on( "click", function ( event ) {
    event.preventDefault();

    var food_type = $( "#food-item-input" ).val().trim();
    var food_description = $( "#food-description-input" ).val().trim();
    var food_quantity = $( "#food-quantity-input" ).val().trim()


    var newDonation = {
      food_type: food_type,
      food_description: food_description,
      food_quantity: food_quantity
    }

    $.post( "/members/newdonation", newDonation, function ( req, res ) {

      console.log( "/newdonation hit on front end" );

      console.log( "front end newDonation is:", newDonation );
    } )
  } )


} ); //end ready fx