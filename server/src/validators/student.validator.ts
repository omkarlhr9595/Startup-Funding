import Joi from "joi";
import { password } from "./custom.validators";

export const registerStudent = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().required(),
  className: Joi.string().required(),
  password: Joi.string().custom(password).required(),
  rollNo: Joi.string().required(),
});

export const loginStudent = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default {
  registerStudent,
  loginStudent,
};
