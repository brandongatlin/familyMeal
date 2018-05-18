$( document ).ready( function () {
  // Getting references to our form and input
  $( 'select' ).formSelect();
  var signUpForm = $( "#sign-up-form" );
  var emailInput = $( "#email" );
  var passwordInput = $( "#password" );
  var firstInput = $( "#first_name" );
  var lastInput = $( "#last_name" );
  var streetInput = $( "#street_address" );
  var cityInput = $( "#city" );
  var stateInput = $( "#state" );
  var zipInput = $( "#zip" );

  var address;
  var name;



  // When the signup button is clicked, we validate the email and password are not blank


  $( "#sign-up-submit" ).on( "click", function ( event ) {
    console.log( "signup submitted" );
    event.preventDefault();

    var first_name = firstInput.val().trim();
    var last_name = lastInput.val().trim();
    name = `${first_name} ${last_name}`

    var street_address = streetInput.val().trim();
    var city = cityInput.val().trim();
    var state = stateInput.val().trim();
    var zip = zipInput.val().trim();

    address = `${street_address} ${city} ${state} ${zip}`

    var phone = $( "#phone" ).val().trim();

    var member_type = $( '#member_type' ).val().trim();

    console.log( "member type is:", member_type )


    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      name: name,
      address: address,
      phone: phone,
      member_type: member_type
    };

    console.log( userData );

    console.log( 'form submitted' );


    if ( !userData.email || !userData.password ) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser( userData.email, userData.password, userData.name, userData.address, userData.phone, userData.member_type );
    emailInput.val( "" );
    passwordInput.val( "" );
  } )


  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser( email, password, name, address, phone, member_type ) {
    $.post( "/api/signup", {
      email: email,
      password: password,
      name: name,
      address: address,
      phone: phone,
      member_type: member_type
    } ).then( function ( data ) {
      window.location.replace( data );
      // If there's an error, handle it by throwing up a boostrap alert
    } ).catch( handleLoginErr );
  }

  function handleLoginErr( err ) {
    $( "#alert .msg" ).text( err.responseJSON );
    $( "#alert" ).fadeIn( 500 );
  }
} );