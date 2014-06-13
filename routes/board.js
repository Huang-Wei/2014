// var dao = require('../dao');

exports.index = function(req, res, dao) {
  dao.getBoard(null, function(err, items) {
    if (items == null || items.length == 0)
      return res.render('board', {items: {}});

    var cbCheck = 0;
    items.forEach(function(item) {
      (function() {
        dao.getCirclesByUser(item.user, function(err, circle) {
          item.circle = circle.circle;

          if (++cbCheck == items.length)
            res.render('board', {items:items});
        });
      })();
    });
  });
};