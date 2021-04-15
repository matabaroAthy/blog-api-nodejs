/* eslint-disable linebreak-style */
import Password from '../helpers/password';
import UserServices from '../../database/acid/services/userServices';
import GenericHandler from '../helpers/responses';
import jwt from '../helpers/jwt';

class UserController {
  static async signup(req, res) {
    const checkEmail = req.body.email;
    const checkUser = req.body.username;
    const emailUsed = await UserServices.findEmail(checkEmail);
    const usernUsed = await UserServices.findUsername(checkUser);

    if (emailUsed) {
      const resp = GenericHandler.error(res, 409, 'email already used');
      console.log(resp);
      return resp;
    }
    if (usernUsed) {
      const resp = GenericHandler.error(res, 409, 'username exist already');
      console.log(resp);
      return resp;
    }

    const { email, username, password } = req.body;
    const hashPassword = Password.hashPassword(req.body.password);
    const authData = {
      email,
      username,
      password: hashPassword,
    };
    const result = await UserServices.create(authData);

    const uID = req.body.username;
    const getId = await UserServices.findUserid(uID);

    const { id } = getId;
    const token = jwt.createToken(id);
    if (!result) {
      return GenericHandler.error(res, 500, 'incorrect method');
    }
    return GenericHandler.success(res, {
      id, email, username, token,
    }, 201, 'user succesfuly registed');
  }

  static async signin(req, res) {
    const { username, password } = req.body;
    const checkUser = req.body.username;
    const getUser = await UserServices.signinUser(checkUser);

    if (!getUser) {
      const resp = GenericHandler.error(res, 404, 'user does not exist');
      console.log(resp);
      return resp;
    }

    const realPass = Password.passCompare(
      password,
      getUser.password,
    );

    if (!getUser || !realPass) {
      GenericHandler.error(res, 404, 'incorrect credentials');
    }
    const token = jwt.createToken(getUser.id);
    return GenericHandler.success(res, { username: getUser.username, token }, 200, 'successfuly loggedin');
  }
}

export default UserController;
