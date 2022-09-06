import { UserModel } from "../models";
import express from 'express';

export default (req: express.Request, _: express.Response, next: express.NextFunction) => {
    const id = '6314c7d9736410c54c9bf06b';
    UserModel.findOneAndUpdate(
        { _id: id },
        { last_seen: new Date() },
        { new: true },
        () => {}
    );

    next();
}