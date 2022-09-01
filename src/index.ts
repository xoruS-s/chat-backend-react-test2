import express from 'express';
import mongoose from 'mongoose';
import User from './schemas/User';
import bodyParser from "body-parser";

const app = express();
const PORT = 50505;
// const DB_URL = 'mongodb+srv://admin:admin@cluster0.08rvwd3.mongodb.net/?retryWrites=true&w=majority';
const DB_URL = 'mongodb://127.0.0.1:27017/chat';

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(DB_URL);

app.post('/create', (req, res) => {
    const postData = {
      email: req.body.email,
      fullname: req.body.fullname,
      password: req.body.password
    };
    const user = new User(postData);
    user.save().then((obj) => {
        res.json(obj);
    }).catch(reason => {
        res.json(reason)
    });
});

app.listen(PORT, () => {
   console.log('PORT: ' + PORT);
});