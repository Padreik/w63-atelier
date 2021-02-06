import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import cors from 'cors';
import { body, validationResult } from 'express-validator';
import routes from './routes/routes.js';
import csrf from 'csurf';

import './config/db.js';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrf({cookie: {sameSite:true}}), (req, res, next) => {
    res.cookie('XSRF-TOKEN', req.csrfToken(), { httpOnly: false, sameSite: true});
    next();
});
// Sans le proxy angular il faut utiliser la ligne suivante:
// app.use(cors({credentials: true, origin: "http://localhost:4200"}));
// Avec le proxy la ligne suivante est ok:
app.use(cors());

app.use('/', routes);

// Expose endpoints to port 3000
app.listen(3000, () => {
    console.log("Listening to port 3000");
});
