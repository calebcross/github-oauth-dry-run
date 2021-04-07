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

// initialize github strategy middleware
// http://www.passportjs.org/packages/passport-github
passport.use(
  new GitHubStrategy(
    passportConfig,
    function (_accessToken, _refreshToken, profile, cb) {
      // if we had a database, this is the perfect place
      // where we could look up a user by the github user
      // id; if we couldn't find one, it could be a place
      // where we could create a new user in our database.

      // console.log('Github Callback: ', profile);
      // this profile will get saved in express session
      return cb(null, profile);
    }
  )
);

// For passport.session() to work, we need these next two methods:

// serializeUser and deserializeUser explanation:
// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

module.exports = passport;
