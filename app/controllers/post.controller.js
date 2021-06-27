const db = require("../models");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Op = db.Sequelize.Op;
const Posts = db.posts;
const PostImages = db.post_images;
const Topics = db.topics;
const Comments = db.comments;
const fs = require('fs');
const path = require('path')
const { uuid } = require('uuidv4');

exports.create = async (req, res) => {
	try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
			res.json({ status: 'error', errors: errors }, 422)
			return;
		}
        let checkTopic = await Topics.findOne({
            where:{ id: req.body.topic_id, userId: req.body.userId }
        })
        if(!checkTopic) {
            let loginError = {
                errors:
                    [
                        {
                            msg: 'Topic is not related to this user',
                        }
                    ]
            };
            return res.json({ errors: loginError })
        }
        let post = await Posts.create({
            post_title: req.body.post_title,
            description: req.body.description,
            userId: req.body.userId,
            topicId: req.body.topic_id
        })
        let imageData = []
        if(req.files) {
            await fs.mkdirSync(path.join('uploads', `${post.id}`));
            for (i = 0; i < req.files['post_images[]'].length; i++) {
                let extension = (path.extname( req.files['post_images[]'][i].name)).toLowerCase();
                let post_image = req.files['post_images[]'][i];
                let fileName = uuid()
                let imagePath = `uploads/${post.id}/${fileName}${extension}`
                await post_image.mv(imagePath)
                imageData.push({
                    postId: post.id,
                    image_path: imagePath,
                })
            }
            await PostImages.bulkCreate(imageData,{returning: true})
        }
		res.json({ status: 'success', message: "Post created successfully"});
	} catch (err) {
		res.json(err.stack)
	}
}

exports.findAll = async function (req, res) {
	try {
        let posts = await Posts.findAndCountAll({
            limit: req.query.limit ? Number(req.query.limit) : 10,
            offset: req.query.offset ? Number(req.query.offset) : 0,
        })
        for(let i = 0; i < posts.rows.length; i++) {
            let comments = await Comments.findAll({
                where:{ postId: posts.rows[i].dataValues.id}
            })
            let postImages = await PostImages.findAll({
                where:{ postId: posts.rows[i].dataValues.id}
            })
            posts.rows[i].dataValues.comments = comments
            posts.rows[i].dataValues.postImages = postImages
        }
        res.json({ posts });
	} catch(err) {
		res.json(err.stack)
	}
}
