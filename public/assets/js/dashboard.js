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

            var image = {
              url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
              size: new google.maps.Size( 20, 32 ),
              // The origin for this image is (0, 0).
              origin: new google.maps.Point( 0, 0 ),
              // The anchor for this image is the base of the flagpole at (0, 32).
              anchor: new google.maps.Point( 0, 32 )
            }
            var marker = new google.maps.Marker( {
              map: map,
              position: results[ 0 ].geometry.location,
              animation: google.maps.Animation.DROP,
              icon: image
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
        // console.log( data );

        // console.log( "address of first donation is", data[ 0 ].donated_by.address );
        $( "#donations-list" ).empty();

        for ( var i = 0; i < data.length; i++ ) {


          var id = data[ i ].id;
          var dates = moment( data[ i ].createdAt ).format( "dddd, MMMM, Do, YYYY, h:mm a" );
          var addresses = data[ i ].donated_by.address;
          var q = data[ i ].food_quantity;

          $( "#donations-list" ).prepend(
            `<div class="row">
                <div class="col s2">
                  ${dates}
                </div>
                <div class="col s3">
                  ${data[i].food_type}, ${data[i].food_description}
                </div>
                <div class="col s1">
                  ${q}
                </div>
                <div class="col s4">
                  ${addresses}
                </div>
                <div class="col s2">
                  <label>
                    <input class="claim-checkbox" data-id = ${id} type="checkbox" />
                    <span>Claim</span>
                  </label>
                </div>
              </div>`
          )

        } //end loop

      }
    } )
  } )

  $( document ).on( "click", ".claim-checkbox", function () {
    var id = $( this ).attr( "data-id" );
    console.log( "button clicked and id is:", id );

    $.ajax( {
      url: '/claimdonation' + id,
      type: 'PUT',
      success: function ( data ) {}
    } );

    const commentToast = `You've claimed a donation!`
    M.toast( { html: commentToast, classes: "toasts" } )

  } );

  $( document ).on( "click", "#my-claims", function () {
    console.log( "my-claims clicked" );
    $( "#my-claims-list" ).empty();

    $.get( "/myclaims", function ( data ) {
      console.log( data );
      if ( data ) {
        for ( var i = 0; i < data.length; i++ ) {

          var posted = moment( data[ i ].createdAt ).format( "dddd, MMMM, Do, YYYY, h:mm a" )
          var claimed = moment( data[ i ].claimedAt ).format( "dddd, MMMM, Do, YYYY, h:mm a" )
          var food = data[ i ].food_type;
          var q = data[ i ].food_quantity;
          var location = data[ i ].donated_by.address;
          var id = data[ i ].id

          $( "#my-claims-list" ).append(
            `<div class="row"><div class="col s2">${posted}</div><div class="col s2">${claimed}</div><div class="col s3">${food}</div><div class="col s1">${q}</div><div class="col s3">${location}</div><div class="col s1"><label>
              <input class="omw-checkbox" data-id = ${id} type="checkbox" />
              <span>OMW!</span>
            </label></div></div>`
          )
        }
      }

    } )

  } )


  $( document ).on( "click", ".omw-checkbox", function () {
    var id = $( this ).attr( "data-id" );
    console.log( "button clicked and id is:", id );

    $.ajax( {
      url: '/orderOut' + id,
      type: 'PUT',
      // data: "name=John&location=Boston",
      success: function ( data ) {
        alert( 'Load was performed.' );
      }
    } );

    const commentToast = `Get on the road!`
    M.toast( { html: commentToast, classes: "toasts" } )

  } );



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

          var dates = moment( data[ i ].createdAt ).format( "dddd, MMMM, Do, YYYY, h:mm a" )
          $( "#comments-list" ).prepend(
            `<li>On ${dates}, a user said, "${data[i].text}"</li>`
          )
        }
      }
    } )
  } )

  //this is to format the createdAt datetimes out of js time
  // var dates = moment( res[ i ].createdAt ).format( "dddd, MMMM Do YYYY, h:mm a" );


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

          var queriedName =
            `<div class="col s12 m6">
            <h2 class="header">${data[i].name}</h2>
              <div class="card horizontal">
                <div class="card-image">
                  <img src=${data[i].image}>
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
    // console.log( "text is:", text );
    // console.log( "id is:", id );

    var newComment = {
      text: text,
      id: id
    }

    $( ".comment-input" ).val( '' );

    const commentToast = `Thanks for the feedback!`
    M.toast( { html: commentToast, classes: "toasts" } )

    $.post( "/newcomment", newComment, function ( req, res ) {

    } )
  } )






} ); //end ready fx