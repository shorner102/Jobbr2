

const express = require('express');
const passport = require('passport');
const router = express.Router();

// get
router.get("/", (req, res) => {
    res.render('login', {error: req.flash('loginMessage')});
});

//post
router.post("/", passport.authenticate('local', {failureRedirect: '/login', failureFlash: true }), (req, res) => {
        res.redirect("/swipe");
});

module.exports = router;

