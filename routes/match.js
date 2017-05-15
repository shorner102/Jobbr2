const express = require('express');
const router = express.Router();
const passport = require('passport');
const data = require("../data");
const postData = data.post;
const userData = data.user;

router.get('/', require('connect-ensure-login').ensureLoggedIn('/'), (req, res) => {
  res.render("match");
});

router.get('/getjobs', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
  var userId = req.user._id;

  postData.getLikedPosts(userId).then((likedPosts) => {
    return Promise.all(likedPosts.map(postData.getPostById));
  }).then((fullPosts) => {
    res.json(fullPosts);
  });
});

module.exports = router;
