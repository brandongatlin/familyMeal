$( document ).ready( function () {
  console.log( "dashboard.js loaded" );

  $.get( "/dashboard/comments", function ( res ) {
    console.log( "got /dashboard front end" );
  } )


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

    $( "#food-item-input" ).val( '' );
    $( "#food-description-input" ).val( '' );
    $( "#food-quantity-input" ).val( '' );

    $.post( "/members/newdonation", newDonation, function ( req, res ) {

    } )
  } )


} ); //end ready fx