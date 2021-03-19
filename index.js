/* eslint-disable no-console */
/* eslint-disable linebreak-style */

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import msql from 'mysql2';

const app = express();
app.use(cors());
app.post('/', (req, res) => {
  res.send('hi i am athy');
});

app.listen(process.env.PORT, () => console.log(`the server is runnig on port ${process.env.PORT}`));

const connection = msql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db-development',

});
connection.connect((err) => {
  if (err) {
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});
