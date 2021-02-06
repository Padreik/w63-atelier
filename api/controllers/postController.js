import {Post} from '../models/post.js';

/**
 * @param req {Request}
 * @param res {Response}
 */
function getAll(req, res) {
    Post.find().populate('author', 'username').sort([['date', -1]]).exec((err, posts) => {
        if (err) {
            res.status(500, err.message).end();
        }
        else {
            res.json(posts);
        }
    })
}

/**
 * @param req {Request}
 * @param res {Response}
 */
function getSelf(req, res) {
    Post.find({author: req.payload.userId}).sort([['date', -1]]).exec((err, posts) => {
        if (err) {
            res.status(500, err.message).end();
        }
        else {
            res.json(posts);
        }
    })
}

/**
 * @param req {Request}
 * @param res {Response}
 */
function getOne(req, res) {
    /*
      Dans ce cas getOne est toujours exécuté après le middleware postIsMine
      Dans un monde idéal, il faudrait vérifier si req.post existe et faire la requête bd si nécessaire
     */
    res.json(req.post);
}

/**
 * @param req {Request}
 * @param res {Response}
 */
function create(req, res) {
    let post = new Post({
        title: req.body.title,
        message: req.body.message,
        date: Date.now(),
        author: req.payload.userId
    });
    post.save(err => {
        if (err) {
            res.status(400).send(err.message);
        }
        else {
            res.status(201).end();
        }
    });
}

/**
 * @param req {Request}
 * @param res {Response}
 */
function edit(req, res) {
    req.post.title = req.body.title;
    req.post.message = req.body.message;
    req.post.date = Date.now();
    req.post.save(err => {
        if (err) {
            res.status(400).send(err.message);
        }
        else {
            res.status(204).end();
        }
    });
}

/**
 * @param req {Request}
 * @param res {Response}
 */
function remove(req, res) {
    req.post.delete(err => {
        if (err) {
            res.status(400).send(err.message);
        }
        else {
            res.status(204).end();
        }
    });
}

export{getAll, getSelf, getOne, create, edit, remove};
