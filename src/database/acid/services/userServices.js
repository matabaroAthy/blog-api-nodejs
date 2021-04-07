/* eslint-disable linebreak-style */
import db from '../../definitions/models';

class UserServices {
  static async create(user) {
    const newUser = await db.User.create(user);
    if (!newUser) return null;
    return newUser;
  }
}

export default UserServices;
