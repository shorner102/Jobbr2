const loginRoutes = require("./login");
const signupRoutes = require("./signup");
const swipeRoutes = require("./swipe");
const matchRoutes = require("./match");
const mainRoutes = require("./main");
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const constructorMethod = (app) => {

    app.use("/login", loginRoutes);
    app.use("/signup", signupRoutes);
    app.use("/swipe", swipeRoutes);
    app.use("/match", matchRoutes);
    app.use("/", mainRoutes);

};

module.exports = constructorMethod;
