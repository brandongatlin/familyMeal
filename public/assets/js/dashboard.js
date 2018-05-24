var markers;
var content;

var map, infoWindow;

function initMap( moredata ) {
  // console.log( "more data is:", moredata )

  var center = { lat: 29.760202, lng: -95.369835 };

  var mapOptions = {
    zoom: 10,
    scrollwheel: false,
    center: center
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
              content: `<h6><a href=https://www.google.com/search?q=${name} target="_blank">${name}</a></h6>`


            } );
            google.maps.event.addListener( marker, 'click', function () {
              infowindow.open( map, marker );
            } );
          }
        }
      } )( name ) );

    infoWindow = new google.maps.InfoWindow;


    if ( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition( function ( position ) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition( pos );
        infoWindow.setContent( 'You are here' );
        infoWindow.open( map );
        map.setCenter( pos );
      }, function () {
        handleLocationError( true, infoWindow, map.getCenter() );
      } );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError( false, infoWindow, map.getCenter() );
    }
  }


  function handleLocationError( browserHasGeolocation, infoWindow, pos ) {
    infoWindow.setPosition( pos );
    infoWindow.setContent( browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.' );
    infoWindow.open( map );
  }





} //end initMap


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
            `<li>On ${data[i].createdAt}, a user said, "${data[i].text}"</li>`
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



  $( "#submit-user-query" ).on( "click", function ( event ) {
    event.preventDefault();
    $( "#user-results" ).empty();
    var name = $( "#queried-user-input" ).val().trim();

    $.get( "/viewusers/" + name, function ( data ) {
      if ( data ) {
        console.log( data );

        for ( var i = 0; i < data.length; i++ ) {

          // var queriedName =
          //   `<div class="row">
          //   <div class="col s12 m6">
          //     <div class="card small">
          //       <div class="card-image">
          //         <img class="card-img" src="https://www.accueilanvers.org/wp-content/uploads/2018/04/1iydnsu7s91d9zwrnmqh.png.resize.710x399.png">
          //         <span class="card-title">${data[i].name}</span>
          //         <a class="btn-floating btn-large halfway-fab waves-effect waves-light submit-comment red" data-id=${data[i].id}><i class="material-icons">add</i></a>
          //       </div>
          //       <div class="card-content">
          //         <input placeholder="Add Comment" class="comment-input" type="text" class="validate">
          //       </div>
          //     </div>
          //   </div>
          // </div>`

          var queriedName =
            `<div class="col s12 m6">
            <h2 class="header">${data[i].name}</h2>
              <div class="card horizontal">
                <div class="card-image">
                  <img src="https://www.accueilanvers.org/wp-content/uploads/2018/04/1iydnsu7s91d9zwrnmqh.png.resize.710x399.png">
                </div>
              <div class="card-stacked">
                <div class="card-content">
                  <input placeholder="Add Comment" class="comment-input" type="text" class="validate">
                </div>
                <div class="card-action">
                  <a class="btn-floating btn-large halfway-fab waves-effect waves-light submit-comment red" data-id=${data[i].id}><i class="material-icons">add</i></a>
                </div>
              </div>
            </div>
          </div>`


          $( "#user-results" ).append( queriedName )

        }

      }

    } )
    $( "#queried-user-input" ).val( '' );

  } )

  $( document ).on( "click", ".submit-comment", function ( event ) {
    var text = $( ".comment-input" ).val().trim();
    var id = $( this ).attr( "data-id" );
    console.log( "text is:", text );
    console.log( "id is:", id );

    var newComment = {
      text: text,
      id: id
    }

    $( ".comment-input" ).val( '' );


    $.post( "/newcomment", newComment, function ( req, res ) {

    } )
  } )






} ); //end ready fx