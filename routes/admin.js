exports.serverStatus = function(req, res, dao) {
  dao.getServerStatus(function(err, info) {
    res.render('admin/serverStatus', {err: err, info: JSON.stringify(info)})
  })
};
