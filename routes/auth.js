const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
  // validation

  if (password.length < 8) {
    res.render('signup', {
      message: 'Your password has to be at least 8 characters!',
    });
    return;
  }

  if (username.length === 0) {
    res.render('signup', { message: 'Please provide a username!' });
    return;
  }

  User.findOne({ username: username }).then((userFromDB) => {
    if (userFromDB !== null) {
      res.render('signup', { message: 'This username is already taken' });
      return;
    } else {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      User.create({ username: username, password: hash })
        .then((createdUser) => {
          res.redirect('/login');
        })
        .catch((err) => {
          next(err);
        });
    }
  });
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: 'login',
    passReqToCallback: true,
  })
);

module.exports = router;
