import Joi from "joi";
import {
  email,
  firstName,
  lastName,
  password,
  passwordConfirm,
  phoneNumber,
  role,
  gender
} from "./globalSchemas";

export const signupValidator = Joi.object({
  email,
  firstName,
  lastName,
  password,
  passwordConfirm,
  role,
  phoneNumber,
  gender,
  dateOfBirth: Joi.date().max("2004-01-1").iso(),
  profileImageUrl: Joi.string()
});

export const loginValidator = Joi.object({
  email,
  password
});

export const forgotPasswordValidator = Joi.object({
  email
});

export const resetPasswordValidator = Joi.object({
  password,
  passwordConfirm,
  passwordResetToken: Joi.string().required().messages({
    "any.required": "Password reset token is required"
  })
});

export const verifyAccountValidator = Joi.object({
  verifyToken: Joi.string().required().messages({
    "any.required": "Verification token is required"
  })
});
