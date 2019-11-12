var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.writeHead(200, {'Content-Type': 'application/json'});
  res.status(200).json("Welcome to Application Portal For Disable People....");
});


module.exports = router;
