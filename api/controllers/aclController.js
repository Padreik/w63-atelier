import Bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../models/user.js';
import {jwtSecret} from '../config/jwtSecret.js';

/**
 * @param req {Request}
 * @param res {Response}
 */
function register(req, res) {
    User.findOne({username: req.body.username}).exec((err, user) => {
        if (err) {
            res.status(401).json(err);
        }
        else if (user == null) {
            req.body.password = Bcrypt.hashSync(req.body.password, 10);
            const user = new User(req.body);
            user.save((err) => {
                if (err)
                    res.status(400).json(err);
                else {
                    // Login automatique lors du register
                    generateJWT(user.id, res);
                    res.status(201).end();
                }
            });
        }
        else {
            res.status(401).json("Ce nom d'utilisateur existe déjà.");
        }
    });
}

/**
 * @param req {Request}
 * @param res {Response}
 */
function login(req, res) {
    User.findOne({username: req.body.username}).exec((err, user) => {
        if (err) {
            res.status(400).send(err.message);
        }
        else if (user == null) {
            res.status(401).send("Ce nom d'utilisateur n'existe pas.");
        }
        else if (!Bcrypt.compareSync(req.body.password, user.password)) {
            res.status(401).send("Mot de passe invalide");
        }
        else {
            generateJWT(user.id, res);
            res.status(201).end();
        }
    });
}

/**
 * @param req {Request}
 * @param res {Response}
 */
function logout(req, res) {
    res.clearCookie('SESSIONINFO');
    res.clearCookie('SESSIONID');
    res.status(204).end();
}

/**
 * @param id {string}
 * @param res {Reponse}
 */
function generateJWT(id, res) {
    const EXPIRES_IN_SECONDS = 5*60;
    let payload = {userId: id};

    // 2 fois plus rapide de créer une nouvelle date que d'ajouter des secondes
    let expireDate = new Date();
    expireDate = new Date(expireDate.getTime() + (EXPIRES_IN_SECONDS * 1000));
    let sessionInfo = {expires: expireDate};

    const jwtBearerToken = jwt.sign(payload, jwtSecret, {
        expiresIn: EXPIRES_IN_SECONDS
    });

    res.cookie("SESSIONINFO", sessionInfo, {httpOnly:false, expires: expireDate});
    res.cookie("SESSIONID", jwtBearerToken, {httpOnly:true});
}

export{register, login, logout};
