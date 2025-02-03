const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { readData } = require('./data');

passport.use(new LocalStrategy(
  (username, password, done) => {
    console.log('Authenticating:', username);
    const users = readData();
    const user = users.find(user => user.username === username);
    if (!user) {
      console.log('User not found');
      return done(null, false, { message: 'Incorrect username.' });
    }
    bcrypt.compare(password, user.password, (err, res) => {
      if (res) {
        console.log('Authentication successful');
        return done(null, user);
      } else {
        console.log('Incorrect password');
        return done(null, false, { message: 'Incorrect password.' });
      }
    });
  }
));

passport.serializeUser((user, done) => {
  console.log('Serializing user:', user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('Deserializing user:', id);
  const users = readData();
  const user = users.find(user => user.id === id);
  done(null, user);
});

module.exports = passport;

