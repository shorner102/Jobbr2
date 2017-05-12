const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-local');
const bcrypt = require('bcrypt-nodejs');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');

const data = require('./data');
const configRoutes = require('./routes');
const static = express.static(__dirname + '/public');
const app = express();

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        asJson: (obj, spacing) => {
            if (typeof spacing === "number") {
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));
            }
            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    }
});

// passport.use(new Strategy({ passReqToCallback: true },
//     function(req, email, password, cb) {
//         data.user.getUserByEmail(email).then((user) => {
//             bcrypt.compare(password, user.hashedPassword).then((res) => {
//                 if (!res) {
//                     return cb(null, false, req.flash('loginMessage', 'The username and password you entered did not match our records. Please double-check and try again.'));
//                 }
//                 return cb(null, user, null);
//             });
//         }, (error) => {
//             return cb(null, false, req.flash('loginMessage', error));
//         });
//     }));

    passport.use(new Strategy(
      function(email, password, cb) {
        data.user.getUserByEmail(email).then((user) => {
          bcrypt.compare(password, user.hashedPassword, (err, res) => {
            if(res === true) {
              return cb(null, user);
            } else {
              return cb(null, false, {message: 'Incorrect username/password'});
            }
          });
        }, (err) => {
          return cb(null, false, {message: 'Incorrect username/password'});
        })
      }));

passport.serializeUser(function (user, cb) {
    cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
    data.user.getUserById(id).then((user) => {
        cb(null, user);
    }, (error) => {
        return cb(error);
    });
});

app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({secret: 'keyboard cat', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('connect-flash')());
app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');
configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});
