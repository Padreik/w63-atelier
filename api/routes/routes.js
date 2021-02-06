import express from 'express';
import aclRoutes from './aclRoutes.js';
import postRoutes from './postRoutes.js';
import {authenticateJWT} from '../middleware/jwtVerification.js';
import csrfProtection from 'csurf';

const router = express.Router();

router.use('/acl', aclRoutes);
router.use('/post', postRoutes);
// /status ne sert pas, mais permettrais de valider avec le serveur l'authentification
router.get('/status', authenticateJWT, (req, res) => {res.send('ok')});

export default router;
