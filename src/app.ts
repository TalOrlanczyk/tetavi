import * as dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import corsConfig from './config/cors'


import env from './config/initializers/env';


import api from './app/api/main';
import express from 'express';

import connect from './config/initializers/database';



const app = express();

const credentials = require(__dirname + '/config/database.json')[env];

// create a new database connection
export const connection = connect();
app.use(express.json({
    verify: (req, res, buf, encoding) => {
        // grab the buffer to use it later
        (req as any).raw = buf
    }
}));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/app/assets'));

// set CORS policy
app.use(cors(corsConfig));

//block ip addresses from blocked countries

// mount api handlers
api(app);

export default app;
