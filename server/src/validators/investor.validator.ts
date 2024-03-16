import Joi from "joi";
import { password } from "./custom.validators";

export const registerInvestor = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().required(),
  password: Joi.string().custom(password).required(),
  address: Joi.string().required(),
  experience: Joi.string().required(),
  linkedin: Joi.string().optional(),
});

export const loginInvestor = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default {
  registerInvestor,
  loginInvestor,
};
