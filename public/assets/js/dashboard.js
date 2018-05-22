var markers;


function initMap( moredata ) {
  console.log( "markers at start of initMap", markers );

  var geocoder = new google.maps.Geocoder();

  for ( var i = 0; i < markers.length; i++ ) {
    geocoder.geocode( { 'address': markers[ i ] }, function ( results, status ) {
      if ( status == google.maps.GeocoderStatus.OK ) {
        var marker = new google.maps.Marker( {
          map: map,
          position: results[ 0 ].geometry.location
        } );
      } else {
        alert( "Geocode was not successful for the following reason: " + status );
      }
    } );
  }

  var center = { lat: 29.760202, lng: -95.369835 };
  var houston = { lat: 29.760202, lng: -95.369835 };

  var map = new google.maps.Map( document.getElementById( 'map' ), {
    zoom: 10,
    center: center
  } );

} //end init map fx


$( document ).ready( function () {

  // var markers = [];



  $( '.tabs' ).tabs();
  // var instance = M.Tabs.getInstance( elem );
  // instance.select( 'tab_id' );
  // instance.updateTabIndicator();


  $( "#view-donations" ).on( "click", function ( event ) {
    event.preventDefault()

    $.get( "/members/viewdonations", function ( data ) {
      if ( data ) {
        // console.log( "address of first donation is", data[ 0 ].donated_by.address );
        $( "#donations-list" ).empty();

        for ( var i = 0; i < data.length; i++ ) {
          $( "#donations-list" ).prepend(
            `<li>${data[i].food_type}, ${data[i].food_description}</li>`
          )
        }

      }
    } )
  } )

  $( "#view-donation-map" ).on( "click", function ( event ) {
    event.preventDefault();
    // $( "#tab-div" ).empty();


    markers = [];


    $.get( "/members/viewmap", function ( data ) {
      if ( data ) {

        for ( var i = 0; i < data.length; i++ ) {
          markers.push( data[ i ].donated_by.address );
        }

      }
    } ).then( function ( moredata ) {
      console.log( "moredata is:", moredata );
      initMap( moredata );
    } )

  } )


  $( "#view-comments" ).on( "click", function ( event ) {
    event.preventDefault()

    $.get( "/members/viewcomments", function ( data ) {
      if ( data ) {
        $( "#tab-div" ).empty();
        $( "#comments-list" ).empty();

        for ( var i = 0; i < data.length; i++ ) {
          $( "#comments-list" ).prepend(
            `<li>On ${data[i].createdAt}, ${data[i].writerName} said, "${data[i].text}"</li>`
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

    const donationToast = `Thanks for the ${newDonation.food_type}!`
    M.toast( { html: donationToast, classes: "toasts" } )


    $.post( "/members/newdonation", newDonation, function ( req, res ) {

    } )
  } )






} ); //end ready fx