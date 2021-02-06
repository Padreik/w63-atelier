import jwt from 'jsonwebtoken';
import {jwtSecret} from '../config/jwtSecret.js';

export const authenticateJWT = (req, res, next) => {
    let token = req.cookies.SESSIONID;
    jwt.verify(token, jwtSecret, (err, payload) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                res.clearCookie('SESSIONINFO');
            }
            return res.status(403).send(err);
        }

        req.payload = payload;
        next();
    });
};
