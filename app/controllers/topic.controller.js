const db = require("../models");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Op = db.Sequelize.Op;
const Topics = db.topics;

exports.create = async (req, res) => {
	try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
			res.json({ status: 'error', errors: errors }, 422)
			return;
		}
        await Topics.create({
            topic_name:req.body.topic_name,
            userId: req.body.userId
        })
		res.json({ status: 'success', message: "Topic created successfully"}, 200);
	} catch (err) {
		res.json(err.stack)
	}
}

exports.findAll = async function (req, res) {
	try {
        let topics = await Topics.findAndCountAll({
            where: {userId: req.body.userId},
            limit: req.query.limit ? Number(req.query.limit) : 10,
            offset: req.query.offset ? Number(req.query.offset) : 0,
        })
        res.json({ topics});
	} catch(err) {
		res.json(err)
	}
}
