import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import dotenv from 'dotenv';

import { UserController, DialogController, MessageController } from "./controllers";
import { updateLastSeen, checkAuth } from './middlewares';
import { loginValid, registerValid } from './utils/validations';

const app = express();
const DB_URL = 'mongodb://127.0.0.1:27017/chat';

dotenv.config();

// Контроллеры
const User = new UserController();
const Dialog = new DialogController();
const Message = new MessageController();
//
app.use(bodyParser.json());
app.use(updateLastSeen);
app.use(checkAuth);

mongoose.connect(DB_URL)
    .then(r => { console.log('--- Success connection to database') })
    .catch(e => console.log(e));


// Routes
app.get('/user/:id', User.show);
app.post('/user/registration', User.create);
app.delete('/user/:id', User.delete);
app.post('/user/login', User.login);

app.get('/dialogs', Dialog.index);
app.post('/dialogs', Dialog.create);
app.delete('/dialogs/:id', Dialog.delete);

app.get('/messages', Message.index);
app.post('/messages', Message.create);
app.delete('/messages/:id', Message.delete);
app.get('/test', (req: any, res: any) => { res.send("ok") });

// Listen
app.listen(process.env.PORT, () => {
   console.log('');
   console.log('Server start: http://localhost:' + process.env.PORT);
});