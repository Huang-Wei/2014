var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/2014';
var util = require('./util');

// 返回所有比赛的比赛结果
exports.getAllMatches = function(callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) return callback(err);
    // 按比赛序号升序排序
    db.collection('match').find().sort({no:1}).toArray(function(err, items) {
      // console.log("items="+items);
      callback(err, items);
      db.close();
    });
  });
}

// 返回某场比赛竞猜结果
var getBetItemsByMatch = function(no, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) return callback(err);
    db.collection('bet').find({}, {_id:0, user:1, bet: {$slice: [no-1,no]}}).toArray(function(err, items) {
      // console.log("items="+items);
      callback(err, items);
      db.close();
    });
  });
}

// 返回某人的所有投票结果
exports.getVoteItemsByUser = function(user, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) return callback(err);
    db.collection('bet').find({user: user}, {_id:0, bet:1}).nextObject(function(err, items) {
      // console.log("items="+items);
      callback(err, items);
      db.close();
    });
  });
}

// 更新投票结果
exports.vote = function(user, score, index, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) return callback(err);
    // 更新数组里的某个值
    var update = {};
    update['bet.' + index] = score;
    db.collection('bet').update({user: user}, {$set: update}, function(err, updateno) {
      console.log("更新投票结果 updateno="+updateno);
      callback(err, updateno);
      db.close();
    });
  });
}

// 1)更新比赛结果
// 2)自动计算每人的竞猜得分
exports.updateMatchScore = function(no, score, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) return callback(err);
    // 1)更新比赛结果
    db.collection('match').update({no: no}, {$set: {score: score}}, function(err, updateno) {
      console.log("更新比赛结果"+updateno);
      if (err || updateno === 0) {
        db.close();
        return callback(err, updateno);
      }

      // 2)自动计算每人的竞猜得分
      var collection = db.collection('bet');

      getBetItemsByMatch(no, function(err, items) {
        if (err) return callback(err);
        items.forEach(function(item, index) {
          collection.update({user: item.user}, {$inc: util.getBetResult(score, item.bet[0])}, function(err, item) {
            console.log("计算每人竞猜得分："+item);
            if (err) callback(err);
          });
        });
      });

      callback(null);
      db.close();
    });
  });
}

// 积分榜
exports.getBoard = function(callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) return callback(err);
    db.collection('bet').find({}, {_id:0, bet:0}).toArray(function(err, items) {
      callback(err, items);
      db.close();
    });
  });
}

// 登录
exports.getUserByName = function(user, password, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) return callback(err);
    db.collection('user').find({user: user}, {_id:0}).nextObject(function(err, item) {
      console.log("登录 item="+item);
      callback(err, item);
      db.close();
    });
  });
}

// 注册
exports.addUser = function(user, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) return callback(err);
    db.collection('user').insert(user, function(err, item) {
      if (err) {
        db.close();
        return callback(err);
      }
      console.log("添加用户 item="+item);

      var bet = {
        user: user.user,
        showname: user.showname,
        bet: new Array(64)
      };
      db.collection('bet').insert(bet, function(err, item) {
        console.log("添加用户bet纪录 item="+item);
        callback(err, item);
        db.close();
      });
    });
  });
}

exports.getBetItemsByMatch = getBetItemsByMatch;