var mongo = require('../mongo');
var util = require('../util');

exports.index = function(req, res) {
  mongo.getAllMatches(function(err, items) {
    if (err) {
      console.log(err);
      return;
    }
    items.forEach(function(item) {
      var time = util.getLocalTime(item.time, 8);
      item.showDate = time[0];
      item.showTime = time[1];

      if (item.score == null) {
        item.score1 = item.score2 = '-';
      }
      else {
        item.score1 = item.score.split(':')[0];
        item.score2 = item.score.split(':')[1];
      }
    });
    res.render('index', {items: items});
  });
};