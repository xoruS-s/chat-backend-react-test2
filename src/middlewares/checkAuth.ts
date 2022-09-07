import express from 'express';
import { verifyJWT } from '../utils';
import {IUser} from "../models/User";

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token:any = req.headers.token;

    verifyJWT(token).then((user: any) => {
        // req.user = user;
        next();
    }).catch(() => {
        res.status(403).json({
            message: ''
        });
    });
};