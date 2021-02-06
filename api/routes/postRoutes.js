import express from 'express';
import {authenticateJWT} from '../middleware/jwtVerification.js';
import {getAll, getSelf, getOne, create, edit, remove} from '../controllers/postController.js';
import {postIsMine} from "../middleware/postIsMine.js";

let router = express.Router();

router.route('/all').get(getAll);

// Ça serait mieux d'utiliser aussi le .all ici pour être constant, mais je voulais vous montrer la différence
router
    .use(authenticateJWT)
    .route('/')
    .get(getSelf)
    .post(create);

router
    .route('/:id')
    .all(authenticateJWT, postIsMine)
    .get(getOne)
    .put(edit)
    .delete(remove);

export default router;
