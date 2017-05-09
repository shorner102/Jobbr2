const express = require('express');
const passport = require('passport');
const router = express.Router();
const data = require("../data");
const postData = data.post;
var id = 0;



router.get('/', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
  
  postData.getFirstPost().then((post)=>{
     res.render("swipe", post);
  })
 
  
});

router.post('/', function(req,res){
  console.log(id);
  id = id + 1;
  postData.getNext(id).then((post)=>{
    res.render("swipe", post);
    
  })
  
});
module.exports = router;