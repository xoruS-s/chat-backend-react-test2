import jwt from 'jsonwebtoken';
import { IUser } from "../models/User";

export default (token: string) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_TOKEN || '', (err: any, decodedData: any) => {
            if (err || !decodedData) {
                return reject(err);
            }

            resolve(decodedData);
        });
    });

// verify(token).then().catch();