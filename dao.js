// var MongoClient = require('mongodb').MongoClient;
var util = require('./util');
var url = util.getURL();
// var url = 'mongodb://localhost:27017/2014';

function dao(db) {
  // 返回所有比赛的比赛结果
  function getAllMatches(callback) {
    // 按比赛序号升序排序
    db.collection('match').find().sort({no:1}).toArray(function(err, items) {
      callback(err, items);
    });
  };

  // 返回某场比赛竞猜结果
  function getBetItemsByMatch(no, callback) {
    db.collection('bet').find({}, {_id:0, user:1, showname:1, bet: {$slice: [no-1,no]}}).toArray(function(err, items) {
      // console.log("items="+items);
      if (err) {
        return callback(err, items);
      }
      db.collection('match').find({no: no}).toArray(function(err, matches) {
        callback(err, items, matches[0]);
      });
    });
  };

  // 返回某人的所有投票结果
  function getVoteItemsByUser(user, callback) {
    db.collection('bet').find({user: user}, {_id:0, bet:1}).nextObject(function(err, items) {
      callback(err, items);
    });
  };

  // 更新投票结果
  function vote(user, score, index, callback) {
    // 更新数组里的某个值
    var update = {};
    update['bet.' + index] = score;
    db.collection('bet').update({user: user}, {$set: update}, function(err, updateno) {
      console.log("更新投票结果 updateno="+updateno);
      callback(err, updateno);
    });
  };

  // 批量更新投票结果
  function voteAll(user, update, callback) {
    db.collection('bet').update({user: user}, {$set: update}, function(err, updateno) {
      console.log("批量更新投票结果 updateno="+updateno);
      callback(err, updateno);
    });
  };

  // 1)更新比赛结果
  // 2)自动计算每人的竞猜得分
  function updateMatchScore(no, score, callback) {
    // 1)更新比赛结果
    db.collection('match').update({no: no}, {$set: {score: score}}, function(err, updateno) {
      console.log("更新比赛结果"+updateno);
      if (err || updateno === 0) {
        return callback(err, updateno);
      }

      // 2)自动计算每人的竞猜得分
      var collection = db.collection('bet');

      getBetItemsByMatch(no, function(err, items) {
        if (err) return callback(err);
        if (items.length == 0)
          return callback("无人投票");

        var cbCheck = 0;
        (function() {
          items.forEach(function(item, index) {
            cbCheck++;
            collection.update({user: item.user}, {$inc: util.getBetResult(score, item.bet[0])}, function(err, item) {
              console.log("计算每人竞猜得分："+item);
              if (err) callback(err);
              if (cbCheck == items.length) {
                callback("全部计算完毕");
              }
            });
          });
        })();
      });
    });
  };

  // 积分榜
  function getBoard(query, callback) {
    // top 10
    if (query == null) {
      //remove limit(10)
      db.collection('bet').find({}, {_id:0, bet:0}).sort({betscore:-1}).toArray(function(err, items) {
        callback(err, items);
      });
    }
    // 圈子积分榜
    else {
      db.collection('bet').find(query, {_id:0, bet:0}).sort({betscore:-1}).toArray(function(err, items) {
        callback(err, items);
      });
    }
  };

  // 登录
  function getUserByName(user, password, callback) {
    db.collection('user').find({user: user}, {_id:0}).nextObject(function(err, item) {
      console.log("登录 item="+item);
      callback(err, item);
    });
  };

  // 注册
  function addUser(user, callback) {
    db.collection('user').insert(user, function(err, item) {
      if (err) {
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
      });
    });
  };

  // 我的圈子：当前用户的圈子 > 所有圈子的信息
  function getMyCircles(user, callback) {
    db.collection('user').find({user: user}, {circle: 1}).nextObject(function(err, item) {
      if (err || item.circle == null) {
        return callback(err, null);
      }
      console.log("User Circle item="+item);
      
      db.collection('circle').find({name: {$in: item.circle}}).toArray(function(err, items) {
        callback(err, items);
      })
    });
  };

  // 圈子的所有用户
  function getUsersByCircle(name, callback) {
    db.collection('user').find({circle: name}, {user: 1}).toArray(function(err, users) {
      callback(err, users);
    });
  };

  // 创建圈子by name
  function createCircleByName(circle, callback) {
    db.collection('circle').insert(circle, function(err, item) {
      if (err) {
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
      });
    });
  };

  // 用户加入circle
  function joinCircle(user, circleName, callback) {
    // TODO: 用户最多只能加入5个圈子?
    db.collection('user').update({user: user}, {$push: {circle: circleName}}, function(err, item) {
      callback(err, item);
    });
  };

  // 用户退出circle
  function quitCircle(user, circleName, callback) {
    db.collection('user').update({user: user}, {$pull: {circle: circleName}}, function(err, item) {
      callback(err, item);
    });
  };

  // 解散circle
  function discardCircle(user, circleName, callback) {
    db.collection('circle').remove({owner:user, name:circleName}, function(err, item) {
      if (err || item == 0) { // 只有圈子的owner才能删除此圈子
        return callback(err, item);
      }

      // 删除 user 表中的信息
      var collection = db.collection('user');
      collection.update({}, {$pull: {circle: circleName}}, {w:1, multi:true}, function(err, items) {
        // callback(err, items);
        collection.update({user:user}, {$pull: {circleAdmin: circleName}}, function(err, items) {
          callback(err, items);
        });
      });
    });
  };

  function getCirclesByUser(user, callback) {
    db.collection('user').find({user: user}, {circle:1}).nextObject(function(err, item) {
      callback(err, item);
    });
  };

  function getServerStatus(callback) {
    var admin = db.admin();
    if (process.env.VCAP_SERVICES) {
      var credentials = JSON.parse(process.env.VCAP_SERVICES)['mongodb-2.2'][0].credentials;
      admin.authenticate(credentials.username, credentials.password, function(err, result) {
        if (err) {
          return callback(err, result);
        }
        admin.command({serverStatus:1}, function(err, info) {
          callback(err, info);
        });
      });
    }
    else {
      admin.command({serverStatus:1}, function(err, info) {
        callback(err, info);
      });
    }
  };

  function insertMatch(match, callback) {
    db.collection('match').insert(match, function(err, item) {
      callback(err, item);
    });
  };

  function createIndex(col, index, options, callback) {
    db.createIndex(col, index, options, function(err, indexname) {
      callback(err, indexname);
    });
  };

  return {
    getAllMatches: getAllMatches,
    getBetItemsByMatch: getBetItemsByMatch,
    getVoteItemsByUser: getVoteItemsByUser,
    vote: vote,
    voteAll: voteAll,
    updateMatchScore: updateMatchScore,
    getBoard: getBoard,
    getUserByName: getUserByName,
    addUser: addUser,
    getMyCircles: getMyCircles,
    getUsersByCircle: getUsersByCircle,
    createCircleByName: createCircleByName,
    joinCircle: joinCircle,
    quitCircle: quitCircle,
    discardCircle: discardCircle,
    getCirclesByUser: getCirclesByUser,
    getServerStatus: getServerStatus,
    insertMatch: insertMatch,
    createIndex: createIndex
  }
};

exports = module.exports = dao;