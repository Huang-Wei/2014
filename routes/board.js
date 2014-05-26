var mongo = require('../mongo');

exports.index = function(req, res) {
  mongo.getBoard(function(err, items) {
    // 排序
    items.sort(function(item1, item2) {
      if (item1.betscore < item2.betscore)
        return 1;
      else if (item1.betscore > item2.betscore)
        return -1;
      else
        return 0;
    })
    res.render('board', {items:items});
  }) 
}