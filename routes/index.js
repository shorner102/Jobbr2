const loginRoutes = require("./login");
const privateRoutes = require("./private");
const signupRoutes = require("./signup");
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const constructorMethod = (app) => {
  
    app.use("/login", loginRoutes);
    app.use("/signup", signupRoutes);
    app.use("/private", privateRoutes);

    app.use("*", require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
        // if the login information is valid, redirect to private
        res.redirect("/private");
    })
};

module.exports = constructorMethod;