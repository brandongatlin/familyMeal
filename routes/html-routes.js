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
      res.redirect( "/members" );
    }
    res.sendFile( path.join( __dirname, "../public/signup.html" ) );
  } );

  app.get( "/login", function ( req, res ) {
    // If the user already has an account send them to the members page
    if ( req.user ) {
      res.redirect( "/members" );
    }
    res.sendFile( path.join( __dirname, "../public/login.html" ) );
  } );

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get( "/members", isAuthenticated, function ( req, res ) {
    res.sendFile( path.join( __dirname, "../public/members.html" ) );
    console.log( "req.user.id is:", req.user.id );


  } ); //end get/members

  app.get( "/members/recentcomments", function ( req, res ) {
    console.log( "req.user.email is:", req.user.email );

    db.Comment.findAll( {
        where: { reviewee: req.user.id }

      } ).then( function ( dbComments ) {

        res.json( dbComments )
        console.log( "dbComments is:", dbComments );

      } )
      .catch( function ( err ) {

        res.json( err );
      } );

  } )

  // dashboard routes
  app.get( "/dashboard", isAuthenticated, function ( req, res ) {
    res.sendFile( path.join( __dirname, "../views/dashboard.html" ) );
    console.log( "dashboard file served" );
  } );


};