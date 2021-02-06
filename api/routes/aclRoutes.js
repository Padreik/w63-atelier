import express from 'express';
import {authenticateJWT} from '../middleware/jwtVerification.js';
import {register, login, logout} from '../controllers/aclController.js';

let router = express.Router();

router
    .post('/register', register)
    .post('/login', login)
    .post('/logout', authenticateJWT, logout);

export default router;
