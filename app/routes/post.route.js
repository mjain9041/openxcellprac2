const { body } = require('express-validator')

module.exports = app => {
  const post = require("../controllers/post.controller");
  const customValidation = require("../customValidation/validateImage.validation");
  const authMiddleware = require('../middleware/jwtAuth');
  var router = require("express").Router();
  router.use(authMiddleware.auth);
  // Create a new User
  router.post("/", [
    body('post_title').notEmpty().withMessage('please insert post title').isLength({ max: 100 }).withMessage('Post title not greater then 100 character'),
    body('description').notEmpty().withMessage('please insert description').isLength({ max: 250 }).withMessage('description not greater then 100 character'),
    body('topic_id').notEmpty().withMessage('please insert topic'),
    body('post_images').custom((value,{req})=>{ if(req.files) return customValidation.validateImage(req.files); else return true; }),
  ], post.create);

  router.get("/", post.findAll);

  app.use('/api/post', router);
};