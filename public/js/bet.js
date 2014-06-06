function popupMsg(css, msg, matchid) {
  $("#popup").addClass(css);
  $("#popup").empty().append(msg);
  $("#popup").show();
  $("#popup").delay(2500).fadeOut(1000, function() {
    // console.log("callback fadeout");
    $("#subOne"+matchid).removeAttr('disabled');
    $("#popup").removeClass(css);
  });
}

$('button[id^="subOne"]').click(function() {
  var inputs = $(this).parent().parent().find("input");
  var matchid = $(this).parent().next().text();
  matchid = parseInt(matchid.substring(1, matchid.length-1)); //比赛id
  var matchTime = $("#time"+matchid).attr("value");
  var score1 = inputs[0].value.trim();
  var score2 = inputs[1].value.trim();

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
  var rowCount = $("#myTable tr").length;
  var thisTime = new Date();
  console.log("table rowCount : " + rowCount);
  for (var i = 1; i <= rowCount; i++) {
    var matchTime = new Date(parseInt($("#time"+i).attr("value")));
    if (thisTime > matchTime) {
      $("#subOne"+i).attr("disabled", true);
      // $("#score1"+i).attr("contenteditable", false);
      // $("#score2"+i).attr("contenteditable", false);
    }
  }
});
