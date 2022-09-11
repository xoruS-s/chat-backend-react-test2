import jwt from 'jsonwebtoken';
import { IUser } from "../models/User";

export default (token: string) =>
    new Promise((resolve, reject) => {
        // console.log("==============================================");
        jwt.verify(token, process.env.JWT_SECRET || '', (err: any, decodedData: any) => {
            if (err || !decodedData) {
                return reject(err);
            }

            // console.log("----------------------");
            resolve(decodedData);
        });
    });

// verify(token).then().catch();