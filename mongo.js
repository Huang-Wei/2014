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
};

// 返回某场比赛竞猜结果
function getBetItemsByMatch(no, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) return callback(err);
    db.collection('bet').find({}, {_id:0, user:1, showname:1, bet: {$slice: [no-1,no]}}).toArray(function(err, items) {
      // console.log("items="+items);
      if (err) {
        db.close();
        return callback(err, items);
      }
      db.collection('match').find({no: no}).toArray(function(err, matches) {
        callback(err, items, matches[0]);
        db.close();
      });
    });
  });
};

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
};

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
};

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
        var cbCheck = 0;
        (function() {
          items.forEach(function(item, index) {
            cbCheck++;
            collection.update({user: item.user}, {$inc: util.getBetResult(score, item.bet[0])}, function(err, item) {
              console.log("计算每人竞猜得分："+item);
              if (err) callback(err);
              if (cbCheck == items.length) {
                callback("全部计算完毕");
                db.close();
              }
            });
          });
        })();
        
      });

      // callback("提前退出");
      // db.close();
    });
  });
};

// 积分榜
exports.getBoard = function(query, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) return callback(err);
    // top 10
    if (query == null) {
      db.collection('bet').find({}, {_id:0, bet:0}).sort({betscore:-1}).limit(10).toArray(function(err, items) {
        callback(err, items);
        db.close();
      });
    }
    // 圈子积分榜
    else {
      db.collection('bet').find(query, {_id:0, bet:0}).sort({betscore:-1}).toArray(function(err, items) {
        callback(err, items);
        db.close();
      });
    }
  });
};

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
};

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
};

// 我的圈子：当前用户的圈子 > 所有圈子的信息
exports.getMyCircles = function(user, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) return callback(err);
    db.collection('user').find({user: user}, {circle: 1}).nextObject(function(err, item) {
      if (err) {
        db.close();
        return callback(err);
      }
      console.log("User Circle item="+item);
      
      db.collection('circle').find({name: {$in: item.circle}}).toArray(function(err, items) {
        callback(err, items);
        db.close();
      })
    });
  });
};

// 圈子的所有用户
exports.getUsersByCircle = function(name, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) return callback(err);
    db.collection('user').find({circle: name}, {user: 1}).toArray(function(err, users) {
      callback(err, users);
      db.close();
    });
  });
};

// 创建圈子by name
exports.createCircleByName = function(circle, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) return callback(err);
    db.collection('circle').insert(circle, function(err, item) {
      if (err) {
        db.close();
        return callback(err);
      }

      // 在user表中加入创建者信息
      var update = {
        $push: {
          circle: circle.name,
          circleAdmin: circle.name
        }
      };
      db.collection('user').update({user: circle.owner}, update, function(err, item) {
        console.log("user circle item = " + item);
        callback(err, item);
        db.close();
      });
    });
  });
};

// 用户加入circle
exports.joinCircle = function(user, circleName, callback) {
  // TODO: 用户最多只能加入5个圈子?
  MongoClient.connect(url, function(err, db) {
    if (err) return callback(err);
    db.collection('user').update({user: user}, {$push: {circle: circleName}}, function(err, item) {
      callback(err, item);
      db.close();
    });
  });
};

// 用户退出circle
exports.quitCircle = function(user, circleName, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) return callback(err);
    db.collection('user').update({user: user}, {$pull: {circle: circleName}}, function(err, item) {
      callback(err, item);
      db.close();
    });
  });
};

// 解散circle
exports.discardCircle = function(user, circleName, callback) {
  MongoClient.connect(url, function(err, db) {
    if (err) return callback(err);
    db.collection('circle').remove({owner:user, name:circleName}, function(err, item) {
      if (err || item == 0) { // 只有圈子的owner才能删除此圈子
        db.close();
        return callback(err, item);
      }

      // 删除 user 表中的信息
      var collection = db.collection('user');
      collection.update({}, {$pull: {circle: circleName}}, {w:1, multi:true}, function(err, items) {
        // callback(err, items);
        collection.update({user:user}, {$pull: {circleAdmin: circleName}}, function(err, items) {
          callback(err, items);
          db.close();
        });
      });
    });
  });
};

exports.getCirclesByUser = function(user, callback) {
  MongoClient.connect(url, function(err, db) {
    db.collection('user').find({user: user}, {circle:1}).nextObject(function(err, item) {
      callback(err, item);
      db.close();
    });
  });
};

exports.getBetItemsByMatch = getBetItemsByMatch;