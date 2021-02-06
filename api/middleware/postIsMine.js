import {Post} from '../models/post.js';

/**
 * @param req Request
 * @param res Response
 * @param next
 */
export const postIsMine = (req, res, next) => {
    let id = req.params.id;
    Post.findById(id).exec((err, post) => {
        if (err || !post) {
            res.status(404).send('Le message n\'existe pas');
        }
        else {
            if (post.author != req.payload.userId) {
                res.status(403).send('Vous n\'avez pas accès à ce message.');
            }
            else {
                req.post = post;
                next();
            }
        }
    });
};
