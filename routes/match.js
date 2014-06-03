var mongo = require('../mongo');
var util = require('../util');

exports.showBetItemsByMatch = function(req, res) {
  var no = parseInt(req.params.no); // match number

  mongo.getBetItemsByMatch(no, function(err, items) {
    if (err) {
      console.log(err);
      return;
    }
    res.render('match', {
      items: items,
      no: no});
  });
};

// 用于接收curl命令更新某场比赛比分
// curl -X POST http://localhost:3000/match -d 'no=1&score=3:0'
exports.updateScore = function(req, res) {
  // TODO：验证用户名密码
  
  var no = parseInt(req.body.no);
  var score = req.body.score;

  mongo.updateMatchScore(no, score, function(err, updateno) {
    console.log(err);
    var result = {}
    if (err) {
      result.msg = err;
      res.send(result);
      // return;
    }
    else if (updateno === 0) {
      result.msg = "更新比分失败";
      res.send(result);
      // return;
    }
    result.msg = "更新比分成功";
    res.send(result);
  });
};

exports.showCalendar = function(req, res) {
  mongo.getAllMatches(function(err, items) {
    if (err) {
      console.log(err);
      return;
    }

    var lastDate = null;
    items.forEach(function(item) {
      // pretty time
      var time = util.getLocalTime(item.time, 8);
      item.showDate = time[0];
      item.showTime = time[1];

      if (lastDate != time[0]) {
        lastDate = time[0];
      }
      else {
        item.hideDate = true;
      }

      // pretty score
      if (item.score == null) {
        item.score1 = item.score2 = '-';
      }
      else {
        item.score1 = item.score.split(':')[0];
        item.score2 = item.score.split(':')[1];
      }
    });
    res.render('calendar', {items: items});
  });
};
