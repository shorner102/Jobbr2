

const express = require('express');
const passport = require('passport');
const router = express.Router();


// get
router.get("/", require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
    //res.render('private', req.user);
     res.redirect("/swipe");
    
});


module.exports = router;