/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable radix */
/* eslint-disable linebreak-style */
import JwtAuth from './jwt';
import GenericHandler from './responses';
import allStatus from './statusKeys';
import state from './messageCode';

class GetToken {
  static async getAccessToken(req, res) {
    const token = req.headers.authorization;
    if (!token) {
      const resp = GenericHandler.error(res,
        allStatus.UNAUTHORIZED_CLIENT_ERROR, state.ACCESS_DENIED);
      return resp;
    }

    const getToken = token.split(' ')[1];
    const data = await JwtAuth.readToken(getToken);
    const userId = parseInt(data.aud);

    if (!data) {
      const resp = GenericHandler.error(res,
        allStatus.UNAUTHORIZED_CLIENT_ERROR, state.ACCESS_DENIED);
      return resp;
    }

    return userId;
  }
}

export default GetToken;
