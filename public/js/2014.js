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

function reg() {
  var user = $("#user").val();
  var showname = $("#showname").val();
  var password = $("#password").val();
  var password1 = $("#password1").val();

  if (user.trim() === '') {
    popupMsg('alert-danger', '用户名不允许为空');
  }
  else if (showname.trim() === '') {
    popupMsg('alert-danger', '用户昵称不允许为空');
  }
  else if (password !== password1) {
    popupMsg('alert-danger', '两次密码输入不一致');
  }
  else if (password === '') {
    popupMsg('alert-danger', '密码不允许为空');
  }
  else {
    $.post('/user/reg', {
      user: user,
      showname: showname,
      password: password},
      function(data) {
        var css = data.css;
        var msg = data.msg;

        if (css == 'alert-success') {
          popupMsg(css, msg);
          location.href = '/user/login';
        }
        else {
          popupMsg(css, msg);
        }
    });
  }
};