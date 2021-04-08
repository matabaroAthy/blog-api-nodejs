import Token from '../helpers/jwt';
import GenericHandler from '../helpers/responses';

const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (typeof authHeader !== 'undefined') {
    const data = Token.verifyToken(authHeader);
    if (!data) {
      return GenericHandler.error(400, 'Unauthorized! user', res);
    }
    req.user = data;
    next();
  } else {
    return GenericHandler.error(403, 'Header is undefined', res);
  }
  return checkAuth;
};

export default checkAuth;
