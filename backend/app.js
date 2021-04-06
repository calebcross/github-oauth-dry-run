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

// enable cors
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// initalize passport
app.use(passport.initialize());

// deserialize cookie from the browser
app.use(passport.session());

app.use("/", routes);

module.exports = app;
