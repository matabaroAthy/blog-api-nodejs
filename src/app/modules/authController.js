/* eslint-disable linebreak-style */
import Password from '../helpers/password';
import UserServices from '../../database/acid/services/userServices';
import GenericHandler from '../helpers/responses';
import jwt from '../helpers/jwt';

class UserController {
  static async signup(req, res) {
    const { email, username, password } = req.body;
    const hashPassword = Password.hashPassword(req.body.password);
    const authData = {
      email,
      username,
      password: hashPassword,
    };
    const result = await UserServices.create(authData);
    const { userId } = result.dataValues;
    const token = jwt.createToken(userId);

    if (!result) {
      return GenericHandler.error(res, 500, 'incorrect method');
    }
    return GenericHandler.success(res, {
      userId, email, username, token,
    }, 201, 'user succesfuly registed');
  }
}

export default UserController;
