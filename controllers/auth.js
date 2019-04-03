const express = require('express');
const User = require("../models/User");
const jwt = require('jwt-simple');
const config = require('../config/keys');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
// LOGIN ===========
exports.login = function(req, res, next) {
  // User already has their email and pw auth'd,
  // they just need a token
  res.send({ token: tokenForUser(req.user), email: (req.user.email), userId: req.user._id });
}
// SIGN UP ===========
exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password.' })
  }
  // See if a user with given email already exists in db
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }
  
  // if a user with email does exist, throw error
    if (existingUser) {
      return res.status(422).send({ error: 'Email already in use' });
    }

  // if user with that email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if(err) { return next(err); }
      
      // respond to request indicating user was created - SUCCESS
      return res.json({ token: tokenForUser(user), email: user.email, userId: user._id });
    });
  });
}