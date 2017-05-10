const express = require('express');
const passport = require('passport');
const router = express.Router();
const data = require("../data");
const postData = data.post;
const userData = data.user;
var id = 0;
var u;

//this needs a way to render all the matches 

router.get('/', function(req, res) => {
    //getFirstMatch needs to be implemented
    //maybe set id to first match
    userData.getFirstMatch().then((post) => {
        res.render("matches", post);
    })

});

router.post('/', function(req,res){
    if(req.body.navig=="nextM"){
        //impletment next match
        id = getNextMatch();
        postData.findPost(id).then((post)=>{
            res.render("matches", post);
        });
    }
    if(req.body.navig=="prevM"){
        //implement prevmatch
        id = getPrevMatch();
        postData.findPost(id).then((post)=>{
            res.render("matches", post);
        });
    }
});

module.exports = router;