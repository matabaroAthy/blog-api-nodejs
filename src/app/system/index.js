/* eslint-disable linebreak-style */
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import route from '../routes';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
route(app);

export default app;
