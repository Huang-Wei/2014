var mongo = require('../mongo');

exports.index = function(req, res) {
  mongo.getAllMatches(function(err, items) {
    if (err) {
      console.log(err);
      return;
    }
    res.render('index', {items: items, user: req.session.user});
  });
};