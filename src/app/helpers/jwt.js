/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
import JWT from 'jsonwebtoken';
import 'dotenv/config';
import GenericHandler from './responses';
import allStatus from './statusKeys';
import state from './messageCode';

class JwtAuth {
  static signAccessToken(userId) {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.SECRET_KEY;
      const options = {
        expiresIn: '24H',
        issuer: '@athanase2.0',
        audience: userId.toString(),
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      });
    });
  }

  static verifyAccessToken(req, res, next) {
    if (!req.headers.authorization) {
      GenericHandler.error(res, allStatus.CODE_INTERNAL_SERVER_ERROR, state.SERVER_CONFLICT);
      next();
    }
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    JWT.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        GenericHandler.error(res, allStatus.CODE_INTERNAL_SERVER_ERROR, state.ACCESS_DENIED);
      }
      req.payload = payload;
      next();
    });
  }

  static readToken(accessToken) {
    try {
      return JWT.verify(accessToken, process.env.SECRET_KEY);
    } catch (e) {
      return false;
    }
  }
}

export default JwtAuth;
