function login() {
  var user = $("#user");
  var password = $("#password");

  alert(user.text());
  alert(password.text());
  return;

  if (user == '' || password == '') {
    $("#popup").addClass('alert-danger');
    $("#popup").empty().append("用户名或密码为空");
    $("#popup").show();
    $("#popup").fadeOut(3000, function() {
      $("#popup").removeClass('alert-danger');
    });
  }
};