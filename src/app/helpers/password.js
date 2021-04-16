/* eslint-disable linebreak-style */
import bcrypt from 'bcrypt';

class Password {
  static hashPassword(validate) {
    return bcrypt.hashSync(validate, bcrypt.genSaltSync(8));
  }

  static passCompare(validate, dataValid) {
    return bcrypt.compareSync(validate, dataValid);
  }
}

export default Password;
