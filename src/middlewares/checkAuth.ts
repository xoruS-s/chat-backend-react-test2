import express from 'express';
import { verifyJWT } from '../utils';
import {IUser} from "../models/User";

interface YUser {
    email: string;
    password: string;
}

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token:any = req.headers.token;

    if (req.path !== '/user/login') {

    }

    verifyJWT(token).then(user => {
        // req.user = user;
        next();
    }).catch(() => {
        res.status(403).json({
            message: 'invalid'
        });
    });
};