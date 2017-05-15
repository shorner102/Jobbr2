const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('*', (req, res) => {
  if(req.user) {
    res.redirect('/swipe');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
