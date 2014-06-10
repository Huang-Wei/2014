// var dao = require('../dao');
var util = require('../util');

exports.showVoteResults = function(req, res, dao) {
  var user = req.session.user;
  if (user == null || user === '') {
    res.send("用户未登陆");
    return res.redirect('/user/login');
  }

  dao.getVoteItemsByUser(user, function(err, bet) {
    // bet为一个长度为64的空数组
    if (err) {
      console.log(err);
      return;
    }
    dao.getAllMatches(function(err, items) {
      if (err) {
        console.log(err);
        return;
      }

      var lastDate = null;
      items.forEach(function(item, index) {
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
        var score = bet.bet[index];
        if (score == null) {
          item["score1"] = "请竞猜";
          item["score2"] = "请竞猜";
        }
        else {
          item["score1"] = score.split(":")[0];
          item["score2"] = score.split(":")[1];
        }
      });
      res.render('bet', {items: items});
    });
  });
};

exports.vote = function(req, res, dao) {
  var result = {};

  var user = req.session.user;
  if (user == null || user === '') {
    result.msg = 'alert-warning';
    result.msg = '用户未登陆';
    return res.send(result);
  }

  var score1 = req.body.score1;
  var score2 = req.body.score2;
  var rowno = req.body.rowno;
  var matchTime = new Date(parseInt(req.body.matchTime));
  var thisTime = new Date();

  if (thisTime > matchTime) {
    result.msg = '亲，竞猜时间已过。改系统时间什么的就不太好了吧：）';
    result.css = 'alert-warning';
    return res.send(result); // 可能是用户在改系统时间...
  }

  dao.vote(user, score1+":"+score2, rowno, function(err) {
    if (err) {
      result.msg = '竞猜比分失败:' + err;
      result.css = 'alert-danger';
      return res.send(result);
    }
    result.msg = '竞猜比分成功';
    result.css = 'alert-success';
    res.send(result);
  });
};

exports.voteAll = function(req, res, dao) {
  var result = {};

  var user = req.session.user;
  if (user == null || user === '') {
    result.msg = 'alert-warning';
    result.msg = '用户未登陆';
    return res.send(result);
  }

  var update = req.body.update;

  dao.voteAll(user, update, function(err) {
    if (err) {
      result.msg = '批量竞猜比分失败:' + err;
      result.css = 'alert-danger';
      return res.send(result);
    }
    result.msg = '批量竞猜比分成功';
    result.css = 'alert-success';
    res.send(result);
  });
};