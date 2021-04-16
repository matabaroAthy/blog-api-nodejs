/* eslint-disable linebreak-style */
import schema from '../helpers/schema';
import GenericHandler from '../helpers/responses';

class Validator {
  static async signup(req, res, next) {
    const value = await schema.signup.validate(req.body);
    if (!value.error) {
      return next();
    }
    GenericHandler.error(res, 402, value.error.message);
  }

  static async signin(req, res, next) {
    const value = await schema.signin.validate(req.body);
    if (!value.error) {
      return next();
    }
    GenericHandler.error(res, 402, value.error.message);
  }

  static async startBlog(req, res, next) {
    const value = await schema.createBlog.validate(req.body);
    if (!value.error) {
      return next();
    }
    GenericHandler.error(res, 402, value.error.message);
  }
}

export default Validator;
