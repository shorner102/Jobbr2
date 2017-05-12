require('dotenv').config({ silent: true });
const express = require('express');
const passport = require('passport');
const router = express.Router();
const indeed = require('indeed-jobs-api').getInstance(process.env.INDEED_ID);
const data = require("../data");
const postData = data.post;
const userData = data.user;



router.get('/', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
  res.render("swipe", {jobtitle: "Fetching Jobs, Please Wait.."});
});

router.get('/getjobs', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
  // u = req.user;
  // postData.getFirstPost().then((post)=>{
  //    res.render("swipe");
  // })
  var userAgent = req.headers['user-agent'];
  var userIP = req.ip;
  var userId = req.user._id;
  /* if user current job queue is empty, get 25 more */
  userData.jobsQueued(userId).then((queueLen) => {
    if(queueLen < 1) {
      console.log("User's job queue empty, fetching more jobs!");
      indeed.JobSearch()
        .WhereKeywords(["Java"])
        .Limit(5)
        .FromResult(0)
        .FilterDuplicates(true)
        .UserIP(userIP)
        .UserAgent(userAgent)
        .Search(function (jobSearch) {
          // add these jobs to DB
          var jobJSON = JSON.parse(jobSearch);
          var jobArray = jobJSON.results;

          Promise.all(jobArray.map(postData.addPost)).then((ids) => {
            return userData.pushPosts(ids, userId);

          }).then(() => {
            return userData.peekPost(userId);
          }).then((pid) => {
            return postData.getPostById(pid);
          }).then((post) => {
            res.json(post);
          });
        },
          function (error) {
            console.log(error);
          });
    } else {
      console.log("Jobs in queue, no need to fetch");
      userData.peekPost(userId).then((pid) => {
        return postData.getPostById(pid);
      }).then((post) => {
        res.json(post);
      });
    }
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


// router.post('/', function(req,res){
//  if(req.body.vote == "like"){
//    postData.findPost(id).then((post)=>{
//     postData.addLikedPost(post._id, u._id).then((user)=>{
//       console.log(user);
//     });
//    });
//
//  }
//   id = id + 1;
//   postData.findPost(id).then((post)=>{
//     res.render("swipe", post);
//
//   })
//
// });

module.exports = router;
