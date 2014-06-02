function bet(matchid) {
  var rowno = matchid - 1;
  // console.log('bet() invoked...');
  var score1 = $("#score1"+matchid).text();
  var score2 = $("#score2"+matchid).text();
  var matchTime = $("#time"+matchid).attr("value");

  $.post('/bet/vote', {
    score1: score1,
    score2: score2,
    rowno: rowno,
    matchTime: matchTime},
    function(data) {
      var css = data.split(",")[0];
      var msg = data.split(",")[1]
      $("#popup").addClass(css);
      $("#popup").empty().append(msg);
      $("#popup").show();
      $("#popup").fadeOut(3000, function() {
        console.log("callback fadeout");
        $("#popup").removeClass(css);
      });
  });
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
