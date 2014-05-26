exports.getBetResult = function(score, betscore) {
  var result = {};

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
}