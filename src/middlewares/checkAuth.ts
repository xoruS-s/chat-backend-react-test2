import express from 'express';
import { verifyJWT } from '../utils';

export default (req: any, res: any, next: any) => {
    if (req.path === '/user/login' || req.path === '/user/registration') {
        return next();
    }

    const token:any = req.headers.token;

    verifyJWT(token).
    then((user?: any) => {
        req.user = user.data._doc;
        next();
    }).
    catch(() => {
        res.status(403).json({
            message: 'invalid token'
        });
    });
};