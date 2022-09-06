import jwt from 'jsonwebtoken';

export default token =>
    new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_TOKEN, (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err);
            }

            resolve(decodedToken);
        });
    });

// verify(token).then().catch();