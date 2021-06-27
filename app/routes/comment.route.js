const { body } = require('express-validator')

module.exports = app => {
  const post = require("../controllers/comment.controller");
  const customValidation = require("../customValidation/validateImage.validation");
  const authMiddleware = require('../middleware/jwtAuth');
  var router = require("express").Router();
  router.use(authMiddleware.auth);
  // Create a new User
  router.post("/", [
    body('comment').notEmpty().withMessage('please insert comment').isLength({ max: 100 }).withMessage('Post title not greater then 100 character'),
    body('post_id').notEmpty().withMessage('please insert post'),
  ], post.create);

  app.use('/api/comment', router);
};