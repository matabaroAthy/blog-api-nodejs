/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';
import 'dotenv/config';

class Token {
  static checkToken(token) {
    const Tdata = jwt.verify(token, process.env.SECRET_KEY);
    return Tdata.Tdata;
  }

  static createToken(
    data = {},
  ) {
    const token = jwt.sign({ data }, process.env.SECRET_KEY);
    return token;
  }
}

export default Token;
