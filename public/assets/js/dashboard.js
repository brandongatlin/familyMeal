$( document ).ready( function () {
  console.log( "dashboard.js loaded" );
  $( '.tabs' ).tabs();

  // $.get( "/members", function ( data ) {
  //   if ( data ) {
  //     $( "#name-div" ).empty();
  //     // $( "#name-div" ).append( data.name );
  //
  //   }
  // } )



  $( "#view-donations" ).on( "click", function ( event ) {
    event.preventDefault()
    console.log( "view donations clicked" );

    $.get( "/members/viewdonations", function ( data ) {
      if ( data ) {
        console.log( data );
        $( "#donations-list" ).empty();

        for ( var i = 0; i < data.length; i++ ) {
          $( "#donations-list" ).prepend(
            `<li>${data[i].food_description}</li>`
          )
        }
      }
    } )
  } )


  $( "#view-comments" ).on( "click", function ( event ) {
    event.preventDefault()

    console.log( "view comment clicked" );

    $.get( "/members/viewcomments", function ( data ) {
      if ( data ) {
        console.log( data );
        $( "#comments-list" ).empty();

        for ( var i = 0; i < data.length; i++ ) {
          $( "#comments-list" ).prepend(
            `<li>${data[i].text}</li>`
          )
        }
      }
    } )
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