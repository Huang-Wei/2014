function popupMsg(css, msg) {
  $("#popup").addClass(css);
  $("#popup").empty().append(msg);
  $("#popup").show();
  $("#popup").delay(2500).fadeOut(1000, function() {
    $("#popup").removeClass(css);
  });
};

function login() {
  var user = $("#user").val();
  var password = $("#password").val();

  if (user.trim() == '' || password.trim() == '') {
    popupMsg('alert-danger', '用户名或密码为空');
  }
  else {
    $.post('/user/login', {
      user: user,
      password: password},
      function(data) {
        var css = data.css;
        var msg = data.msg;

        if (css == 'alert-success') {
          location.href = '/bet/vote';
        }
        else {
          popupMsg(css, msg);
        }
    });
  }
};