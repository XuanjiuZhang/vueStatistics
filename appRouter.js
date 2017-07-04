/**
 * 路由
 * 2016/9/5.
 */
var express = require('express');
var router = express.Router();

var sourceTrace = function(req, res) {
  var id = req.params.id
  console.log(req.params);
  console.log('id:');
  console.log(id);
  if (!id) {
    res.status(404).json({ status: false, message: '空的sid' });
    return;
  }
  res.render('source-trace', { sid: id });
}

// 溯源系统
router.get('/source-trace/:id', sourceTrace);

module.exports = router;