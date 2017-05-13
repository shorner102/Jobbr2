const loginRoutes = require("./login");
const signupRoutes = require("./signup");
const swipeRoutes = require("./swipe");
const matchRoutes = require("./match");
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const constructorMethod = (app) => {

    app.use("/login", loginRoutes);
    app.use("/signup", signupRoutes);
    app.use("/swipe", swipeRoutes);
    app.use("/match", matchRoutes);

    // app.use("*", require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
    //     // if the login information is valid, redirect to private
    //     res.redirect("/swipe");
    // })
};

module.exports = constructorMethod;
