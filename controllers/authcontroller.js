// set up controller for routes
var exports = module.exports = {}

exports.signup = function ( req, res ) {
  res.render( 'registration' );
}

exports.signin = function ( req, res ) {
  res.render( 'login' );
}

exports.dashboard = function ( req, res ) {
  res.render( 'dashboard' );
}

exports.logout = function ( req, res ) {
  req.session.destroy( function ( err ) {
    res.redirect( '/' );
  } );
}