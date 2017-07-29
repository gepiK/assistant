var express = require('express');
var router = express.Router();
var url =require('url');
var qs = require('querystring');
var cnode = require('../spider/cnode');
/* GET home page. */

router.get('/', function(req, res) {
  // res.render('list', { title: 'list' });
  let page = req.query.page;
  let tab = req.query.tab;
  let requestUrl = 'https://cnodejs.org/';
  if(page != undefined){
    requestUrl = 'https://cnodejs.org/?tab=' + tab + '&page=' + page;
  }
  let _cnode = new cnode(requestUrl);
  _cnode.getData(res);

});



router.get('/url', function(req, res,next) {
  let urlString = 'https://cnode.org/?tab=all&page=1';
  let queryUrl = url.parse(urlString).query;
  var obj = qs.parse(queryUrl);
  res.send(obj);
});
module.exports = router;
