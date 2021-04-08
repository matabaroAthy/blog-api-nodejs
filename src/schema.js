/* eslint-disable linebreak-style */
import joi from 'joi';

const schema = joi.object({
  username: joi.string()
    .max(6)
    .regex(/[a-zA-Z]/)
    .required()
    .message({
      'string.base': 'Invalid type, username must be a string',
      'string.empty': 'please enter your username',
      'any.required': 'username is required',
      'string.max': 'Username must be at most {#limit} characters long',
    }),
  email: joi.string().email().required(),
});
export default schema;
