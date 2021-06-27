let jwt = require("jsonwebtoken");

exports.auth = function (req, res, next) {
	try {
		let token = req.header("Authorization");
		if(typeof token === "undefined"){
			res.json({status:'error',message:'Unauthorized user'},403)
		}
		let decoded = jwt.verify(token,req.app.get('secretKey'));
		req.body.userId = decoded.id;
		next();
	} catch (err) {
		res.json({status:'error',message:err.message},403)
	}
};