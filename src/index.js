/* eslint-disable linebreak-style */
import app from './app/system/index';
import 'dotenv/config';

app.post('/', (req, res) => {
  res.send('hi i am athy');
});

app.listen(process.env.PORT || 3000, () => console.log(`the server is runnig on port ${process.env.PORT}`));
