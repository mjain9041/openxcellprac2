const { body } = require('express-validator')

module.exports = app => {
  const topic = require("../controllers/topic.controller");
  const authMiddleware = require('../middleware/jwtAuth');
  var router = require("express").Router();
  router.use(authMiddleware.auth);
  // Create a new User
  router.post("/", [
    body('topic_name').notEmpty().withMessage('please insert topic name'),
  ], topic.create);

  //Login new User
  router.get("/", topic.findAll);

  app.use('/api/topic', router);
};