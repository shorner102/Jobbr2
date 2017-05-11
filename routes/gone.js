const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get("/", (req, res) => {
   res.render("gone.handlebars") ;
});

router.post("/", function(req, res){
   res.redirect("/matches"); 
});


modules.exports = router;