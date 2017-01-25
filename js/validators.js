import Joi from 'react-native-joi';

const emailRule = Joi.string().email();
const passwordRule = Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/);
const textInput = Joi.string().min(3).max(30)

export {
  emailRule,
  passwordRule,
  textInput
}