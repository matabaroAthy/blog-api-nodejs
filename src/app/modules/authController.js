/* eslint-disable max-len */
/* eslint-disable import/no-duplicates */
/* eslint-disable linebreak-style */
import Password from '../helpers/password';
import UserServices from '../../database/acid/services/userServices';
import GenericHandler from '../helpers/responses';
import jwt from '../helpers/jwt';
import allStatus from '../helpers/statusKeys';
import state from '../helpers/messageCode';

class UserController {
  static async signup(req, res) {
    const { email, username, password } = req.body;

    const emailUsed = await UserServices.findEmail(email);
    const usernUsed = await UserServices.findUsername(username);

    if (emailUsed) {
      const resp = GenericHandler.error(res, allStatus.CONFLICT_RESPONSE_CODE, state.CONFLICT_EMAIL);

      return resp;
    }
    if (usernUsed) {
      const resp = GenericHandler.error(res, allStatus.CONFLICT_RESPONSE_CODE, state.CONFLICT_USERNAME);

      return resp;
    }

    const hashPassword = Password.hashPassword(req.body.password);
    const authData = {
      email,
      username,
      password: hashPassword,
    };
    const result = await UserServices.create(authData);

    const { id } = result;
    const token = jwt.createToken(id);
    if (!result) {
      return GenericHandler.error(res, allStatus.CODE_INTERNAL_SERVER_ERROR, state.SERVER_ERROR);
    }
    return GenericHandler.success(res, {
      id, email, username, token,
    }, allStatus.CREATED_CODE, state.CREATED_MESSAGE);
  }

  static async signin(req, res) {
    const { username, password } = req.body;
    const checkUser = req.body.username;
    const getUser = await UserServices.signinUser(checkUser);

    if (!getUser) {
      const resp = GenericHandler.error(res, allStatus.NOT_FOUND_CODE, state.NOT_FOUND_USER);

      return resp;
    }

    const realPass = Password.passCompare(
      password,
      getUser.password,
    );

    if (!getUser || !realPass) {
      GenericHandler.error(res, allStatus.NOT_FOUND_CODE, state.NOT_FOUND_CREDINTIALS);
    }
    const token = jwt.createToken(getUser.id);
    return GenericHandler.success(res, { username: getUser.username, token }, allStatus.SUCCESSFUL_CODE, state.SUCCESS_LOG);
  }
}

export default UserController;
