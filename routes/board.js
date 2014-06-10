// var dao = require('../dao');

exports.index = function(req, res, dao) {
  dao.getBoard(null, function(err, items) {
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
        dao.getCirclesByUser(item.user, function(err, circle) {
          item.circle = circle.circle;

          if (++cbCheck == items.length)
            res.render('board', {items:items});
        });
      })();
    });
  });
};