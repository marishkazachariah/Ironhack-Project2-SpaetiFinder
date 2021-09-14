const router = require("express").Router();

const loginCheck = () => {
    return (req, res, next) => {
      // in node-basic-auth: req.session.user
      if (req.isAuthenticated()) {
        // proceed as planned
        console.log('LOGGED IN')
        next();
      } else {
        res.redirect('/login');
      }
    }
  }

  module.exports = {
      loginCheck: loginCheck
  };

