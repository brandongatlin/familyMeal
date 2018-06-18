// Requiring path to so we can use relative routes to our HTML files
var path = require( "path" );
var db = require( "../models" );
var express = require( 'express' );
const router = express.Router();

const Sequelize = require( "sequelize" )
const Op = Sequelize.Op



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

    db.User.findAll( {
      where: {
        id: req.user.id
      },
      limit: 1

    } ).then( function ( user ) {

      let nameObj = {
        user: user
      }

      if ( user[ 0 ].member_type === "donor" ) {
        res.render( "dashboard", nameObj )
      } else {
        res.render( "shelters", nameObj )
      }

    } )

  } );

  app.get( "/members/viewdonations", isAuthenticated, function ( req, res ) {
    db.Donation.findAll( {
      include: [ { all: true } ],
      where: {
        claimed_by: null
      },
      order: [
              [ 'id', 'DESC' ]
          ]
    } ).then( function ( allDonations ) {
      // console.log( "all donations are :", allDonations );
      res.json( allDonations );

    } )
  } )

  app.put( "/claimdonation:id", function ( req, res ) {
    // console.log( "claim donation req.params are:", req.params );

    const now = new Date()

    let id = req.params.id

    db.Donation.findAll( {
      where: {
        id: id
      }
    } ).then( function ( oneDonation ) {
      console.log( "oneWholeDonation", oneDonation );
      console.log( "oneDonation", oneDonation[ 0 ].dataValues.claimed_by );

      if ( oneDonation[ 0 ].dataValues.claimed_by == null ) {
        db.Donation.update( {
          claimed_by: req.user.id,
          claimedAt: now,
        }, {
          where: {
            id: id
          }
        } )
      } else {
        db.Donation.update( {
          claimed_by: null,
          claimedAt: null,
        }, {
          where: {
            id: id
          }
        } )
      }
    } )




  } )

  app.put( "/orderOut:id", function ( req, res ) {
    // console.log( "claim donation req.params are:", req.params );

    const now = new Date()

    db.Donation.update( {
      driver_out: now,
    }, {
      where: {
        id: req.params.id
      }
    } )
  } )



  app.get( "/myclaims", function ( req, res ) {
    db.Donation.findAll( {
      include: [ { all: true } ],
      where: {
        claimed_by: req.user.id
      }
    } ).then( function ( myclaims ) {
      res.json( myclaims )
      console.log( "mycliams are:", myclaims );
    } )
  } )


  app.get( "/members/viewmap", isAuthenticated, function ( req, res ) {
    db.Donation.findAll( {
      include: [ { all: true } ],
      where: {
        claimed_by: null
      },
      order: [
              [ 'id', 'DESC' ]
          ]
    } ).then( function ( donationAddresses ) {
      // console.log( "all donationAddresses are :", donationAddresses );
      res.json( donationAddresses );

    } )
  } )

  app.get( "/members/viewcomments", isAuthenticated, function ( req, res ) {
    db.Comment.findAll( {
      where: {
        reader: req.user.id
      }
    } ).then( function ( userComments ) {
      // console.log( "user comments are:", userComments );

      res.json( userComments );

    } )
  } )

  app.get( "/viewusers/:name", function ( req, res ) {
    console.log( "req.params.name is:", req.params.name );
    db.User.findAll( {
      where: {
        name: {
          [ Op.like ]: '%' + req.params.name + '%'
        },
        id: {
          [ Op.not ]: req.user.id
        }
      }
    } ).then( function ( queriedUser ) {
      // console.log( "queried user is", queriedUser );
      res.json( queriedUser );
    } )
  } )

  app.post( "/newcomment", function ( req, res ) {
    // console.log( "new comment req.body is", req.body );

    db.Comment.create( {
      text: req.body.text,
      reader: req.body.id,
      writerId: req.user.id
    } ).then( function ( commentData ) {
      // console.log( "commentData" ), commentData;
    } )
  } )


  app.post( "/members/newdonation", isAuthenticated, function ( req, res ) {
    // console.log( "backend new donation req.body is:", req.body );
    db.Donation.create( {
      food_type: req.body.food_type,
      food_description: req.body.food_description,
      food_quantity: req.body.food_quantity,
      donatedById: req.user.id
    } ).then( function ( newDonation ) {
      // M.toast( { html: `Thanks for the ${req.body.food_type}!` } )

      // console.log( "backend newDonation is:", newDonation );
    } )
  } )

  // app.get("profile/update", function(req, res){
  //
  //   let hbsObj = {
  //
  //   }
  //   res.render("update", hbsObj);
  // })

}
