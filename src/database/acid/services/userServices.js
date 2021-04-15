/* eslint-disable linebreak-style */
import db from '../../definitions/models';

class UserServices {
  static async create(authData) {
    const newUser = await db.User.create(authData);
    if (!newUser) return null;
    return newUser;
  }

  static async findEmail(checkEmail) {
    const result = await db.User.findOne(
      {
        where: { email: checkEmail },
      },
    );

    return result;
  }

  static async findUsername(checkUser) {
    const result = await db.User.findOne(
      {
        where: { username: checkUser },
      },
    );

    return result;
  }

  static async findUserid(checkUser) {
    const result = await db.User.findOne({
      where: { username: checkUser },
    });

    return result;
  }

  static async signinUser(user) {
    const result = await db.User.findOne({ where: { username: user } });
    return result;
  }
}

export default UserServices;
