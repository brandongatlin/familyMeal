var markers;
var content;

function initMap( moredata ) {
  console.log( "more data is:", moredata )
  "more data is:", moredata;

  var center = { lat: 29.760202, lng: -95.369835 };

  var mapOptions = {
    zoom: 10,
    scrollwheel: false,
    center: new google.maps.LatLng( 31.44, -100.47 )
  }
  var map = new google.maps.Map( document.getElementById( 'map' ), mapOptions );
  var bounds = new google.maps.LatLngBounds();
  var geocoder = new google.maps.Geocoder();
  for ( var x = 0; x < moredata.length; x++ ) {
    var name = `${moredata[ x ].food_type} ${moredata[ x ].donated_by.address}`;
    var address =
      geocoder.geocode( {
        'address': `${moredata[ x ].donated_by.address}`
      }, ( function ( name ) {
        // get function closure on "name"
        return function ( results, status ) {
          if ( status == google.maps.GeocoderStatus.OK ) {
            bounds.extend( results[ 0 ].geometry.location );
            map.fitBounds( bounds );
            var marker = new google.maps.Marker( {
              map: map,
              position: results[ 0 ].geometry.location,
              animation: google.maps.Animation.DROP,
            } );
            var contentString = `${name} ${address}`;
            var infowindow = new google.maps.InfoWindow( {
              content: `${name}`
            } );
            google.maps.event.addListener( marker, 'click', function () {
              infowindow.open( map, marker );
            } );
          }
        }
      } )( name ) );
  }
}

// google.maps.event.addDomListener( window, 'load', initMap );
// google.maps.event.addDomListener( window, 'resize', initMap );
var addresses = [ "3000 Main St San Angelo TX", "4001 Sunset Dr San Angelo TX" ];
var names = [ 'First Place', 'Second Place' ];


// function initMap( moredata ) {
//   console.log( "more data is:", moredata );

// var geocoder = new google.maps.Geocoder();



// for ( var i = 0; i < moredata.length; i++ ) {
//
//   console.log( "more data sub i is:", moredata[ i ] );
//
//   var food = `${moredata[i].food_type}`
//   console.log( "food is:", moredata[ i ].food_type );
//
//   content = `${moredata[ i ].donated_by.address}`
//   // var content = `${place} ${food}`
//
//
//
//   geocoder.geocode( { 'address': markers[ i ] }, function ( results, status ) {
//
//     console.log( "results from google are:", results );
//
//     var marker = new google.maps.Marker( {
//       map: map,
//       position: results[ 0 ].geometry.location,
//       title: "test title"
//     } );
//
//     var infowindow = new google.maps.InfoWindow( {
//       content: markers[ i ]
//     } );
//
//     marker.addListener( 'click', function () {
//       infowindow.open( map, marker );
//     } );
//
//   } );
// } //end for loop

//   var center = { lat: 29.760202, lng: -95.369835 };
//   var houston = { lat: 29.760202, lng: -95.369835 };
//
//   var map = new google.maps.Map( document.getElementById( 'map' ), {
//     zoom: 10,
//     center: center
//   } );
//
// } //end init map fx

//testing
// geocoder.geocode( {
//   'address': addresses[ x ]
//   // get function closure on "name"
// }, ( function ( name ) {
//   return function ( results, status ) {
//     if ( status == google.maps.GeocoderStatus.OK ) {
//       var marker = new google.maps.Marker( {
//         map: map,
//         position: results[ 0 ].geometry.location,
//         animation: google.maps.Animation.DROP,
//       } );
//       var contentString = name;
//       var infowindow = new google.maps.InfoWindow( {
//         content: contentString
//       } );
//       google.maps.event.addListener( marker, 'click', function () {
//         infowindow.open( map, marker );
//       } );
//     }
//   }
// } )( name ) );
//end testing


$( document ).ready( function () {

  // var markers = [];


  M.AutoInit();
  // $( '.tabs' ).tabs();
  // var instance = M.Tabs.init( '.tabs' );
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
      // console.log( "moredata is:", moredata );
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