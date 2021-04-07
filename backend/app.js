const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("morgan");
const passport = require("./config");
const routes = require("./routes");

app.use(express.json());

// initialize HTTP Headers middleware
app.use(helmet());

// morgan logger, network info in node console
app.use(logger("dev"));

// enable cors to accept requests for our client
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// configure session middleware.
// session is from line 3; express-session makes it
// so session data is not saved on the cookie itself;
// the session data is stored serverside. The cookie
// only holds the session id.

// Make sure this line is run before passport.session()
// to ensure the login session is restored in the
// correct order.
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// initalize passport
app.use(passport.initialize());

// this middleware alters the request object.
// more detail here:
// ttps://stackoverflow.com/questions/22052258/what-does-passport-session-middleware-do
app.use(passport.session());

app.use("/", routes);

module.exports = app;
