var mongo = require('../mongo');

exports.index = function(req, res) {
  mongo.getBoard(null, function(err, items) {
    if (items == null || items.length == 0)
      return res.render('board', {items: {}});

    // 排序
    // items.sort(function(item1, item2) {
    //   if (item1.betscore < item2.betscore)
    //     return 1;
    //   else if (item1.betscore > item2.betscore)
    //     return -1;
    //   else
    //     return 0;
    // });

    var cbCheck = 0;
    items.forEach(function(item) {
      (function() {
        mongo.getCirclesByUser(item.user, function(err, circle) {
          item.circle = circle.circle;

          if (++cbCheck == items.length)
            res.render('board', {items:items});
        });
      })();
    });
  });
};