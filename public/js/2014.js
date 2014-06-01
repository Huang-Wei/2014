function bet(matchid) {
  var rowno = matchid - 1;
  console.log('bet() invoked...');
  var score1 = $("#score1"+matchid).text();
  var score2 = $("#score2"+matchid).text();
  var matchTime = $("#time"+matchid).attr("value");

  $.post('/bet/vote', {
    score1: score1,
    score2: score2,
    rowno: rowno,
    matchTime: matchTime},
    function(data) {
      // $("#bet"+matchid).empty().append(data);
      // $("#info").empty().append(data);
      $("#popup").addClass(data.split(",")[0]);
      $("#popup").show();
      $("#popup-msg").empty().append(data.split(",")[1]);
      $("#popup").fadeOut(5000);
  });
};

function getFocus(id) {
  // console.log('inputFocus() invoked...');
  $("#"+id).addClass('focus');
};

function lostFocus(id) {
  // console.log('inputFocus() invoked...');
  $("#"+id).removeClass('focus');
};

$(function() {
  console.log("load() invoked...");
  var rowCount = $("#myTable tr").length;
  var thisTime = new Date();
  for (var i = 1; i < rowCount; i++) {
    var matchTime = new Date(parseInt($("#time"+i).attr("value")));
    if (thisTime > matchTime) {
      $("#btn"+i).attr("disabled", true);
      $("#score1"+i).attr("contenteditable", false);
      $("#score2"+i).attr("contenteditable", false);
    }
  }
});
