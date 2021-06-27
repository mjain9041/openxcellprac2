require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const db = require("./app/models");
const fileUpload = require('express-fileupload');
const nodemailer = require("nodemailer");

var app = express();
app.use(bodyParser.json())
app.set('secretKey', '1ec34a');
app.use(fileUpload());
app.use(express.static('uploads'));
app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 8080

 global.transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "c147411bf89128",
        pass: "c44d9e896a67c5"
    }
});

require("./app/routes/auth.route")(app);
require("./app/routes/topic.route")(app);
require("./app/routes/post.route")(app);
require("./app/routes/comment.route")(app);

app.get('/', function (req, res) {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});