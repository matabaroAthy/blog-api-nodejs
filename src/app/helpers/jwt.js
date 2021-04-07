import jwt from 'jsonwebtoken';
import 'dotenv/config';

class Token {
  static checkToken(token) {
    const Tdata = jwt.verify(token, process.env.SECRET_KEY);
    return Tdata.Tdata;
  }

  static createToken(
    data = {},
    expireIn = { expireIn: '86400' },
  ) {
    const token = jwt.sign({ data }, process.env.SECRET_KEY, expireIn);
    return token;
  }
}

export default Token;
