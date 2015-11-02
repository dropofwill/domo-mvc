var _ = require('lodash');
var models = require('../models');

var Domo = models.Domo;

var makerPage = function(req, res) {
  Domo.DomoModel.findByOwner(req.session.account._id, function(err, doc) {
    if (err) {
      console.error(err);
      return res.status(400).json({error: 'An error occurred'});
    }

    console.dir(doc);

    res.render('app', {csrfToken: req.csrfToken(), domos: doc});
  });
};

var make = function(req, res) {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({error: 'Both name and age are required'});
  }

  new Domo.DomoModel({
    name: req.body.name,
    age: req.body.age,
    hp: req.body.hp,
    owner: req.session.account._id,
  })
  .save(function(err) {
    if (err) {
      console.error(err);
      return res.status(400).json({error: 'An error occured'});
    }

    res.json({redirect: '/maker'});
  });
};

module.exports.makerPage = makerPage;
module.exports.make = make;
