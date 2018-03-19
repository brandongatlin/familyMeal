// setting up routes for authorization
const authController = require('../controllers/authcontroller.js');

module.exports = function (app, passport) {
  app.get('/registration', authController.signup);
  app.get('/login', authController.signin);

  // add route for posting to signup (registration page)
  app.post('/registration', passport.authenticate('local-signup', {
    failureRedirect: '/registration'
  }), function (req, res) {
    res.redirect('/dashboard/' + req.session.passport.user); // gets user info
  });

  // custom middleware to protect dashboard to users not logged in
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      console.log('user isLoggedIn and Authenticated');
      return next();
    } else {
      console.log('user is not isLoggedIn not Authenticated');
      res.redirect('/login');
    }
  };

  // add route for getting user page
  app.get('/dashboard/:id?', isLoggedIn, authController.dashboard); // original route /dashboard, which protects
  // add route to log user out
  app.get('/logout', authController.logout);

  // add route for posting to signin page
  app.post('/login', passport.authenticate('local-signin', {
    failureRedirect: '/login'
  }), function (req, res) {
    res.redirect('/dashboard/' + req.session.passport.user); // gets user info
  });

}
