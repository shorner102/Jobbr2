const express = require('express');
var bcrypt = require('bcrypt-nodejs');
const router = express.Router();
const data = require("../data");
const userData = data.user;

router.get('/', function(req, res){
  res.render("signup.handlebars");

});

router.post("/",  function(req, res){
  /* compare both password fields before */
  bcrypt.hash(req.body.pwd1, null, null, function(err, hash) {
  var loc = {};
    loc.city = req.body.city;
    loc.state = req.body.state;
     userData.addUser(req.body.firstName, req.body.lastName, req.body.email, hash, loc, req.body.jobType, req.body.field, req.body.skills)
     .then((user)=>{
       res.redirect("/swipe");

     });
  });
});
module.exports = router;
