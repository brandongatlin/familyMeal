const express = require( "express" );
const router = express.Router();
// Requiring path to so we can use relative routes to our HTML files
var path = require( "path" );
var db = require( "../models" );


// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require( "../config/middleware/isAuthenticated" );

module.exports = function ( app ) {

  app.get( "/", function ( req, res ) {
    // If the user already has an account send them to the members page
    if ( req.user ) {
      res.redirect( "/dashboard" );
    }
    res.sendFile( path.join( __dirname, "../views/index.html" ) );
  } );

  app.get( "/login", function ( req, res ) {
    // If the user already has an account send them to the members page
    if ( req.user ) {
      res.redirect( "/dashboard" );
    }
    res.sendFile( path.join( __dirname, "../views/login.html" ) );
  } );

  app.get( "/dashboard", function ( req, res ) {
    res.sendFile( path.join( __dirname, "../views/dashboard.html" ) );
  } )

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get( "/dashboard/comments", isAuthenticated, function ( req, res ) {
    console.log( "req.user.id is:", req.user.id );

    db.Comment.findAll( {
      where: {
        UserId: req.user.id
      }
    } ).then( function ( userComments ) {
      console.log( userComments );
      res.json( userComments );


    } ).catch( function ( err ) {

      res.json( err );
    } );

  } ) //end get/dashboard

  app.get( "/profile", isAuthenticated, function ( req, res ) {
    res.sendFile( path.join( __dirname, "../views/profile.html" ) );
  } )

  // app.get( "/members/recentcomments", function ( req, res ) {
  //   console.log( "req.user.email is:", req.user.email );
  //
  //   db.Comment.findAll( {
  //       where: { reviewee: req.user.id }
  //
  //     } ).then( function ( dbComments ) {
  //
  //       res.json( dbComments )
  //       console.log( "dbComments is:", dbComments );
  //
  //     } )
  //     .catch( function ( err ) {
  //
  //       res.json( err );
  //     } );
  //
  // } )

  // dashboard routes
  // app.get( "/dashboard", isAuthenticated, function ( req, res ) {
  //   res.sendFile( path.join( __dirname, "../views/dashboard.html" ) );
  //   console.log( "dashboard file served" );
  // } );


};