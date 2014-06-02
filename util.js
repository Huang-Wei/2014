exports.getBetResult = function(score, betscore) {
  var result = {};

  // 用户未投票，还是null状态
  if (betscore == null) {
    result.lose = 1;
    return result;
  }

  var s1 = score.split(":")[0];
  var s2 = score.split(":")[1];
  var bs1 = betscore.split(":")[0];
  var bs2 = betscore.split(":")[1];

  // 平
  if (s1 == s2 && bs1 == bs2) {
    if (s1 == bs1) {
      result.betscore = 3;
      result.win = 1;
    }
    else {
      result.betscore = 1;
      result.draw = 1;
    }
  }
  // 胜
  else if (s1 > s2 && bs1 > bs2) {
    if (s1 == bs1 && s2 == bs2) {
      result.betscore = 3;
      result.win = 1;
    }
    else {
      result.betscore = 1;
      result.draw = 1;
    }
  }
  // 负
  else if (s1 < s2 && bs1 < bs2) {
    if (s1 == bs1 && s2 == bs2) {
      result.betscore = 3;
      result.win = 1;
    }
    else {
      result.betscore = 1;
      result.draw = 1;
    }
  }
  else {
    result.lose = 1;
  }
  return result;
};

var weekday = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];

exports.getLocalTime = function(time, offset) {
  var retValue = [];
  var utc = time.getTime() + (time.getTimezoneOffset() * 60000);
  var nd = new Date(utc + (3600000*offset));
  
  retValue[0] = printT(nd.getMonth()+1)+"月"+printT(nd.getDate())+"日 "+weekday[nd.getDay()];
  retValue[1] = printT(nd.getHours())+":"+printT(nd.getMinutes());
  return retValue;
};

function printT(time) {
  return time.toString().length == 1 ? "0"+time : time;
};
