// instantiate Passport and Github Strategy
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;

// require .env files for private data (keys and secrets)
require("dotenv").config();

const passportConfig = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
};

passport.use(
  new GitHubStrategy(
    passportConfig,
    function (_accessToken, _refreshToken, profile, cb) {
      // console.log('Github Callback: ', profile);
      // this profile will get saved in express session
      return cb(null, profile);
    }
  )
);

// serializeUser and deserializeUser explanation:
// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

module.exports = passport;
