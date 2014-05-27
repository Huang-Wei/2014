var mongo = require('../mongo');

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
