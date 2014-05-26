function bet(matchid) {
  var rowno = matchid - 1;
  console.log('bet() invoked...');
  // console.log($('#score1'));
  var score1 = document.getElementsByName('#score1')[rowno].innerText;
  var score2 = document.getElementsByName('#score2')[rowno].innerText;
  $.post('/bet/vote', {score1:score1, score2:score2, rowno:rowno}, function(data) {
    $("#bet"+matchid).empty().append(data);
    // document.getElementById
  });
}