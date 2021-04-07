import joi from 'joi';
import schema from '../../schema';

const signupValidator = (req, res, next) => {
  try {
    joi.assert(req.body, schema);
  } catch (err) {
    return res.status(400).json({ err: err.details[0].message });
  }
  next();
  return signupValidator;
};
export default signupValidator;
