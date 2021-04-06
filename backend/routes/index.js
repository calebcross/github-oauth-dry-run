const express = require("express");
const router = express.Router();
const passport = require("../config");

let authRedirect = "/";

router.get("/login/failed", (req, res, next) => {
  res.status(401).send("Could not authenticate with OAuth provider");
});

router.get("/login", (req, res) => {
  authRedirect = req.query.from;
  // start authenticating
  passport.authenticate("github")(req, res);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(req.query.from);
});

// GitHub Auth CallBack/Redirect http://localhost:5000/auth
router.get("/auth", (req, res) => {
  passport.authenticate("github", {
    successRedirect: authRedirect,
    failureRedirect: "/login/failed",
  })(req, res);
});

router.get("/auth/check", (req, res) => {
  if (req.user === undefined) {
    return res.status(401).send("Unauthorized");
  }
  // if user is currently authenticated, send back user info
  res.status(200).json(req.user);
});

module.exports = router;
