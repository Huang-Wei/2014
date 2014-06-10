// var dao = require('../dao');
var util = require('../util');
var key = require('../db/key');
var SHA1 = require('../db/sha1').SHA1;

function getIndexInArray(dataPoints, bet) {
  for (var i = 0; i < dataPoints.length; i++) {
    if (dataPoints[i].label === bet)
      return i;
  }
  return null;
};

exports.showBetItemsByMatch = function(req, res, dao) {
  var no = parseInt(req.params.no); // match number

  dao.getBetItemsByMatch(no, function(err, items, match) {
    if (err) {
      console.log(err);
      return;
    }
    // 重新组织数据
    var dataPoints = [];
    items.forEach(function(item) {
      var bet = item.bet[0] == null ? '未竞猜' : item.bet[0];

      var index = getIndexInArray(dataPoints, bet);

      if (index != null) {
        dataPoints[index].y++;
        dataPoints[index].name.push(item.showname);
      }
      else {
        var data = {};
        data.label = bet;
        data.y = 1;
        data.name = new Array(item.showname);
        // data.x = (dataPoints.length+1)*10
        dataPoints.push(data);
      }
    });

    res.render('chart', {
      // items: items,
      dataPoints: JSON.stringify(dataPoints),
      match: match});
  });
};

// 用于接收curl命令更新某场比赛比分
// curl -X POST http://localhost:3000/match -d 'no=1&score=3:0'
exports.updateScore = function(req, res, dao) {
  var keycode = req.body.key; // 验证
  if (keycode == null || SHA1(keycode) !== key)
    return res.send("无权限");
  
  var no = parseInt(req.body.no);
  var score = req.body.score;

  dao.updateMatchScore(no, score, function(err, updateno) {
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

exports.showCalendar = function(req, res, dao) {
  dao.getAllMatches(function(err, items) {
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

// admin use
exports.insertMatch = function(req, res, dao) {
  var keycode = req.body.key; // 验证
  if (keycode == null || SHA1(keycode) !== key)
    return res.send("无权限");

  var match = req.body.match;

  dao.insertMatch(match, function(err, result) {
    res.send({err: err, result: result});
  });
};

exports.createIndex = function(req, res, dao) {
  var keycode = req.body.key; // 验证
  if (keycode == null || SHA1(keycode) !== key)
    return res.send("无权限");

  var col = req.body.col;
  var index = req.body.index;
  var options = req.body.options;

  dao.createIndex(col, index, options, function(err, indexname) {
    res.send({err: err, indexname: indexname});
  });
};