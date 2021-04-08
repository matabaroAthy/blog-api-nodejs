import UserServices from '../../database/acid/services/userServices';
import GenericHandler from '../helpers/responses';

const checkUsername = async (req, res, next) => {
  const { username } = req.body;
  const usernameExist = await UserServices.findUsername({ username });
  if (usernameExist) {
    return GenericHandler.error(400, 'Username already in use!', res);
  }
  next();
  return checkUsername;
};
export default checkUsername;
