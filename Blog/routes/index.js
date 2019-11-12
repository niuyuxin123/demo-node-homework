var express = require('express');
var router = express.Router();
var arr=require('../data.json');


router.get('/', function(req, res) {
  res.render('login');
});
router.post('/',function(req,res){
  if(req.body.username===arr.users[0].username&&req.body.pwd===arr.users[0].password){
    
    res.render('list');
  }
  else{
    res.render('error');
  }
})
router.get('/arr', function(req, res) {
  res.send(arr);
});
module.exports = router;
