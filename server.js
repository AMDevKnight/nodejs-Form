require('dotenv').config();
const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const mongoose = require("mongoose");
const Message = require('./models/messageSchema');
const cors = require("cors")

app.use(cors())
mongoose.connect(
    process.env.MONGODB_URL,
    {
        dbName: "Form-data",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) =>
        err ? console.log(err) : console.log(
            "Connected to database")
);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    layoutsDir: __dirname + '/views/layout/'
}))

app.get('/', (req, res) => {
    res.render('form', { layout: 'index' });
})

app.post('/send', (req, res) => {
    const message = new Message({
        firstName: req.body.firstName,
        email: req.body.email,
        messageCategory: req.body.messageCategory,
        Date: req.body.Date,
        time: req.body.time,
        message: req.body.message
    });
    console.log(req.body)
    message.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        })
})

app.use(express.static('public'))
app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})