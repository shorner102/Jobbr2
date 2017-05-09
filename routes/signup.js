const express = require('express');
var bcrypt = require('bcrypt');
const router = express.Router();
const data = require("../data");
const userData = data.user;

router.get('/', function(req, res){
  res.render("signup.handlebars");
  
});

router.post("/",  function(req, res){
  
  bcrypt.hash(req.body.pwd1, 10, function(err, hash) {
    
     userData.addUser(req.body.firstName, req.body.lastName, req.body.email, hash, req.body.location, req.body.skills, req.body.experience, req.body.field)
     .then((user)=>{
       res.redirect("/swipe");
       
     });
  });
});
module.exports = router;