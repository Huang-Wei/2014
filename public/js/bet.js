function popupMsg(css, msg, matchid) {
  $("#popup").addClass(css);
  $("#popup").empty().append(msg);
  $("#popup").show();
  $("#popup").delay(2500).fadeOut(1000, function() {
    // console.log("callback fadeout");
    if (matchid === 'all')
      $("#subAll").removeAttr('disabled');
    else
      $("#subOne"+matchid).removeAttr('disabled');
    $("#popup").removeClass(css);
  });
};

$("#subAll").click(function() {
  $(this).attr('disabled', true);

  // 遍历数据，整理出修改过的数据
  var update = {};
  // rule 1: 过了比赛时间的数据不提交
  // rule 2: 未更改页面初始值（即'请竞猜')的数据不提交
  var rowCount = $('button[id^="subOne"]').length;
  var thisTime = new Date();
  for (var i = 1; i <= rowCount; i++) {
    var matchTime = new Date(parseInt($("#time"+i).attr("value")));
    if (thisTime < matchTime) {
      var inputs = $("#subOne"+i).parent().parent().find("input[type='text']");
      var score1 = inputs[0].value.trim();
      var score2 = inputs[1].value.trim();
      if (score1 !== '请竞猜' || score2 !== '请竞猜') {
        update['bet.' + (i-1)] = score1+':'+score2;
      }
    }
  }

  // 如果无数据可提交
  if (Object.keys(update).length === 0) {
    return popupMsg('alert-warning', '无数据可提交', 'all');
  }

  // 提交所有修改过的比分
  $.post('/bet/voteAll', {update: update},
    function(data) {
      var css = data.css;
      var msg = data.msg;
      popupMsg(css, msg, 'all');
  });

  // popupMsg('alert-info', 'please wait...', 'all');
});

$('button[id^="subOne"]').click(function() {
  var inputs = $(this).parent().parent().find("input[type='text']");
  var score1 = inputs[0].value.trim();
  var score2 = inputs[1].value.trim();
  var matchid = $(this).parent().next().text();
  matchid = parseInt(matchid.substring(1, matchid.length-1)); //比赛id
  var matchTime = $("#time"+matchid).attr("value");

  $(this).attr('disabled', true);

  if (score1 === '' || score2 === '' || isNaN(score1) || isNaN(score2)) {
    popupMsg('alert-danger', '亲，竞猜比分只能为数字且不含空格', matchid);
  }
  else {
    $.post('/bet/vote', {
      score1: score1,
      score2: score2,
      rowno: matchid-1,
      matchTime: matchTime},
      function(data) {
        var css = data.css;
        var msg = data.msg;
        popupMsg(css, msg, matchid);
    });
  }
});

$(".score").click(function() {
  this.select();
  $(this).addClass('focus');
});

$(".score").blur(function() {
  $(this).removeClass('focus');
});

$(function() {
  // console.log("load() invoked...");
  var rowCount = $('button[id^="subOne"]').length;
  var thisTime = new Date();
  // console.log("table rowCount : " + rowCount);
  for (var i = 1; i <= rowCount; i++) {
    var matchTime = new Date(parseInt($("#time"+i).attr("value")));
    if (thisTime > matchTime) {
      $("#subOne"+i).attr("disabled", true);
      $("#subOne"+i).parent().parent().find("input").attr('disabled', true);
    }
  }
});
