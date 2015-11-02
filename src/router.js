var ctrl = require('./controllers');
var mid = require('./middleware');

var router = function(app) {
  app.get('/login',
          mid.requiresSecure,
          mid.requiresLogout,
          ctrl.Account.loginPage);
  app.post('/login',
          mid.requiresSecure,
          mid.requiresLogout,
          ctrl.Account.login);
  app.get('/signup',
          mid.requiresSecure,
          mid.requiresLogout,
          ctrl.Account.signupPage);
  app.post('/signup',
          mid.requiresSecure,
          mid.requiresLogout,
          ctrl.Account.signup);
  app.get('/logout',
          mid.requiresLogin,
          ctrl.Account.logout);
  app.get('/maker',
          mid.requiresLogin,
          ctrl.Domo.makerPage);
  // app.delete('/maker',
  //         mid.requiresLogin,
  //         ctrl.Domo.destroyDomo);
  app.post('/maker',
          mid.requiresLogin,
          ctrl.Domo.make);
  app.get('/',
          mid.requiresSecure,
          mid.requiresLogout,
          ctrl.Account.loginPage);
};

module.exports = router;
