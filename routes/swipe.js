require('dotenv').config({ silent: true });
const express = require('express');
const passport = require('passport');
const router = express.Router();
const indeed = require('indeed-jobs-api').getInstance(process.env.INDEED_ID);
const data = require("../data");
const postData = data.post;
const userData = data.user;



router.get('/', require('connect-ensure-login').ensureLoggedIn('/'), (req, res) => {
  res.render("swipe", {jobtitle: "Fetching Jobs, Please Wait.."});
});

router.get('/getjobs', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
  var userAgent = req.headers['user-agent'];
  var userIP = req.ip;
  var userId = req.user._id;

  userData.getUserById(userId).then((user) => {
    if(user.queue.length < 1) {
      indeed.JobSearch()
        .WhereKeywords(user.skills.split(" "))
        .WhereLocation(user.location)
        .Limit(25)
        .FromResult(user.lastSearch)
        .WhereJobType(user.jobType)
        .FilterDuplicates(true)
        .UserIP(userIP)
        .UserAgent(userAgent)
        .Search(function (jobSearch) {
          // add these jobs to DB
          var jobJSON = JSON.parse(jobSearch);
          var jobArray = jobJSON.results;

          if(jobArray.length > 0) {
            Promise.all(jobArray.map(postData.addPost)).then((ids) => {
              return userData.pushPosts(ids, userId);
            }).then(() => {
              return userData.incSearch(userId, 25);
            }).then(() => {
            return userData.peekPost(userId);
            }).then((pid) => {
              return postData.getPostById(pid);
            }).then((post) => {
              res.json(post);
            }).catch((err) => {
              console.log(err);
            });
          } else {
            res.json({
              jobtitle: "Could not find any jobs matching your skills at this time."
            });
          }
        },
          function (error) {
            console.log(error);
            return Promise.reject(error);
          });
    } else {
      userData.peekPost(userId).then((pid) => {
        return postData.getPostById(pid);
      }).then((post) => {
        res.json(post);
      });
    }
  }).catch((err) => {
    console.log(err);
  });

});

/* route for liking a post */
router.post('/like', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
    var userId = req.user._id;
    /* pop liked post from user queue, push it to likedPosts */
    userData.popPost(userId).then((pid) => {
      return postData.addLikedPost(pid, userId);
    }).then(() => { /* peek next post in queue to render */
      res.redirect('/swipe/getjobs');
    });
});

/* route for DISliking a post */
router.post('/dislike', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
    var userId = req.user._id;
    /* pop post from user queue, delete it from db */
    userData.popPost(userId).then((pid) => {
      return postData.removePost(pid);
    }).then(() => { /* peek next post in queue to render */
      res.redirect('/swipe/getjobs');
    });
});


module.exports = router;
