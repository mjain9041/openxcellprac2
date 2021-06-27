const { body } = require('express-validator')

module.exports = app => {
  const auth = require("../controllers/auth.controller");
  var router = require("express").Router();

  // Create a new User
  router.post("/register", [
    body('email').isEmail().withMessage('please enter valid email address'),
    body('password').notEmpty().withMessage('please insert valid password'),
  ], auth.register);

  // // Login new User
  router.post("/login", [
    body('email').isEmail().withMessage('please enter valid email address'),
    body('password').notEmpty().withMessage('please insert valid password'),
  ], auth.login);

  app.use('/api/auth', router);
};