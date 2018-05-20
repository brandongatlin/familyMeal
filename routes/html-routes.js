// Requiring path to so we can use relative routes to our HTML files
var path = require( "path" );
var db = require( "../models" );
var express = require( 'express' );
const router = express.Router();



// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require( "../config/middleware/isAuthenticated" );

module.exports = function ( app ) {

  app.get( "/", function ( req, res ) {
    // If the user already has an account send them to the members page
    if ( req.user ) {
      res.redirect( "/members" );
    }
    // res.sendFile( path.join( __dirname, "../views/index.html" ) );
    res.render( "index" )
  } );

  app.get( "/login", function ( req, res ) {
    // If the user already has an account send them to the members page
    if ( req.user ) {
      res.redirect( "/members" );
    }
    // res.sendFile( path.join( __dirname, "../views/login.html" ) );
    res.render( "login" )
  } );

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get( "/members", isAuthenticated, function ( req, res ) {

    db.Comment.findAll( {
      where: {
        UserId: req.user.id
      }
    } ).then( function ( userComments ) {
      console.log( "user comments are:", userComments );

      let hbsObj = {
        userComments: userComments
      }

      res.render( "dashboard", hbsObj );


    } ).catch( function ( err ) {

      res.json( err );
    } );



  } );


  app.get( "/members/mycomments", isAuthenticated, function ( req, res ) {
    db.Comment.findAll( {
      where: {
        UserId: req.user.id
      }
    } ).then( function ( userComments ) {
      console.log( "user comments are:", userComments );
      res.json( userComments );


    } ).catch( function ( err ) {

      res.json( err );
    } );
  } );



  app.post( "/members/newdonation", isAuthenticated, function ( req, res ) {
    console.log( "backend new donation req.body is:", req.body );
    db.Donation.create( {
      food_type: req.body.food_type,
      food_description: req.body.food_description,
      food_quantity: req.body.food_quantity,
      donatedById: req.user.id
    } ).then( function ( newDonation ) {
      console.log( "backend newDonation is:", newDonation );
    } )
  } )







  // function searchComments( isAuthenticated, req, res ) {
  //   console.log( "fx search comments" );
  //   db.Comment.findAll( {
  //     where: {
  //       UserId: req.user.id
  //     }
  //   } ).then( function ( userComments ) {
  //     console.log( "user comments are:", userComments );
  //     // res.json( userComments );
  //
  //
  //   } ).catch( function ( err ) {
  //
  //     res.json( err );
  //   } );
  // }




}; //end module.exports


// const express = require( "express" );
// const router = express.Router();
// // Requiring path to so we can use relative routes to our HTML files
// var path = require( "path" );
// var db = require( "../models" );
//
//
// // Requiring our custom middleware for checking if a user is logged in
// var isAuthenticated = require( "../config/middleware/isAuthenticated" );
//
// module.exports = function ( app ) {
//
//   app.get( "/", function ( req, res ) {
//     // If the user already has an account send them to the members page
//     if ( req.user ) {
//       res.redirect( "/dashboard" );
//     }
//     res.sendFile( path.join( __dirname, "../views/index.html" ) );
//   } );
//
//   app.get( "/login", function ( req, res ) {
//     // If the user already has an account send them to the members page
//     if ( req.user ) {
//       res.redirect( "/dashboard" );
//     }
//     res.sendFile( path.join( __dirname, "../views/login.html" ) );
//   } );
//
//   app.get( "/dashboard", function ( req, res ) {
//     res.sendFile( path.join( __dirname, "../views/dashboard.html" ) );
//   } )
//
//   // Here we've add our isAuthenticated middleware to this route.
//   // If a user who is not logged in tries to access this route they will be redirected to the signup page
//   app.get( "/dashboard/comments", isAuthenticated, function ( req, res ) {
//     console.log( "req.user.id is:", req.user.id );
//
//     db.Comment.findAll( {
//       where: {
//         UserId: req.user.id
//       }
//     } ).then( function ( userComments ) {
//       console.log( userComments );
//       res.json( userComments );
//
//
//     } ).catch( function ( err ) {
//
//       res.json( err );
//     } );
//
//   } ) //end get/dashboard
//
//   app.get( "/comments", isAuthenticated, function ( req, res ) {
//     // res.sendFile( path.join( __dirname, "../views/comments.html" ) );
//   } )
//
//
//
//
//
//
// };