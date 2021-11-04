import Joi from "joi";
import {
  email,
  name,
  password,
  passwordConfirm,
  phoneNumber,
  role,
  gender
} from "./globalSchemas";

export const signupValidator = Joi.object({
  email,
  name,
  password,
  passwordConfirm,
  role,
  phoneNumber,
  gender,
  dateOfBirth: Joi.date().max("2004-01-1").iso(),
  location: Joi.string(),
  companyName: Joi.string(),
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

const code = Joi.string().required().messages({
  "any.required": "Code is required"
});

// redirectURI: Joi.string().required().uri().messages({
//   "any.required": "Redirect URI is required",
//   "any.uri": "Redirect URI must be a valid link"
// })

export const socialLoginValidator = Joi.object({
  role,
  code
});
