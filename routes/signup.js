const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', function(req, res){
  res.render("signup.handlebars");
  
});

module.exports = router;