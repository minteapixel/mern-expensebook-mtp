const express = require('express');
const router = express.Router();
const passportService = require('../services/passport');
const passport = require('passport');
const User = require('../models/User');
const Auth = require('../controllers/auth');

// NOTE: all coming from "/api/auth"

const requireAuth = passport.authenticate('jwt', { session: false });
// const requireLogin = passport.authenticate('local', { session: false });
const requireLogin = passport.authenticate('local');

router.get('/secretpage', requireAuth, function(req, res) {
  res.send({ hi: 'there'});
});

router.post('/signup', Auth.signup);

router.post('/login', requireLogin, Auth.login);

router.get('/logout', (req, res) => {
  req.logout();
  res.send({ loggedOut: true });
});

router.get('/current_user', (req, res) => {
  if(!req.user) {
    return res.send(undefined);
  }
  else {
    return res.send(req.user);
  }
});

module.exports = router;