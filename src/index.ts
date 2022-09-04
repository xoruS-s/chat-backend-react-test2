import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";

import { UserController, DialogController, MessageController } from "./controllers";

const app = express();
const PORT = 50505;
const DB_URL = 'mongodb://127.0.0.1:27017/chat';

const User = new UserController();
const Dialog = new DialogController();
const Message = new MessageController();

app.use(bodyParser.json());

mongoose.connect(DB_URL).then(r => {});

// Routes
app.get('/user/:id', User.show);
app.post('/user/registration', User.create);
app.delete('/user/:id', User.delete);

app.get('/dialogs/:id', Dialog.index);
app.post('/dialogs', Dialog.create);
app.delete('/dialogs/:id', Dialog.delete);

app.get('/messages', Message.index);
// app.post('/messages', Message.create);
// app.delete('/messages/:id', Message.delete);

// Listen
app.listen(PORT, () => {
   console.log('PORT: ' + PORT);
});