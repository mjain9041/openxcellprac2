const db = require("../models");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Op = db.Sequelize.Op;
const Users = db.users;
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
	try {
		const errors = validationResult(req)
		let checkUser = await Users.findOne({
			where: { email: req.body.email }
		})
		if (checkUser) {
			errors.errors.push({
				msg: 'Email Already Exist',
				param: 'email',
				location: 'body'
			})
		}
		if (!errors.isEmpty()) {
			res.json({ status: 'error', errors: errors }, 422)
			return;
		}
		let password = bcrypt.hashSync(req.body.password, 10);
		// Create a User
		const data = {
			email: req.body.email,
			password: password,
		}
		await Users.create(data)
		var mainOptions = {
            from: '"Noreply" <noreply@example.com>', // sender address
            to: req.body.email, // list of receivers
            subject: 'Account Activated',
            text: 'Thank You for sign up'
        };
		transport.sendMail(mainOptions, function (err, info) {
            if (err) {
                console.log(err)
            } else {
                console.log('Send')
            }
        });
		
		res.json({ status: 'success', data: data, message: 'User Register Successfully' }, 200);
	} catch (err) {
		res.json(err.stack)
	}
}

exports.login = async function (req, res) {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			res.json({ status: 'error', errors: errors }, 422)
			return;
		}
		let checkUser = await Users.findOne({
			where: {
				email: req.body.email
			}
		})
		if (checkUser) {
			if (bcrypt.compareSync(req.body.password, checkUser.dataValues.password)) {
				const token = jwt.sign({ id: checkUser.dataValues.id }, req.app.get('secretKey'), { expiresIn: '24h' });
				delete checkUser.dataValues.password
				res.json({ status: 'success', data: checkUser, access_token: token, message: 'User Login Successfully' }, 200);
			} else {
				let loginError = {
					errors:
						[
							{
								msg: 'Email password is not match',
							}
						]
				};
				res.json({ status: 'error', errors: loginError }, 422);
			}
		} else {
			let loginError = {
				errors:
					[
						{
							msg: 'User not exist in system'
						}
					]
			};
			res.json({ status: 'error', errors: loginError }, 422);
		}
	} catch(err) {
		res.json(err)
	}
}
