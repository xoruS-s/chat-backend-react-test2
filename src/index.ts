import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";

import { UserController } from "./controllers";

const app = express();
const PORT = 50505;
// const DB_URL = 'mongodb+srv://admin:admin@cluster0.08rvwd3.mongodb.net/?retryWrites=true&w=majority';
const DB_URL = 'mongodb://127.0.0.1:27017/chat';
const User = new UserController();

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



mongoose.connect(DB_URL);

app.get('/user/:id', User.show);
app.post('/user/registration', User.create);
app.delete('/user/:id', User.delete);

app.listen(PORT, () => {
   console.log('PORT: ' + PORT);
});