const express = require('express');
const passport = require('passport');
const router = express.Router();
const data = require("../data");
const postData = data.post;
const userData = data.user;
var id = 0;
var u;



router.get('/', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
  u = req.user;
  postData.getFirstPost().then((post)=>{
     res.render("swipe", post);
  })
 
  
});

router.post('/', function(req,res){
 if(req.body.vote == "like"){
   postData.findPost(id).then((post)=>{
    postData.addLikedPost(post._id, u._id).then((user)=>{
      console.log(user);
    });
   });
   
 }
  id = id + 1;
  postData.findPost(id).then((post)=>{
    if(id == postData.getLastPost()){
        res.redirect("/gone");
    }
        res.render("swipe", post);
    
  })
  
});

module.exports = router;