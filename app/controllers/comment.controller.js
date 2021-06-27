const db = require("../models");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Op = db.Sequelize.Op;
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
        await Comments.create({
            userId: req.body.userId,
            postId: req.body.post_id,
            comment: req.body.comment
        })
		res.json({ status: 'success', message: "Comment created successfully"});
	} catch (err) {
		res.json(err.stack)
	}
}
