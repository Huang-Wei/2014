function popupMsg(css, msg, matchid) {
  $("#popup").addClass(css);
  $("#popup").empty().append(msg);
  $("#popup").show();
  $("#popup").delay(2500).fadeOut(1000, function() {
    console.log("callback fadeout");
    $("#btn"+matchid).removeAttr('disabled');
    $("#popup").removeClass(css);
  });
}

function bet(matchid) {
  var rowno = matchid - 1;
  // console.log('bet() invoked...');
  var score1 = $("#score1"+matchid).text();
  var score2 = $("#score2"+matchid).text();
  var matchTime = $("#time"+matchid).attr("value");

  $("#btn"+matchid).attr('disabled', true);

  if (isNaN(score1) || isNaN(score2)) {
    popupMsg('alert-danger', '亲，竞猜比分只能为数字且不含空格', matchid);
  }
  else {
    $.post('/bet/vote', {
      score1: score1,
      score2: score2,
      rowno: rowno,
      matchTime: matchTime},
      function(data) {
        var css = data.split(",")[0];
        var msg = data.split(",")[1];
        popupMsg(css, msg, matchid);
    });    
  }
};

function getFocus(id) {
  $("#"+id).addClass('focus');
  // $("#"+id).select(); // doesn't work
};

function lostFocus(id) {
  // console.log('inputFocus() invoked...');
  $("#"+id).removeClass('focus');
};

$(function() {
  // console.log("load() invoked...");
  var rowCount = $("#myTable tr").length;
  var thisTime = new Date();
  console.log("table rowCount : " + rowCount);
  for (var i = 1; i <= rowCount; i++) {
    var matchTime = new Date(parseInt($("#time"+i).attr("value")));
    if (thisTime > matchTime) {
      $("#btn"+i).attr("disabled", true);
      $("#score1"+i).attr("contenteditable", false);
      $("#score2"+i).attr("contenteditable", false);
    }
  }
});
